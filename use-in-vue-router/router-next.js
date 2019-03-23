/*
* 处理路由下一跳
* */
import utils from 'blue-utils';

class RouterNext {
  constructor(opts = {}) {
    this.nextStatusHooks = [];
    this.options = opts;
  }

  add(nextStatus = []) {
    if (utils.isArray(nextStatus)) {
      this.nextStatusHooks = this.nextStatusHooks.concat(nextStatus);
    } else {
      this.nextStatusHooks.push(nextStatus);
    }
  }

  nextStatus() {
    const nextStatusHooks = this.nextStatusHooks;
    const preventRouterNext = this.constructor.preventRouterNext;
    const { to, from } = this.options;
    const nextStatusHooksLen = (nextStatusHooks || []).length;

    //四种情况，path，false，Error参照官方文档中的next处理
    // true 或者 undefined（没有返回值） 走默认的next()处理
    for (let i = 0; i < nextStatusHooksLen; i++) {
      const nextStatus = nextStatusHooks[i];
      if (preventRouterNext(nextStatus)) {
        return nextStatus;
      } else if (utils.isFunction(nextStatus)) {
        const cbNextStatus = utils.hook(null, nextStatus, [to, from]);
        if (preventRouterNext(cbNextStatus)) {
          return cbNextStatus;
        }
      }
    }
    return true;
  }

  //阻止路由next处理
  static preventRouterNext(nextStatus) {
    return (utils.isStr(nextStatus)) || (nextStatus instanceof Error) || (nextStatus === false);
  }

}

export default RouterNext;