import config from '@config';
import router from '@router';
import store from '@store';
import utils from 'blue-utils';
import { Base64 } from 'js-base64';

//分享的url可能是动态需要的配置，可以为String或者Function
export function shareLink(opts) {
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

  const origin = link.split('?')[0];

  //路径中的query
  const linkQuery = utils.parseParams(link);

  const share = config.share;

  const shareParams = share.params;

  const phone = store.state.userInfo.phone;

  //默认扩展手机号参数
  const resultLink = utils.extend(linkQuery, {
    [shareParams.phone]: phone ? Base64.encode(phone) : ''
  });

  const shareLink = `${origin}?${utils.stringifyParams(resultLink)}`;

  return shareLink;

}