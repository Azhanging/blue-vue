import { apiGetUserInfo } from '$api';
import store from '@store';
import utils from 'blue-utils';

export default function user() {
  setUserInfo();
}

//设置获取用户信息
function setUserInfo() {
  apiGetUserInfo().then((result) => {
    const { data } = result.data;
    if(utils.isArray(data)){
      store.commit('setUserInfo', {});
    } else {
      store.commit('setUserInfo', data);
    }
  });
}