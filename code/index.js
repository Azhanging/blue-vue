import code from './code';
import { unLogin } from '$assets/js/login';
import { bindPhone } from '$assets/js/bind';
import { $toast } from '$use-in-vue/mint-ui/toast';
import router from '@router';

//错误码处理
export function codeHandler(opts = {}) {
	const {code: requestCode, message} = opts;
	switch (requestCode) {

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
			$toast({
				message: message
			});
			break;

		//default
		default:
			;
	}
}



