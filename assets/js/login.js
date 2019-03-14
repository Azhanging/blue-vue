import router from '@router';
import config from '@config';

//处理老登录业务
export default function login() {
  const currentRoute = router.currentRoute;
  //跳转登录页面，带上回跳的参数
  location.href = `${config.path.base}/home/common/index?url=${encodeURIComponent(currentRoute.fullPath)}`;
}