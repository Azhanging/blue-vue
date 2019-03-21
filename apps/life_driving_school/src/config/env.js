//当前文件配置环境信息

const host = location.host;

//开发环境
const dev = (() => {
  return /localhost|192\.168|127\.0\.0\.1|pc\./ig.test(host);
})();

//beta环境
const beta = (() => {
  return (!dev) && (/beta\./ig.test(host));
})();

//生产环境
const prod = (() => {
  return (!dev && !beta);
})();

export default {
  dev,
  beta,
  prod
};