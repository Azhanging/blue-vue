import utils from "blue-utils";

const BlueQueuePipe = require("blue-queue-pipe");

/* 定位状态
 * free 空闲中
 * using 使用中
 * */
const LOCATION_STATE = {
  FREE: `free`,
  USING: `using`,
};

const locationQueue = new BlueQueuePipe({
  data: {
    /* 定位状态
     * free 空闲中
     * using 使用中
     * */
    locationStatus: LOCATION_STATE.FREE,
  },
  methods: {
    //设置定位状态
    setLocationStatus(status = LOCATION_STATE.FREE) {
      this.data.locationStatus = status;
    },
  },
  //走完队列后，状态修正
  ran() {
    this.data.locationStatus = LOCATION_STATE.FREE;
  },
});

//获取当前地址
export function getCurrentLocation(opts = {}) {
  alipayReady(() => {
    const { success, fail, ...otherOpts } = opts;
    const { data: locationQueueData } = locationQueue;
    //写进队列
    //成功队列信息
    locationQueue.enqueue((opts) => {
      const { result, type } = opts;
      if (type !== `success`) return;
      console.log(`获取实时定位信息`, result);
      utils.hook(null, success, [result]);
    });
    //失败队列信息
    locationQueue.enqueue((opts) => {
      const { result: error, type } = opts;
      if (type !== `fail`) return;
      console.log(`定位失败`, error);
      utils.hook(null, fail, [error]);
    });
    if (locationQueueData.locationStatus === LOCATION_STATE.USING) return;
    //修改状态
    locationQueue.useMethod(`setLocationStatus`, [LOCATION_STATE.USING]);
    AlipayJSBridge.call(
      `getCurrentLocation`,
      utils.extend(otherOpts, {
        requestType: 0,
        bizType: `%s`,
      }),
      (res) => {
        if (res.error) {
          console.log(res.message || `定位失败`);
          locationQueue.run({
            type: `fail`,
            result: res.error,
          });
        } else {
          locationQueue.run({
            type: `success`,
            result: res,
          });
        }
      }
    );
  });
}

// 由于机制问题，JSAPI注入是异步过程，时序无法保证。
// 如果使用原生AlipayJSBridge接口，需要先监听AlipayJSBridgeReady事件后再调用原生JSAPI接口。
export function alipayReady(callback) {
  // 如果jsbridge已经注入则直接调用
  if (window.AlipayJSBridge) {
    callback && callback();
  } else {
    // 如果没有注入则监听注入的事件
    document.addEventListener("AlipayJSBridgeReady", callback, false);
  }
}
