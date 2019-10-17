import { matchParamsRefresh, matchUnforcedListRefresh } from "./refresh";
import { historyQueue } from './history';

function beforeRouteEnter(to, from, next) {
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
}

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

//扩展的Vue
export function mixinVueRouteHooks(Vue) {
  //针对keepAlive，处理掉组件实例化缓存问题
  Vue.mixin({
    beforeRouteEnter,
    beforeRouteLeave
  });
}