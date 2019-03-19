import config from '@config';
import router from '@router';
import store from '@store';
import utils from 'blue-utils';
import { Base64 } from 'js-base64';
import { $toast } from '$use-in-vue/mint-ui/toast/index'

//分享的url可能是动态需要的配置，可以为String或者Function
export function shareLink(opts = {}) {
  //获取的link 配置 -> 默认分享 -> 当前页面
  const link = opts.link || config.share.link || router.$getHref();
  if (utils.isStr(link)) {
    return shareLinkParams(link);
  } else if (utils.isFunction(link)) {
    return shareLinkParams(utils.hook(null, link));
  }
}

//扩展分享链接参数
function shareLinkParams(link) {
  //分享的链接
  let shareLink = '';
  const share = config.share;
  const shareParams = share.params;

  //用户手机号
  const phone = store.state.userInfo.phone;

  if (false) {

    const origin = link.split('?')[0];

    //路径中的query
    const linkQuery = utils.parseParams(link);

    //默认扩展手机号参数
    const resultLink = utils.extend(linkQuery, {
      [shareParams.phone]: phone ? Base64.encode(phone) : ''
    });

    shareLink = `${origin}?${utils.stringifyParams(resultLink)}`;

  } else {

    const fullPath = (() => {
      const mode = router.mode;
      if (mode === 'history') {
        return router.currentRoute.fullPath;
      } else if (mode === 'hash') {
        return `/#${router.currentRoute.fullPath}`;
      }
    })();

    const params = {
      [shareParams.phone]: phone ? Base64.encode(phone) : '',
      [shareParams.redirectUrl]: fullPath
    };

    shareLink = `${config.path.base}/?${utils.stringifyParams(params)}`;

  }

  return shareLink;

}

//公共的分享 app 分享 || 普通浏览器和微信提示分享操作
export function share(opts) {
  const device = config.device;
  const shareConfig = config.share;

  //webview分享
  if (device.isApp) {
    try {
      dtb.iPhoneShare(JSON.stringify({
        title: opts.title || shareConfig.title,
        descr: opts.descr || shareConfig.deps,
        thumImage: opts.thumImage || shareConfig.imgUrl,
        shareUrl: shareLink({
          link: opts.shareUrl || shareConfig.link
        }),
        params: opts.params || shareConfig.params
      }));
    } catch (e) {
      console.warn(`share error:`, e);
    }
  } else if (device.isWeChat) {// 微信端
    $toast({
      message: '点击右上角“...”分享按钮进行转发'
    });
  } else if (device.isWap) {  // app端
    $toast({
      message: '请通过浏览器自带分享功能进行转发'
    });
  }

}