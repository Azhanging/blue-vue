import bindPhone from "./bind-phone";
import home from "./home";
import errorPage from "./error-page";
import role from './scene/role';
import map from './scene/map';
import npc from './scene/npc';
import resource from './scene/resource';
import task from './scene/task';
import fight from "./scene/fight";
import knapsack from "./scene/knapsack";

//一级挂载的路由
const routes = [
  ...home,      //首页
  ...role,      //角色相关
  ...map,       //地图相关
  ...npc,       //npc
  ...resource,  //资源
  ...task,      //任务
  ...fight,     //战斗
  ...knapsack,  //背包
  bindPhone,    //绑定手机
  errorPage     //错误页
];

export default routes;