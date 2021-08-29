import config from '@config';
import router from '@router';
import store from '@store';
import utils from 'blue-utils';
import { Base64 } from 'js-base64';
import { toast } from '$use-in-vue/vant/toast';

//分享的url可能是动态需要的配置，可以为String或者Function
export function shareLink() {
  //分享的域名配置
  const shareOrigin = config.share.origin || config.path.base || location.origin;
  return `${shareOrigin}/?${shareLinkParams()}`;
}

//扩展分享链接参数
function shareLinkParams() {
  const share = config.share;
  const shareParams = share.params;
  //用户手机号
  const phone = store.state.userInfo.phone;

  const params = {
    [shareParams.phone]: (phone && Base64.encode(phone)) || '',
    [shareParams.backUrl]: router.$getModePath()
  };

  return utils.stringifyParams(params);
}

//公共的分享 app 分享 || 普通浏览器和微信提示分享操作
export function share() {
  const device = config.device;
  if (device.isWeChat) { // 微信端
    toast({
      message: '点击右上角“...”分享按钮进行转发'
    });
  } else if (device.isWap) {    //移动端
    toast({
      message: '请通过浏览器自带分享功能进行转发'
    });
  }
}