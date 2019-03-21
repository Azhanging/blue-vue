import { apiGetUserInfo } from '$api';
import store from '@store';

export default function user() {
  setUserInfo();
}

//设置获取用户信息
function setUserInfo() {
  apiGetUserInfo().then((result) => {
    const { data } = result.data;
    store.commit('setUserInfo', data);
  });
}