import axios from 'axios';
import router from '@router';
import config from '@config';
import utils from '$utils';

import { $loadding, $closeLoadding } from '../mint-ui/indicator';

export function useAxios(Vue) {

  requestInterceptors();

  responseInterceptors();

  //axios in vue prototype
  Vue.prototype.$axios = axios;
}

//request interceptors
function requestInterceptors() {
  axios.interceptors.request.use(function (axiosConfig) {
    setHeader(axiosConfig);
    setData(axiosConfig);
    $loadding({
      text: false
    });
    return axiosConfig;
  }, function (error) {
    return Promise.reject(error);
  });
}

//response interceptors
function responseInterceptors() {
  axios.interceptors.response.use(function (res) {
    $closeLoadding();
    //success state
    if (res.status == 200) {
      return res;
    } else if (res.status >= 400 && res.status <= 599) {
      const errorPage = config.error.pages['400'];
      //error or server error
      router.replace(errorPage.path, errorPage.complete);
    }
  });
}

export function setHeader(axiosConfig) {
  axiosConfig.headers['Session'] = 'sessionKey';
  axiosConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
}

function setData(axiosConfig){
  axiosConfig.data = paramsStringify(axiosConfig.data);
}

export function paramsStringify(params) {
  const _params = [];
  utils.each(params, (item, key) => {
    _params.push(`${key}=${item}`);
  });
  return _params.join('&');
}
