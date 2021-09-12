import home from "./home";
import components from "./components";
import keepAlive from "./keep-alive";
import errorPage from "./error-page";

//一级挂载的路由
const routes = [
  ...home,       //首页
  ...components, //组件
  ...keepAlive, //缓存测试
  ...errorPage   //错误页
];

export default routes;