import { Indicator } from 'mint-ui';
import inBrowser from "$assets/js/in-browser";
import BlueQueuePipe from 'blue-queue-pipe';

export function setIndicator(Vue) {

  //indicator
  Vue.prototype.$indicator = Indicator;

  //open loadding
  Vue.prototype.$showLoading = showLoading;

  //close loadding
  Vue.prototype.$hideLoading = hideLoading;

}

//loading队列
const loadingQueue = new BlueQueuePipe();

export function hideLoading(hideAllLoading = false) {
  if (!inBrowser()) return;
  if (hideAllLoading === true) {
    loadingQueue.clear();
    Indicator.close();
  } else {
    loadingQueue.dequeue();
    loadingQueue.isEmpty() && Indicator.close();
  }
}

export function showLoading(opts = {}) {
  if (inBrowser()) {
      if (loadingQueue.isEmpty()) {
      let config = {
        text: opts.text || '加载中...',
        spinnerType: opts.spinnerType || 'snake'
      };
      if (!opts.text) {
        delete config.text;
      }
      Indicator.open(config);
    }
    loadingQueue.enqueue(1);
  }
}