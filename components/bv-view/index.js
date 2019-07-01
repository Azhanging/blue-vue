import config from '@config';
import { mockViewScroll } from '$assets/js/device';
import router from '@router';

const viewScrollClassName = '.bv-view-scroll';

//获取的view element
export function getScrollElm() {
  return this.$el.children[0];
}

//获取当前的view层elm
export function getLastViewElm() {
  const viewScrolls = document.querySelectorAll(viewScrollClassName);
  if (viewScrolls && viewScrolls.length > 0) {
    return viewScrolls[viewScrolls.length - 1];
  }
  return null;
}

//设置当前elm的scroll
export function setCurrentViewScroll(position = {
  x: 0,
  y: 0
}) {
  const lastView = getLastViewElm();
  lastView && (lastView.scrollTop = position.x);
}


//set view scroll event
export function setViewEvent() {
  const scrollElm = getScrollElm.call(this);
  let timer = 0;

  //view scroll event
  scrollElm.addEventListener('scroll', (event) => {
    const elm = event.target;
    //节流处理scrollTop
    clearTimeout(timer);
    timer = setTimeout(() => {
      const scrollTop = elm.scrollTop;
      //组件内的scroll记录
      this.scroll.top = scrollTop;
      //针对的keep-alive中vue针对scroll抓取pageXOffset
      if (router.currentRoute.meta.keepAlive !== false) {
        window.pageXOffset = scrollTop;
      }
    }, 150);
    //滑动的时候也隐藏子菜单的状态
    this.hideTabBarSubmenu();
    //阻止scroll冒泡
    event.stopPropagation();
  }, false);
}

//ios input bug
export function inputEvent() {
  const device = config.device;
  if (device.isWap && (device.isIPhone || device.isIPad)) {
    mockViewScroll();
  }
}