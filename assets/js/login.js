import router from "@router";
import config from "@config";
import { toast } from "$use-in-vue/vant/toast";
import utils from "blue-utils";

//跳转到登录页面
export function routerToLogin() {
  router.replace(
    `${config.path.login}?${utils.stringifyParams({
      redirect_uri: router.currentRoute.fullPath,
    })}`
  );
}

//未登录
export function unLogin() {
  //跳转到登录
  routerToLogin();
  toast({
    message: "跳转登录中...",
    duration: 1000,
  });
}

//登录超时
export function loginExpire() {
  clearLoginStorage();
  routerToLogin();
}

//设置登录状态到本地存储
export function setLoginStorage(data) {
  utils.each(config.auth.storage, (key) => {
    key in data && localStorage.setItem(key, data[key]);
  });
}

//删除登录态
export function clearLoginStorage() {
  utils.each(config.auth.storage, (key) => {
    localStorage.removeItem(key);
  });
}
