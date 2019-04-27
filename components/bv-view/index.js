import config from '@config';
import { mockViewScroll } from '$assets/js/device';

const viewScrollClassName = '.bv-view-scroll';

function getScrollElm() {
  const viewElm = this.$el;
  return viewElm.children[0];
}

//set view scroll event
export function setViewEvent() {
  const scrollElm = getScrollElm.call(this);
  let timer = 0;

  //设置父级view组件的scroll状态
  setParentViewScroll({
    scrollElm,
    type: 'mounted'
  });

  //view scroll event
  scrollElm.addEventListener('scroll', (event) => {
    const elm = event.target;
    //节流处理scrollTop
    clearTimeout(timer);
    timer = setTimeout(() => {
      this.scroll.top = elm.scrollTop;
    }, 150);

    //滑动的时候也隐藏子菜单的状态
    this.hideTabBarSubMenu();

  }, false);
}

//设置父级view组件的scroll状态
export function setParentViewScroll(opts = {}) {

  const { scrollElm, type } = opts;

  const viewScrolls = document.querySelectorAll(viewScrollClassName);

  const findIndex = [].indexOf.call(viewScrolls, scrollElm);

  if (type === 'mounted') {
    if (viewScrolls.length >= 2) {
      [].forEach.call(viewScrolls, (viewElm, index) => {
        if (index < findIndex) {
          viewElm.style.overflowY = 'hidden';
        }
      });
    }
  } else if (type === 'destroyed' && scrollElm) {
    scrollElm.style.overflowY = 'scroll';
  }
}

//查找父级的view元素
export function findParentView() {
  const elm = getScrollElm.call(this);
  const viewScrolls = document.querySelectorAll(viewScrollClassName);
  if (viewScrolls.length >= 2 && elm) {
    const findIndex = [].indexOf.call(viewScrolls, elm);
    return viewScrolls[findIndex - 1];
  }
  return null;
}

//ios input bug
export function inputEvent() {
  const device = config.device;
  if (device.isWap && (device.isIPhone || device.isIPad)) {
    mockViewScroll();
  }
}