function inBrowser() {
  return process.client || process.browser;
}

//默认host
let host = `localhost`;

//避免 ssr 处理问题
if (inBrowser()) {
  //当前文件配置环境信息
  host = location.host;
}

//开发环境
const dev = (() => !(process.env.NODE_ENV === 'production'));

//beta环境
const beta = (() => (!dev) && (/beta\./ig.test(host)))();

//生产环境
const prod = (() => (!dev && !beta))();

module.exports = {
  dev,
  beta,
  prod
};