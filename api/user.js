import $axios from '$axios';
import config from '@config';

//获取用户信息
export function apiGetUserInfo() {
  return $axios.get(config.user.url, {
    isShowLoading: false
  });
}