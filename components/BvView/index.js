import config from '@config';
import { mockViewScroll } from '$assets/js/device';
import router from '@router';
import utils from 'blue-utils';

const viewScrollClassName = '.bv-view-scroll';

//获取的view element
export function getScrollElm() {
  if (this.$el.nodeType === 1) {
    return this.$el.children[0];
  }
  return null;
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
  lastView && (lastView.scrollTop = position.y);
}


//set view scroll event
export function setViewEvent() {
  const scrollElm = getScrollElm.call(this);
  if (!scrollElm) return;
  //scroll 节流实现
  const scrollDebounce = utils.debounce(function (event) {
    const elm = event.target;
    const scrollTop = elm.scrollTop;
    //组件内的scroll记录
    this.scroll.top = scrollTop;
    //针对的keep-alive中vue针对scroll抓取pageXOffset
    if (router.currentRoute.meta.keepAlive !== false) {
      window.pageYOffset = scrollTop;
    }
  }, 150);

  //view scroll event
  scrollElm.addEventListener('scroll', (event) => {
    //节流处理scrollTop
    scrollDebounce(this, [event]);
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