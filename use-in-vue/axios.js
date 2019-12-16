import axios from 'axios';
import router, { routerMeta } from '@router';
import config from '@config';
import utils from 'blue-utils';
import { showLoading, hideLoading } from '$use-in-vue/mint-ui/indicator';
import { toast } from "$use-in-vue/mint-ui/toast";
import code from '$code/code';    //错误码
import { codeHandler } from '$code';   //错误码处理
import { redirect } from '$assets/js/redirect';

const consoleStyle = `background-color:#0f8cca;color:white;padding:2px 4px;border-radius:4px;`

//柯里化 axios
const $axios = axios.create(utils.extend({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}, config.axios));

//拦截request
$axios.interceptors.request.use((axiosConfig) => {
  //把路由当前路由的id设置给axios config中
  axiosConfig.routeID = routerMeta.getCurrentRouteID();
  const isShowLoading = axiosConfig.isShowLoading;
  //mode为token，设置header头
  setRequestHeader(axiosConfig);
  //set form data type
  setFormData(axiosConfig);
  //是否loading显示
  if (isShowLoading === undefined || isShowLoading === true) {
    //设置当前的loading的id
    showLoading({
      text: false
    });
  }
  return axiosConfig;
}, (error) => {
  return Promise.reject(error);
});

//拦截response
$axios.interceptors.response.use((res) => {
  const status = res.status;
  const axiosConfig = res.config;
  const isShowLoading = axiosConfig.isShowLoading;
  if (isShowLoading === undefined || isShowLoading === true) {
    hideLoading();
  }
  //success http request state
  if (status === 200) {
    const { code: requestCode, message, consoleMessage } = res.data;
    //后台指派console信息打印
    consoleMessage && console.log(`%cRequest Message:${consoleMessage}`, consoleStyle);
    //success code
    if (requestCode === code.SUCCESS) {
      return res.data;
    } else if (requestCode === code.REDIRECT) {    //作为重定向跳转
      let redirectTime = 0;
      //存在重定向信息
      if (message) {
        toast({
          message
        });
        redirectTime = 1000;
      }
      setTimeout(() => {
        redirect(res.data);
      }, redirectTime);
      return Promise.reject(res.data);
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
  hideLoading();

  //检查当前的路由标识和当前路由中的id标识是否一样
  //不一样不去执行后面异步的操作
  if (!routerMeta.isCurrentRouteID(axiosConfig.routeID)) {
    return Promise.reject(error);
  }

  //处理超时信息，重写信息,只有超时有提示
  if (isTimeout) {
    toast({
      message: error.message = '请求超时，请刷新页面'
    });
  }

  //跳转指定的错误状态页
  if (status >= 400 && status < 600 && !config.debug) {
    const errorPath = errorConfig[status] ? errorConfig[status].path : errorConfig[404].path;
    router.replace(errorPath);
  }

  return Promise.reject(error);
});

//扩展到Vue中
export function useAxiosInVue(Vue, opts = {}) {
  //axios in vue prototype
  Vue.prototype.$axios = $axios;
}

//set x-www-form-urlencoded data
function setFormData(axiosConfig) {
  axiosConfig.data = utils.stringifyParams(axiosConfig.data);
}

//设置header中的token
function setRequestHeader(axiosConfig) {
  const { headers } = axiosConfig;
  utils.each(config.login.storage, (key) => {
    const getItem = window.localStorage.getItem(key) || window.sessionStorage.getItem(key);
    if (getItem) {
      headers[key.replace(/([A-Z])/g, `-$1`).toLowerCase()] = getItem;
    }
  });
}

export default $axios;