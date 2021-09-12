import utils from 'blue-utils';

let context = null;

const SET_KEEP_ALIVE_EXCLUDE = `SET_KEEP_ALIVE_EXCLUDE`;

const STORE_MODULE_KEY = `KEEP_ALIVE`;

//把keep alive exclude状态处理在store module
function storeRegisterModule() {
  this.store.registerModule(STORE_MODULE_KEY, {
    state: {
      exclude: []
    },
    mutations: {
      [SET_KEEP_ALIVE_EXCLUDE](state, exclude) {
        state[STORE_MODULE_KEY] = exclude;
      }
    }
  });
}

//设置路由钩子状态
function setRouterHooks() {
  const { router } = this;
  //路由进前处理
  router.beforeEach((to, from, next) => {
    beforePushHistory.call(this, {
      to, from, next
    });
  });
  //路由进入后的处理
  router.afterEach(() => {
    //写入history
    pushHistory.call(this);
  });
}

//注册处理popState事件处理
function popStateEvent() {
  const popStateHandler = (event) => {
    const { history } = this;
    const { key } = event.state;
    const nextHistory = queryHistoryByKey.call(this, {
      key,
      type: `next`
    });
    const currentHistory = queryHistoryByKey.call(this, {
      key
    });
    //记录popstate的name,这里可能是被销毁过的history
    this.currentPopStateName = currentHistory ? currentHistory.name : null;
    //如果当前页的下一个页面（后退回来的页面）在history中有记录，这里清空缓存
    if (nextHistory && history.indexOf(nextHistory.key)) {
      const { name, key } = nextHistory;
      //获取store中的exclude state
      const exclude = this.getExcludeState();
      if (exclude.includes(name)) return;
      exclude.push(name);
      //设置store
      setKeepAliveExclude.call(this, exclude);
      setTimeout(() => {
        const exclude = this.getExcludeState();
        const index = exclude.indexOf(name);
        if (index !== -1) {
          exclude.splice(index, 1);
        }
        //设置store
        setKeepAliveExclude.call(this, exclude);
        //再历史中的index
        const historyIndex = queryHistoryByKey.call(this, {
          key,
          findIndex: true
        });
        //这里删除排序
        if (historyIndex !== -1) {
          history.splice(historyIndex, 1);
        }
      }, 50);
    }
  };

  const event = `popstate`;
  window.addEventListener(event, popStateHandler);
  return () => {
    window.removeEventListener(event, popStateHandler);
  }
}

//进入路由前处理
function beforePushHistory(opts = {}) {
  const { to, from, next } = opts;
  const { meta } = to;
  const { name } = meta;
  //如果当前是通过popstate触发的，不进行缓存的处理
  if (name === this.currentPopStateName) return next();
  this.currentPopStateName = null;
  //找一下之前历史是否存在相同的缓存（回环访问的那种情况）
  const findHistory = queryHistoryByName.call(this, { name });
  //如果之前存在缓存了，先杀掉之前的缓存
  if (findHistory.length === 0) return next();
  //获取store中的exclude state
  const exclude = this.getExcludeState();
  if (!exclude.includes(name)) {
    //写入排除缓存name
    exclude.push(name);
    //设置store
    setKeepAliveExclude.call(this, exclude);
    //下一跳移除对应的规则
    setTimeout(() => {
      //获取store中的exclude state
      const exclude = this.getExcludeState();
      const index = exclude.indexOf(name);
      if (index !== -1) {
        exclude.splice(index, 1);
      }
      //设置store
      setKeepAliveExclude.call(this, exclude);
      //删除历史记录
      removeHistoryByName.call(this, { name });
      //完成处理
      next();
    });
  }
}

//设置store
function setKeepAliveExclude(exclude) {
  this.store.commit(SET_KEEP_ALIVE_EXCLUDE, utils.deepCopy(exclude));
}

//路由访问的时候，加入对应的key处理
function pushHistory() {
  const { key } = history.state;
  if (!this.router || !key) return;
  const currentHistory = queryHistoryByKey.call(this, { key });
  if (currentHistory) return;
  const { currentRoute } = this.router;
  const { meta } = currentRoute;
  const { name } = meta;
  if (!name) return;
  //写入历史
  this.history.push({
    //state.key
    key,
    //组件的name
    name,
    //这里是记录加入时间
    time: +new Date()
  });
}

//删除历史记录
function removeHistoryByName(opts = {}) {
  const { name } = opts;
  const { history } = this;
  const findHistory = queryHistoryByName.call(this, {
    name
  });
  while (findHistory.length) {
    const index = history.indexOf(findHistory[findHistory.length - 1]);
    history.splice(index, 1);
    findHistory.pop();
  }
}

//通过key查询历史
function queryHistoryByKey(opts = {}) {
  const { history } = this;
  const {
    /*current next index*/
    type = `current`,
    findIndex = false,
    key
  } = opts;
  for (let index = 0; index < history.length; index++) {
    const currentHistory = history[index];
    const nextHistory = history[index + 1];
    if (currentHistory.key === key && (type === `next` && nextHistory)) {
      if (findIndex) return index;
      return nextHistory;
    } else if (currentHistory.key === key && type === `current`) {
      if (findIndex) return index;
      return currentHistory;
    }
  }
  if (findIndex) return -1;
  return null;
}

//通过name查询历史记录 这里提供给router afterEach使用
function queryHistoryByName(opts = {}) {
  const {
    name
  } = opts;
  const findHistory = [];
  if (!name) return findHistory;
  const { history } = this;
  history.forEach((_history) => {
    if (_history.name !== name) return;
    findHistory.push(_history);
  });
  return findHistory;
}

export default class RouterKeepAlive {

  constructor(options = {}) {
    this.options = utils.extend({
      router: null,
      store: null
    }, options);
    //单例
    if (context) return context;
    context = this;
    //历史记录存储
    this.history = [];
    //vue-router 相关的路由
    this.router = options.router;
    //vuex相关
    this.store = options.store;
    //记录当前popstate触发的key
    this.currentPopStateName = null;
    //动态注册store
    storeRegisterModule.call(this);
    //设置afterEach
    setRouterHooks.call(this);
    //注册popstate事件处理
    popStateEvent.call(this);
  }

  //获取store module keep alive
  getExcludeState() {
    const { state } = this.store;
    return state[STORE_MODULE_KEY].exclude || [];
  }
}