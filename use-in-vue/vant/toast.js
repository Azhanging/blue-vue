import { Toast } from 'vant';
import inBrowser from "$assets/js/in-browser";
import BlueQueuePipe from 'blue-queue-pipe';

export function useToast(Vue) {
  //打开loading
  Vue.prototype.$showLoading = showLoading;
  //关闭loading
  Vue.prototype.$hideLoading = hideLoading;
  //打开提醒
  Vue.prototype.$toast = toast;
  //关闭提醒
  Vue.prototype.$closeToast = closeToast;
}

//loading队列
const loadingQueue = new BlueQueuePipe();

//显示loading
export function showLoading(opts = {}) {
  if (!inBrowser()) return;
  if (loadingQueue.isEmpty()) {
    let config = {
      message: opts.message || '加载中...',
      show: true
    };
    !opts.message && delete config.message;
    Toast.loading(config);
  }
  loadingQueue.enqueue(true);
}

//关闭loading
export function hideLoading(hideAllLoading = false) {
  if (!inBrowser()) return;
  if (hideAllLoading === true) {
    loadingQueue.clear();
    Toast.clear();
  } else {
    loadingQueue.dequeue();
    loadingQueue.isEmpty() && Toast.clear()
  }
}

//最后一个toast
let lastToast;

//打开toast
export function toast(opts) {
  if (inBrowser()) {
    closeToast();
    lastToast = Toast(opts);
  }
}

//关闭toast
export function closeToast() {
  if (!lastToast) return;
  lastToast.clear();
}