import utils from 'blue-utils';

let isSetWindowScrollEvent = false;

//初始化
export function initScroll() {
  setScrollEvent.call(this);
  //首次触发
  if (this.immediate) {
    scrollEventHandler(this);
  }
}

//检查节点时候是否为滑动节点
export function isSetScrollElm(elm) {
  const computedStyle = getComputedStyle(elm);
  if (computedStyle) {
    return /scroll|scroll-x|scroll-y|auto/.test(computedStyle.overflow);
  }
  return false;
}

//查找scroll的节点
function findScrollElm(elm) {
  let currentElm = elm;
  if (currentElm.nodeType !== 1) return null;
  while (currentElm.tagName !== 'HTML') {
    if (isSetScrollElm(currentElm)) {
      return currentElm;
    }
    currentElm = currentElm.parentNode;
  }
  return window;
}

//获取当前滑动elm
function getCurrentScrollElm() {
  const scrollElm = document.querySelectorAll('[data-scroll-elm]');
  if (scrollElm.length > 0) {
    return scrollElm[scrollElm.length - 1];
  }
  return null;
}

//获取子节点下的滑动层
function getScrollElmContainer(elm) {
  return elm.querySelector('[data-scroll-container]');
}

//事件处理
const scrollEventHandler = utils.debounce(function () {
  const currentScrollElm = getCurrentScrollElm();
  //被禁止不被触发 || 不存在节点的，不进行处理
  if (currentScrollElm && currentScrollElm.scrollView.disabled) return;
  //vue实例被挂载到elm中
  const scrollView = currentScrollElm.scrollView;
  let bottom, viewScrollTop;
  if (isSetScrollElm(currentScrollElm)) {
    //当前的容器是够为滑动类型的
    const scrollElm = getScrollElmContainer(currentScrollElm);
    const scrollElmHeight = scrollElm.clientHeight;
    const viewHeight = currentScrollElm.clientHeight;
    viewScrollTop = currentScrollElm.scrollTop;
    bottom = scrollElmHeight - (viewScrollTop + viewHeight);
  } else {
    //window
    const scrollElmHeight = currentScrollElm.clientHeight;
    const scrollElmTop = currentScrollElm.getBoundingClientRect().top;
    const viewHeight = document.documentElement.clientHeight;
    viewScrollTop = document.documentElement.scrollTop;
    bottom = (viewScrollTop + scrollElmTop + scrollElmHeight) - (viewScrollTop + viewHeight);
  }
  scrollView.$emit('scroll', {
    top: viewScrollTop
  });
  //触发到底部事件
  if (bottom <= scrollView.distance) {
    scrollView.$emit('scrolltolower');
  }

}, 200);


//设置事件流
function setScrollEvent() {
  //实例elm
  const elm = this.$el;
  //查找滑动elm
  const scrollElm = findScrollElm(elm);
  if (!scrollElm) return;
  elm.scrollView = this;
  if (isSetWindowScrollEvent === false && scrollElm === window) {
    isSetWindowScrollEvent = true;
    scrollElm.addEventListener('scroll', scrollEventHandler, false);
  } else if (scrollElm !== window) {
    scrollElm.addEventListener('scroll', scrollEventHandler, false);
  }
}