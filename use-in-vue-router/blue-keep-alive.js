import utils from 'blue-utils';
import BlueQueuePipe from 'blue-queue-pipe';

//后退的队列
const historyQueue = new BlueQueuePipe({
  methods: {
    shift() {
      return this.queue.shift();
    }
  }
});

function extendNativeHistory() {
  //初始化的back方法
  const historyBack = History.prototype.back;
  // 重写back,这里涉及到keep-alive处理，后退都会把当前的组件销毁掉，
  // 避免下一次进来走keep处理的时候都是读cache的instance
  History.prototype.back = function () {
    historyQueue.enqueue(`back`);
    historyBack.call(this);
  };
}

//enter钩子
function beforeRouteEnter(to, from, next) {
  const meta = to.meta;

  //设置状态
  meta.refresh = utils.extend({
    //刷新状态
    status: false,
    //强制刷新的列表
    unforcedList: []
  }, meta.refresh || {});

  const refresh = meta.refresh;

  //检查参数
  if (refresh.status !== true) {
    refresh.status = matchParamsRefresh({
      route: to
    });
  }

  meta.query = to.query;
  meta.params = to.params;
  next(() => {
    setTimeout(() => {
      // 在为refresh === true的情况，在执行下一event loop就要恢复回到的false
      // 循环跳到一个view层的话，会出现back后会刷新，因为存在回环，这是正常的现象
      if (refresh.status === true) {
        refresh.status = false;
      }
    }, 500);
  });
}

//leave钩子
function beforeRouteLeave(to, from, next) {
  const meta = from.meta;
  const refresh = meta.refresh;
  const { unforcedList } = refresh;
  if (!historyQueue.isEmpty()) {
    //如果是back
    refresh.status = true;
    //回到初始化的query和params
    meta.query = null;
    meta.params = null;
    historyQueue.useMethod('shift');
  }

  //强制刷新的列表
  /*
  * 如果通过浏览器导航触发的前进后退，back不会写进queue中，
  * 状态会保持为refresh.statue = false;
  * 如果通过过滤列表处理可以有效处理当前的缓存状态。
  * unforcedList：过滤列表有涉及到导航前进的问题，
  * 下一跳过滤是否保留缓存（导航操作会出现的问题，back 按钮操作都会处理为true）
  * */
  if (refresh.status !== true && (unforcedList && unforcedList.length > 0)) {
    refresh.status = matchUnforcedListRefresh({
      fromRoute: from,
      toRoute: to
    });
  }

  next();
}


//路由的刷新状态,这里涉及到beforeRouteUpdate的情况下需要使用
//避免keep-alive的缓存机制
function matchParamsRefresh({
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
function matchUnforcedListRefresh({
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

//扩展的Vue
const BlueKeepAlive = {
  install(Vue) {
    //扩展原生History
    extendNativeHistory();
    //针对keepAlive，处理掉组件实例化缓存问题
    Vue.mixin({
      beforeRouteEnter,
      beforeRouteLeave
    });
  }
};

export default BlueKeepAlive;