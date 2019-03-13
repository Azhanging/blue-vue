import axios from 'axios';
import router from '@router';
import config from '@config';
import utils from 'blue-utils';
import { $loadding, $closeLoadding } from '../mint-ui/indicator/index';
import { $toast } from "../mint-ui/toast"
import inBrowser from "$assets/js/in-browser";

export function useAxios(Vue, opts) {

  const $Axios = axios.create({
    timeout: config.axios.timeout,
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  });

  requestInterceptors($Axios);
  responseInterceptors($Axios);
  //axios in vue prototype
  Vue.prototype.$axios = $Axios;
}

//request interceptors
function requestInterceptors($Axios) {
  $Axios.interceptors.request.use(function (axiosConfig) {
    axiosConfig.timeout = config.axios.timeout;
    //ssr server set base path
    setInServer(axiosConfig);

    setFormData(axiosConfig);
    //ssr axios proxy
    setProxy(axiosConfig);
    //是否loadding显示
    if (axiosConfig.isLoadding === undefined ||
      axiosConfig.isLoadding === false) {
      $loadding({
        text: false
      });
    }
    return axiosConfig;
  }, function (error) {
    return Promise.reject(error);
  });
}

//response interceptors
function responseInterceptors($Axios) {
  $Axios.interceptors.response.use(function (res) {
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

//ssr set url
function setInServer(axiosConfig) {
  if (!inBrowser()) {
    axiosConfig.url = `${config.path.base}${axiosConfig.url}`;
  }
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