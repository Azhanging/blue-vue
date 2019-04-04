import axios from 'axios';
import router, { routerID } from '@router';
import config from '@config';
import utils from 'blue-utils';
import { $loading, $closeLoading } from '../mint-ui/indicator/index';
import { $toast } from "../mint-ui/toast"
import inBrowser from "$assets/js/in-browser";
import errcodes from '$errcode/errcodes';    //错误码
import { errCodeHandler } from '$errcode';   //错误码处理

//柯里化 axios
const $Axios = axios.create({
  timeout: config.axios.timeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

requestInterceptors($Axios);

responseInterceptors($Axios);

export function useAxiosInVue(Vue, opts = {}) {
  //axios in vue prototype
  Vue.prototype.$axios = $Axios;
}

//request interceptors
function requestInterceptors($Axios) {
  $Axios.interceptors.request.use((axiosConfig) => {
    //把路由当前路由的id设置给axios config中
    axiosConfig.routerID = routerID.getCurrentRouterID();
    const isLoading = axiosConfig.isLoading;
    //ssr server set base path
    setInServer(axiosConfig);
    //set form data type
    setFormData(axiosConfig);
    //ssr axios proxy
    setProxy(axiosConfig);
    //是否loadding显示
    if (isLoading === undefined || isLoading === true) {
      //设置当前的loading的id
      axiosConfig.loadingID = $loading({
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
    const axiosConfig = res.config;
    const isLoading = axiosConfig.isLoading;
    if (isLoading === undefined || isLoading === true) {
      $closeLoading(axiosConfig.loadingID);
    }
    //success httprequest state
    if (status === 200) {
      const { code } = res.data;
      //success code
      if (code === errcodes.SUCCESS) {
        return res;
      } else {
        //error code错误码处理
        errCodeHandler({
          code
        });
      }
    }
  }, (error) => {
    const axiosConfig = error.config;
    const isTimeout = /timeout/ig.test(error.message);
    const status = isTimeout ? 'timeout' : error.response.status;
    const errorConfig = config.error;
    $closeLoading(axiosConfig.loadingID);

    //检查当前的路由标识和当前路由中的id标识是否一样
    //不一样不去执行后面异步的操作
    if (!routerID.isCurrentRoute(axiosConfig.routerID)) {
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