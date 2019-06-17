import router from '@router';
import { $toast } from "$use-in-vue/mint-ui/toast";

//处理老登录业务
export function login() {
  //跳转登录页面，带上回跳的参数
  location.href = router.mixedDevelopmentPath('login');
}

//未登录
export function unLogin() {
  login();

  $toast({
    message: '跳转登录中...',
    duration: 60000
  });
}