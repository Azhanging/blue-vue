import bindPhone from "./bind-phone";
import home from "./home";
import errorPage from "./error-page";
import role from './scene/role';
import map from './scene/map';

//一级挂载的路由
const routes = [
  ...home,       //首页
  ...role,      //角色相关
  ...map,       //地图相关
  bindPhone,    //绑定手机
  errorPage     //错误页
];

export default routes;