import home from "./home";
import components from "./components";
import errorPage from "./error-page";
import list from "./list";

//一级挂载的路由
const routes = [
  ...list,      //列表
  ...home,       //首页
  ...components, //组件
  ...errorPage   //错误页
];

export default routes;