import utils from 'blue-utils';

export function genListData(opts = {}) {
  const { params = {} } = opts;
  return {
    list: [],
    loading: false,
    finished: false,
    params: utils.hook(this, params)
  };
}