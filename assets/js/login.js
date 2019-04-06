import router from '@router';
import config from '@config';
import { $toast } from "$use-in-vue/mint-ui/toast";

//处理老登录业务
export function login() {
  const href = `${config.path.base}/home/common/index?url=${encodeURIComponent(router.$getHref())}`;
  //跳转登录页面，带上回跳的参数
  location.href = href;
}

//未登录
export function unLogin() {
	login();
	$toast({
		message: '跳转登录中...',
		duration: 10000
	});
}