import axios from 'axios';
import router, { routerID } from '@router';
import config from '@config';
import utils from 'blue-utils';
import { $loading, $closeLoading } from '../mint-ui/indicator';
import { $toast } from "../mint-ui/toast"
import inBrowser from "$assets/js/in-browser";
import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理
import { redirect } from '$assets/js/redirect';

//柯里化 axios
const $axios = axios.create({
  timeout: config.axios.timeout,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
});

//拦截request
requestInterceptors();

//拦截response
responseInterceptors();

//扩展到Vue中
export function useAxiosInVue(Vue, opts = {}) {
  //axios in vue prototype
  Vue.prototype.$axios = $axios;
}

//request interceptors
function requestInterceptors() {
  $axios.interceptors.request.use((axiosConfig) => {
    //把路由当前路由的id设置给axios config中
    axiosConfig.routerID = routerID.getCurrentRouterID();
    const isLoading = axiosConfig.isLoading;
    //mode为token，设置header头
    (config.login.mode === 'token') && (setHeaderToken(axiosConfig));
    //ssr server set base path
    setInServer(axiosConfig);
    //set form data type
    setFormData(axiosConfig);
    //ssr axios proxy
    setProxy(axiosConfig);
    //是否loading显示
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
function responseInterceptors() {
  $axios.interceptors.response.use((res) => {
    const status = res.status;
    const axiosConfig = res.config;
    const isLoading = axiosConfig.isLoading;
    if (isLoading === undefined || isLoading === true) {
      $closeLoading(axiosConfig.loadingID);
    }
    //success httprequest state
    if (status === 200) {
      const { code: requestCode, message } = res.data;
      //success code
      if (requestCode === code.SUCCESS) {
        return res.data;
      } else if (requestCode === code.REDIRECT) {    //作为重定向跳转
        let redirectTime = 0;
        //存在重定向信息
        if (message) {
          $toast({
            message
          });
          redirectTime = 1000;
        }
        setTimeout(() => {
          redirect(res.data);
        }, redirectTime);
      } else {
        //code处理
        codeHandler(res.data);
        //避免原来then上的业务，走reject
        return Promise.reject(res.data);
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
    if (!routerID.isCurrentRouteID(axiosConfig.routerID)) {
      return Promise.reject(error);
    }

    //处理超时信息，重写信息,只有超时有提示
    if (isTimeout) {
      error.message = '请求超时，请刷新页面';
      $toast({
        message: error.message
      });
    }

    //跳转指定的错误状态页
    if (status >= 400 && status < 600 && !config.debug) {
      const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
      router.push(errorPath);
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

//设置header中的token
function setHeaderToken(axiosConfig) {
  const { headers } = axiosConfig;
  utils.each(config.login.storage, (key) => {
    const getItem = localStorage.getItem(key);
    if(getItem){
      headers[key] = getItem;
    }
  });
}

export default $axios;