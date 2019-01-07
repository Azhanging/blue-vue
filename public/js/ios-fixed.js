import config from '@config';

//处理ios软键盘导致fixed失效问题
export function iosFixed() {
  if (config.env.isIphone) {
    //软键盘收起触发
    document.body.addEventListener('focusout', () => {
      document.body.scrollTop = document.body.scrollHeight;
    });
  }
}