import axios from 'axios';
import router from '@router';
import config from '@config';
import utils from 'blue-utils';
import { $loadding, $closeLoadding } from '../mint-ui/indicator/index';
import { $toast } from "../mint-ui/toast"
import inBrowser from "$assets/js/in-browser";
import login from '$assets/js/login';

const $Axios = axios.create({
  timeout: config.axios.timeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

requestInterceptors($Axios);

responseInterceptors($Axios);

export function useAxiosInVue(Vue, opts) {
  //axios in vue prototype
  Vue.prototype.$axios = $Axios;
}

//request interceptors
function requestInterceptors($Axios) {
  $Axios.interceptors.request.use((axiosConfig) => {
    const isLoding = axiosConfig.isLoading;
    //ssr server set base path
    setInServer(axiosConfig);
    //set form data type
    setFormData(axiosConfig);
    //ssr axios proxy
    setProxy(axiosConfig);
    //是否loadding显示
    if (isLoding === undefined ||
      isLoding === true) {
      $loadding({
        text: false
      });
    }
    return axiosConfig;
  }, (error) => {
    return Promise.reject(error);
  });
}

//response interceptors
function responseInterceptors($Axios) {
  $Axios.interceptors.response.use((res) => {
    const status = res.status;
    const error = config.error;
    $closeLoadding();
    //success httprequest state
    if (status === 200) {
      const { code } = res.data;
      //未登录
      if (code === 10001) {
        login();
      } else {
        return res;
      }
    } else if (status >= 400 && status <= 599) {
      const errorPath = error[status] ? error[status].path : error[400].path;
      router.replace(errorPath);
    }
  }, (error) => {
    const isLoading = error.config.isLoading;
    $closeLoadding();

    //处理超时信息
    if (/timeout/ig.test(error.message)) {
      error.message = '数据请求超时，请刷新';
    }

    if (isLoading === undefined ||
      isLoading === true) {
      $toast({
        message: error.message
      });
    }
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
  axiosConfig.data = utils.stringifyParams(axiosConfig.data);
}

//ssr axios proxy
function setProxy(axiosConfig) {
  if (process.client) {
    axiosConfig.url = `/api${axiosConfig.url}`;
  }
}

export default $Axios;