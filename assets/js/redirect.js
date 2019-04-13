/*
* 重定向
* */
import config from '@config';

//服务器返回重定向
export function serverRedirect(opts = {}) {
  const redirectUrl = window._assign.redirect_url;
  if (redirectUrl && redirectUrl !== '{$redirect_url}') {
    location.href = `${config.path.indexPath}${redirectUrl}`;
    return false;
  }
  return true;
}

//304状态重定向
export function redirect(opts = {}) {
  location.href = opts.url || '/';
}