//针对加载更多调用的mixin数据
export function scrollMixin(opts = {
  dataKey: 'load'
}) {
  return {
    data() {
      return {
        [opts.dataKey]: {
          data: {
            lists: []
          },
          state: {
            disabled: false,
            hasMore: true
          },
          params: {
            page: 1
          }
        }
      }
    }
  }
}

//ssr default data
export function scrollAsyncData() {
  const scrollData = scrollMixin();
  return scrollData.data();
}

//停止加载状态
export function scrollEndHook() {
  const loadState = this.load.state;
  loadState.disabled = true;
  loadState.hasMore = false;
  return {
    disabled: loadState.disabled
  };
}

//检查load中列表数据是否存在
export function scrollNoHasListData(opts) {
  const { resultData, listKey } = opts;
  if (!resultData || (typeof resultData === 'string')) return {};
  let data = resultData;
  if (listKey) {
    (listKey.split('.') || []).forEach(function (key) {
      data = data[key];
    });
  }
  if (!data || data.length === 0) return true;
  return false;
}