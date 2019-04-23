import router from '@router';
import config from '@config';
import { $toast } from "$use-in-vue/mint-ui/toast";

//处理老登录业务
export function login() {

  let href;
  //检查是否为混合开发
  if (config.mixedDevelopment) {
    href = `${config.path.login}?url=${encodeURIComponent(`${config.path.indexPath}/${router.mode === 'hash' ? '#' : ''}${router.currentRoute.fullPath}`)}`;
  } else {
    href = `${config.path.login}?url=${encodeURIComponent(router.getHref())}`;
  }

  //跳转登录页面，带上回跳的参数
  location.href = href;
}

//未登录
export function unLogin() {
  login();
  $toast({
    message: '跳转登录中...',
    duration: 60000
  });
}