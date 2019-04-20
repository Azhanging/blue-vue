import agent from "./agent";
import creator from "./creator";
import vip from "./vip";
import tools from "./tools";
import areaCreator from "./area-creator";

const member = {
  path: '/member',
  name: 'member',
  meta: {
    tabBar: false
  },
  component: () => import("@/views/member/member.vue"),
  children: [
    agent,        //代理
    creator,      //创客
    vip,          //vip
    tools,         //工具
	  areaCreator ,    //区域创客(老项目)
  ]
};

export default member;
