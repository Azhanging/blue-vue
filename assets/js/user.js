import { apiGetUserInfo } from '$api';
import store from '@store';
import utils from 'blue-utils';

export default function user() {
  setUserInfo();
}

//设置获取用户信息
function setUserInfo() {
  apiGetUserInfo().then((result) => {
    const { data } = result;
    if(utils.isArray(data)){
      store.commit('SET_USER_INFO', {});
    } else {
      store.commit('SET_USER_INFO', data);
    }
  });
}