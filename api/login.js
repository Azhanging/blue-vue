import $axios from '$axios';
import config from '@config';
import utils from 'blue-utils';
import router from '@router';
import { setLoginStorage, clearLoginStorage } from '$assets/js/login';

const login = config.login;

//登录的api
export function apiLoginIn(opts = {}) {
  return $axios(utils.extend({
    url: login.in.url
  }, opts)).then((res) => {
    const { data } = res;
    //登录态存储
    setLoginStorage(data);
    return data;
  });
}

//退出APi
export function apiLoginOut(opts = {}) {
  return $axios(utils.extend({
    url: login.out.url
  }, opts)).then((data) => {
    const redirectUrl = login.out.redirectUrl || '/';
    //登录态存储
    clearLoginStorage();
    //跳到登录页
    router.routerTo(redirectUrl);
    return data;
  });
}