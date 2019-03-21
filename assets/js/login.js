import router from '@router';
import config from '@config';

//处理老登录业务
export default function login() {
  const href = `${config.path.base}/home/common/index?url=${encodeURIComponent(router.$getHref())}`;
  //跳转登录页面，带上回跳的参数
  location.href = href;
}