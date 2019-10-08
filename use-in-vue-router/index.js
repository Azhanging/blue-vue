import Vue from 'vue';
import utils from 'blue-utils';
import { setCurrentViewScroll } from '$components/BvView';
import router from '@router';

//vue-router的config
const routerConfig = {
  params: {
    backUrl: `back_url`
  }
};

//历史相关存储
const routerHistory = {
  back: {
    queue: []
  }
};

//扩展vue-router
export function useInVueRouter(Router, opts = {}) {

  //设置router中的配置信息
  Router.config = utils.extend(routerConfig, opts);

  //处理原生的History
  nativeHistory();

  //针对keepAlive，处理掉组件实例化缓存问题
  Vue.mixin({
    beforeRouteEnter(to, from, next) {
      const meta = to.meta;
      const refresh = meta.refresh;

      //检查参数
      if (refresh.status !== true) {
        refresh.status = matchParamsRedirect({
          route: to
        });
      }

      meta.query = to.query;
      meta.params = to.params;
      next((vm) => {
        vm.$nextTick(() => {
          // 在为refresh === true的情况，在执行下一event loop就要恢复回到的false
          // 循环跳到一个view层的话，会出现back后会刷新，因为存在回环，这是正常的现象
          if (refresh.status === true) {
            refresh.status = false;
          }
        });
      });
    },
    beforeRouteLeave(to, from, next) {
      const backQueue = routerHistory.back.queue;
      const meta = from.meta;
      const refresh = meta.refresh;
      if (backQueue.length > 0) {
        //如果是back
        refresh.status = true;
        //回到初始化的query和params
        meta.query = null;
        meta.params = null;
        backQueue.shift();
      }

      //强制刷新的列表
      if (refresh.status !== true && refresh.unforcedList.length > 0) {
        refresh.status = matchUnforcedListRedirect({
          fromRoute: from,
          toRoute: to
        });
      }

      next();
    }
  });

  //路由后退规则,如果有具体的路由，否则走根路径
  Router.prototype.routerBack = function () {
    if (history.length > 1) {
      window.history.back();
    } else {
      this.push('/');
    }
  };

  //跳转到指定的地址
  Router.prototype.routerTo = function (path) {
    if (utils.isStr(path)) {
      if (/^http/.test(path)) {
        location.href = path;
      } else {
        const { route } = this.resolve(path, this.currentRoute, true);
        this.push(route.fullPath);
      }
    } else if (utils.isFunction(path)) {
      path.call(this);
    }
  };

  //匹配路由的路径组，返回布尔值
  Router.prototype.matchRoutes = function (routesRegExp = []) {
    const path = this.currentRoute.fullPath;
    for (let i = 0; i < routesRegExp.length; i++) {
      const routerRegExp = routesRegExp[i];
      routerRegExp.lastIndex = 0;
      if (routerRegExp.test(path)) {
        return true;
      }
    }
    return false;
  };

  //获取params中的某个参数
  Router.prototype.getParam = function (key) {
    return this.currentRoute.params[key] || '';
  };

  //获取meta
  Router.prototype.getMeta = function () {
    return this.currentRoute.meta;
  };
}

//处理原生的History
function nativeHistory() {
  //初始化的back方法
  const historyBack = History.prototype.back;
  // 重写back,这里涉及到keep-alive处理，后退都会吧当前的组件销毁掉，
  // 避免下一次进来走keep处理的时候都是读cache的instance
  History.prototype.back = function () {
    routerHistory.back.queue.push({
      type: `back`,
      url: router.currentRoute.fullPath
    });
    historyBack.call(this);
  };
}

//keep-alive保存position
export function scrollBehavior(to, from, savedPosition) {
  if (savedPosition) {
    //设置view层scroll
    setCurrentViewScroll(savedPosition);
  }
  return {
    x: 0,
    y: 0
  };
}


//路由的刷新状态,这里涉及到beforeRouteUpdate的情况下需要使用
//避免keep-alive的缓存机制
function matchParamsRedirect({
  route
}) {
  const { params, query } = route;
  const { params: metaParams, query: metaQuery } = route.meta;

  //检查params一致性
  if (metaParams !== null) {
    for (let key in params) {
      if (!params.hasOwnProperty(key)) continue;
      if (metaParams[key] !== params[key]) {
        return true;
      }
    }
  }

  //检查query一致性
  if (metaQuery !== null) {
    for (let key in query) {
      if (!query.hasOwnProperty(key)) continue;
      if (metaQuery[key] !== query[key]) {
        return true;
      }
    }
  }

  return false;
}

//匹配强制刷新的列表
function matchUnforcedListRedirect({
  fromRoute,
  toRoute
}) {
  const { refresh } = fromRoute.meta;
  const { unforcedList } = refresh;
  const { fullPath: toRouteFullPath } = toRoute;
  for (let i = 0; i < unforcedList.length; i++) {
    const path = unforcedList[i];
    //如果匹配的是字符串，那需要全等匹配
    if (utils.isStr(path) && (path === toRouteFullPath)) {
      return false;
    } else if ((path instanceof RegExp) && (path.test(toRouteFullPath))) {
      return false;
    }
  }
  return true;
}
