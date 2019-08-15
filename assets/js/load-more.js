import utils from 'blue-utils';

//loadMore mixin
export function mixin(opts = {
  loadKey: 'loadMore'
}) {
  return {
    data() {
      return {
        [opts.loadKey]: {
          data: {
            list: []
          },
          state: {
            /*allLoaded: false,*/
            disabled: false
          },
          params: {
            page: 1
          }
        }
      };
    }
  };
}


//清除loadMore的列表和状态
export function reset(opts = {
  loadKey: `loadMore`
}) {
  return new Promise((resolve, reject) => {
    try {
      const { loadKey } = opts;
      const loadMore = this[loadKey];
      const loadMoreData = loadMore.data;
      loadMore.params.page = 1;
      loadMoreData.list = [];
      loadMore.state = {
        disabled: false
      };
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}


//停止加载状态
export function endHook(opts = {}) {
  const { loadKey, listKey, resultData } = utils.extend({
    loadKey: 'loadMore',
    listKey: 'list',
    resultData: {}
  }, opts);
  const loadMore = this[loadKey];

  //load more 处理
  loadMore.state = {
    disabled: true
  };

  //检查result的数据是否为空对象，如果为空，不设置list里面的数据
  if (!utils.nullPlainObject(resultData)) {
    loadMore.data.list = loadMore.data.list.concat(getListData({
      resultData,
      listKey
    }));
  }

}


//检查loadMore中列表数据是否存在
export function noHasListData(opts) {
  const { resultData, listKey = 'list', listLen = 0 } = opts;
  if (!resultData || (typeof resultData === 'string')) return {};
  let data = resultData;
  if (listKey) {
    data = getListData({
      resultData,
      listKey
    });
  }
  return (!data || data.length === 0 || (listLen && data.length < listLen));
}


//获取list中的数据
function getListData(opts = {
  resultData: {},
  listKey: ''
}) {
  const { resultData, listKey } = opts;
  let data = resultData;
  (listKey.split('.') || []).forEach(function (key) {
    data = data[key];
  });
  return data;
}

