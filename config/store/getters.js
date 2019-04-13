import utils from 'blue-utils';

const getters = {
  isLogin(state) {
    return !utils.nullPlainObject(state.userInfo);
  }
};

export default getters;

