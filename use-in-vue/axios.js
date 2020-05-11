import axios from 'axios';
import router, { routerID } from '@router';
import config from '@config';
import utils from 'blue-utils';
import { hideLoading, showLoading, toast } from '$use-in-vue/vant/toast';
import code from '$code/code'; //错误码
import { codeHandler } from '$code'; //错误码处理

const consoleStyle = `background-color:#0f8cca;color:white;padding:2px 4px;border-radius:4px;`;

//柯里化 axios
const $axios = axios.create(utils.extend({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  }
}, config.request));

//拦截request
$axios.interceptors.request.use((axiosConfig) => {
  //把路由当前路由的id设置给axios config中
  axiosConfig.routeID = routerID.getCurrentID();
  //mode为token，设置header头
  setRequestHeader(axiosConfig);
  //set form data type
  setFormData(axiosConfig);
  //是否loading显示
  axiosConfig.showLoading && showLoading({
    message: '加载中...'
  });
  return axiosConfig;
}, (error) => {
  const { axiosConfig } = error;
  const { showLoading } = axiosConfig;
  showLoading && hideLoading();
  return Promise.reject(error);
});

//拦截response
$axios.interceptors.response.use((res) => {
  const { config } = res;
  const { showLoading, routeID } = config;
  showLoading && hideLoading();
  //匹配路由id和请求id是够一致，不一致不进行处理
  if (!routerID.isCurrentID(routeID)) {
    return Promise.reject(res.data);
  }
  //success http request state
  const { code: requestCode, message, consoleMessage } = res.data;
  //后台指派console信息打印
  consoleMessage && console.log(`%cRequest Message:${consoleMessage}`, consoleStyle);
  //success code
  if (requestCode === code.SUCCESS) {
    //信息toast
    message && toast({
      message
    });
    return res.data;
  } else {
    //code处理
    codeHandler(res.data);
    //避免原来then上的业务，走reject
    return Promise.reject(res.data);
  }
}, (error) => {
  const axiosConfig = error.config;
  const { message: errorMsg } = error;
  const { showLoading, routeID } = axiosConfig;
  const isTimeout = /timeout/ig.test(errorMsg);
  const status = isTimeout ? 'timeout' : error.response.status;
  const errorConfig = config.error;

  //关闭loading
  showLoading && hideLoading();

  //匹配路由id和请求id是够一致，不一致不进行处理
  if (!routerID.isCurrentID(routeID)) {
    return Promise.reject(error);
  }

  //处理超时信息，重写信息,只有超时有提示
  if (/timeout/ig.test(errorMsg)) {
    toast({
      message: '请求超时，请刷新页面'
    });
  } else if (/Network\sError/.test(errorMsg)) {
    toast({
      message: '网络已断开，请检查网络'
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
export function useAxiosInVue(Vue) {
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