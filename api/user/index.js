import $Axios from '$axios';

//获取用户信息
export function apiGetUserInfo() {
  return $Axios.get('/api/member_info/index');
}