import utils from 'blue-utils';

const getters = {
  isLogin(state) {
    return !utils.isEmptyPlainObject(state.userInfo);
  }
};

export default getters;

