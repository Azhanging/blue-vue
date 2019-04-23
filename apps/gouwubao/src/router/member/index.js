import agent from "./agent";
import creator from "./creator";
import vip from "./vip";
import tools from "./tools";
import contract from './contract';
import areaCreator from "./area-creator";
import config from '@config';

const member = {
  path: '/member',
  name: 'member',
  //回到旧项目的办公室
  redirect() {
    location.href = `${config.path.base}/member`;
  },
  meta: {
    tabBar: false
  },
  component: () => import("@/views/member/member.vue"),
  children: [
    agent,        //代理
    creator,      //创客
    vip,          //vip
    tools,        //工具
    areaCreator,  //区域创客(老项目)
    contract        //合约相关
  ]
};

export default member;
