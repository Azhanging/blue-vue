import $Axios from '$axios';
import config from '@config';

//获取用户信息
export function apiGetUserInfo() {
  return $Axios.get(config.user.url, {
    isLoading: false
  });
}