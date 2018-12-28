//针对加载更多调用的mixin数据
export function pageListMixin(opts = {
  dataKey: 'pageList'
}) {
  return {
    data() {
      return {
        [opts.dataKey]: {
          data: {
            lists: []
          },
          state: {
            inputPageNum: '',
            allPage: 0,
            showItem: 5,
            current: 1
          }
        }
      }
    }
  }
}