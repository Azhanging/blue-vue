/*
* 重定向
* */
import router from '@router';

//304状态重定向
export function redirect(opts = {}) {
  const { url } = opts;
  const _url = url || '/';
  if (/^http/.test(_url)) {
    location.href = _url;
  } else {
    router.replace(_url);
  }
}