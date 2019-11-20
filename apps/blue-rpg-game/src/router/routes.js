import bindPhone from "./bind-phone";
import home from "./home";
import errorPage from "./error-page";

//一级挂载的路由
const routes = [
  ...home,       //首页
  bindPhone,  //绑定手机
  errorPage   //错误页
];

export default routes;