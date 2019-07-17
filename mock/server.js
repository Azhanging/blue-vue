const bodyParser = require(`body-parser`);
const utils = require("blue-utils");
const chokidar = require('chokidar');

//路由的配置
const routerOpts = require("./route-opts");


//注册路由
function registerRouter(opts) {
  const { app, apiPath } = opts;
  const mockApi = require(apiPath);
  const routerStack = getAppRouterStack(app);
  let startIndex = routerStack.length;

  utils.each(mockApi, (opts) => {
    const _opts = utils.extend(routerOpts, opts);
    const { url, type, response } = _opts;
    app[type](url, (req, res) => {
      return response(req, res);
    });
  });

  return {
    startIndex,
    endIndex: routerStack.length
  };
}

//删除路由注册
function unRegisterRouter(opts = {}) {
  const { mockDir } = opts;
  const requireCache = require.cache;
  Object.keys(requireCache).forEach((modulePath) => {
    if (modulePath.includes(mockDir)) {
      delete requireCache[modulePath];
    }
  });
}

function getAppRouterStack(app) {
  return app._router.stack;
}

//mock server
function mockServer(opts = {
  app: {},
  mockDir: ``,
  apiPath: ``
}) {

  const { app, mockDir, apiPath } = opts;

  app.use(bodyParser.urlencoded({
    extended: false
  }));

  app.use(bodyParser.json());

  const routerStack = getAppRouterStack(app);

  //注册api路由
  let { startIndex, endIndex } = registerRouter({
    app,
    apiPath
  });

  //检查文件变化，以便初始化时候设置
  chokidar.watch(mockDir, {
    ignoreInitial: true
  }).on('all', (event, path) => {
    //插件文件的变化或者新增的文件
    if (event === 'change' || event === 'add') {
      console.log(`mock server file change:${path}`);
      //删除之前注册的路由
      unRegisterRouter({
        mockDir
      });
      //注册api路由
      const {
        startIndex: asyncStartIndex,
        endIndex: asyncEndIndex
      } = registerRouter({
        app,
        apiPath
      });
      //替换原来router上的middleware
      routerStack.splice(
        startIndex,
        endIndex - startIndex,
        ...routerStack.splice(asyncStartIndex, asyncEndIndex - asyncStartIndex)
      );
      endIndex = startIndex + (asyncEndIndex - asyncStartIndex);
    }
  });

}

module.exports = mockServer;