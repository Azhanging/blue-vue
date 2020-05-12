import config from '@config';
import store from '@store';
import router from '@router';

//绑定手机
export function bindPhone() {
  const userInfo = store.state.userInfo;
  const phone = userInfo.phone;
  const bindPhonePath = config.path.bindPhone;
  const backUrl = router.constructor.config.params;
  const { fullPath } = router.currentRoute;

  //没有绑定手机跳转到指定的链接，指定的链接必须存在
  if (!phone && bindPhonePath && (fullPath !== bindPhonePath)) {
    router.replace(`${bindPhonePath}?${backUrl}=${fullPath}`);
  }
}