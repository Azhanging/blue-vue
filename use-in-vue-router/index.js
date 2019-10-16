import Vue from 'vue';
import utils from 'blue-utils';
import { setCurrentViewScroll } from '$components/BvView';
import router from '@router';
import BlueQueuePipe from 'blue-queue-pipe';
import { matchParamsRefresh, matchUnforcedListRefresh } from "./refresh";

//vue-router的config
const routerConfig = {
  params: {
    backUrl: `backUrl`
  }
};

//后退的队列
const backQueue = new BlueQueuePipe({
  methods: {
    shift() {
      return this.queue.shift();
    }
  }
});

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
        refresh.status = matchParamsRefresh({
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
      const meta = from.meta;
      const refresh = meta.refresh;
      const { unforcedList } = refresh;
      if (!backQueue.isEmpty()) {
        //如果是back
        refresh.status = true;
        //回到初始化的query和params
        meta.query = null;
        meta.params = null;
        backQueue.useMethod('shift');
      }

      //强制刷新的列表
      if (refresh.status !== true && (unforcedList && unforcedList.length > 0)) {
        refresh.status = matchUnforcedListRefresh({
          fromRoute: from,
          toRoute: to
        });
      }

      next();
    }
  });

  //获取当前地址href，直接获取location.href会出现路由未更新前的地址（分享全路径需要使用）
  Router.prototype.$getHref = function () {
    const origin = window.location.origin;
    return `${origin}${this.$getModePath()}`;
  };

  //路由后退规则,如果有具体的路由，否则走根路径
  Router.prototype.$goBack = function () {
    if (history.length > 1) {
      window.history.back();
    } else {
      this.push('/');
    }
  };

  //跳转到指定的地址
  Router.prototype.$routerTo = function (path) {
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
  Router.prototype.$matchRoutes = function (routesRegExp = []) {
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
  Router.prototype.$getParam = function (key) {
    return this.currentRoute.params[key] || '';
  };

  //获取meta
  Router.prototype.$getMeta = function () {
    return this.currentRoute.meta;
  };

  //获取mode相关的path
  Router.prototype.$getModePath = function () {
    const mode = this.mode;
    const fullPath = this.currentRoute.fullPath;
    if (mode === 'hash') {
      return `/#${fullPath}`;
    } else if (mode === 'history') {
      return `${fullPath}`;
    }
  };
}

//处理原生的History
function nativeHistory() {
  //初始化的back方法
  const historyBack = History.prototype.back;
  // 重写back,这里涉及到keep-alive处理，后退都会把当前的组件销毁掉，
  // 避免下一次进来走keep处理的时候都是读cache的instance
  History.prototype.back = function () {
    backQueue.enqueue({
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
