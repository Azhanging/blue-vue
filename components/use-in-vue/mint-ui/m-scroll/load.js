//针对加载更多调用的mixin数据
export function loadMixin() {
  return {
    data() {
      return {
        load: {
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

//停止加载状态
export function loadEndHook() {
  const loadState = this.load.state;
  loadState.disabled = true;
  loadState.hasMore = false;
}

//检查load中列表数据是否存在
export function loadNoHasListData(opts) {
  const { result, listKey } = opts;
  const resData = result.data;
  if (!resData) return {};
  let data = resData;
  if (listKey) {
    (listKey.split('.') || []).forEach(function (key) {
      data = data[key];
    });
  }
  if (!data || data.length == 0) return true;
  return false;
}