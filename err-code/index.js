import errcodes from './errcodes';
import { $toast } from "../use-in-vue/mint-ui/toast";
import login from '$assets/js/login';
import { bindPhone } from '$assets/js/bind';
import router from '@router';

//错误码处理
export function errCodeHandler(opts = {}) {
  const { code } = opts;
  switch (code) {

    //未登录处理
    case errcodes.UN_LOGIN:
      unLogin();
      break;

    //未绑定手机号
    case errcodes.BIND_PHONE:
      bindPhone({
        to: router.currentRoute
      });
      break;
  }
}

//未登录
function unLogin() {
  login();
  $toast({
    message: '跳转登录中...',
    duration: 10000
  });
}

