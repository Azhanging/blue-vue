import axios from 'axios';
import router from '@router';
import config from '@config';
import utils from '$utils';
import { $loadding, $closeLoadding } from '../mint-ui/indicator/index';
import { $toast } from "../mint-ui/toast"
import { inBrowser } from "../../public/js/in-browser";

export function useAxios(Vue, opts) {
  requestInterceptors();
  responseInterceptors();
  //axios in vue prototype
  Vue.prototype.$axios = axios;
}

//request interceptors
function requestInterceptors() {
  axios.interceptors.request.use(function (axiosConfig) {
    axiosConfig.timeout = config.axios.timeout;
    //ssr server set base path
    setInServer(axiosConfig);
    setHeader(axiosConfig);
    setFormData(axiosConfig);
    setProxy(axiosConfig);
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
  }, function (error) {
    $closeLoadding();
    $toast({
      message: error.message
    });
    return Promise.reject(error);
  });
}

function setInServer(axiosConfig) {
  if (!inBrowser()) {
    axiosConfig.url = `${config.path.base}${axiosConfig.url}`;
  }
}

//set request header
export function setHeader(axiosConfig) {
  const headers = axiosConfig.headers;
  headers['X-Requested-With'] = 'XMLHttpRequest';
  headers['Session'] = 'sessionKey';
  headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
}

//set x-www-form-urlencoded data
function setFormData(axiosConfig) {
  axiosConfig.data = paramsStringify(axiosConfig.data);
}

//set form type
export function paramsStringify(params) {
  const _params = [];
  utils.each(params, (item, key) => {
    _params.push(`${key}=${item}`);
  });
  return _params.join('&');
}

//ssr axios proxy
function setProxy(axiosConfig) {
  if (process.client) {
    axiosConfig.url = `/api${axiosConfig.url}`;
  }
}