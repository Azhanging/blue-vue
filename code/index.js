import router from '@router';
import code from './code';
import { unLogin, loginExpire } from '$assets/js/login';
import { bindPhone } from '$assets/js/bind';
import { toast } from '$use-in-vue/vant/toast';
import { redirect } from '$assets/js/redirect';

//错误码处理
export function codeHandler(res = {}) {
  const { code: requestCode, message } = res;

  switch (requestCode) {
    //重定向类型
    case code.REDIRECT:
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
      break;

    //未登录处理
    case code.UN_LOGIN:
      unLogin();
      break;

    //未绑定手机号
    case code.BIND_PHONE:
      bindPhone({
        to: router.currentRoute
      });
      break;

    //只做消息提醒
    case code.MESSAGE:
      toast({
        message: message
      });
      break;

    //登录超时
    case code.LOGIN_EXPIRE:
      loginExpire();
      break;

    //default
    default:
      ;
  }
}



