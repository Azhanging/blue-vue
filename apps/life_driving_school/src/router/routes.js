import article from "./article";
import errorPage from "./error-page";
import home from "./home";
import lifeNav from "./life-nav";
import industry from "./industry";
import grow from "./grow";
import ecosystem from "./ecosystem";

//一级挂载的路由
const routes = [
  home,       //首页
  article,
  industry,   //产业链
  grow,       //成长系统
  ecosystem,  //生态圈
  lifeNav,    //生命导航
  errorPage   //错误页
];

export default routes;