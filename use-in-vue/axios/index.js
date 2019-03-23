import axios from 'axios';
import router, { routerId } from '@router';
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
    //把路由当前路由的id设置给axios config中
    axiosConfig.routerId = routerId.getCurrentRouterId();
    const isLoading = axiosConfig.isLoading;
    //ssr server set base path
    setInServer(axiosConfig);
    //set form data type
    setFormData(axiosConfig);
    //ssr axios proxy
    setProxy(axiosConfig);
    //是否loadding显示
    if (isLoading === undefined ||
      isLoading === true) {
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
    $closeLoadding();
    //success httprequest state
    if (status === 200) {
      const { code } = res.data;
      //未登录
      if (code === 10001) {
        login();
        $toast({
          message: '跳转登录中...',
          duration: 10000
        });
      } else {
        return res;
      }
    }
  }, (error) => {
    const axiosConfig = error.config;
    const isTimeout = /timeout/ig.test(error.message);
    const status = isTimeout ? 'timeout' : error.response.status;
    const errorConfig = config.error;
    $closeLoadding();

    //检查当前的路由标识和当前路由中的id标识是否一样
    //不一样不去执行后面异步的操作
    if (!routerId.isCurrentRoute(axiosConfig.routerId)) {
      return Promise.reject(error);
    }

    //处理超时信息，重写信息
    if (isTimeout) {
      error.message = '数据请求超时，请刷新';
    }

    //只有超时有提示
    if (isTimeout) {
      $toast({
        message: error.message
      });
    }

    //跳转指定的错误状态页
    if (status >= 400 && status < 600) {
      const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
      router.replace(errorPath);
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