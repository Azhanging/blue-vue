import BlueQueuePipe from 'blue-queue-pipe';

//后退的队列
export const historyQueue = new BlueQueuePipe({
  methods: {
    shift() {
      return this.queue.shift();
    }
  }
});

export function extendNativeHistory() {
  //初始化的back方法
  const historyBack = History.prototype.back;
  // 重写back,这里涉及到keep-alive处理，后退都会把当前的组件销毁掉，
  // 避免下一次进来走keep处理的时候都是读cache的instance
  History.prototype.back = function () {
    historyQueue.enqueue(`back`);
    historyBack.call(this);
  };
}