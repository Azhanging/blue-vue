import agent from "./agent";
import creator from "./creator";
import ProductAngel from "./product-angel";
import ServiceProviders from "./service-providers";
import BranchSchool from "./branch-school";
import SchoolBoard from "./school-board";
import CommercialCollege from "./commercial-college";
import producers from "./producers";
import owner from "./owner";
import consumers from "./consumers";
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
    ProductAngel,      //产品天使---完成
    ServiceProviders,      //服务商---完成
    BranchSchool,      //公益分校---完成
    SchoolBoard,      //荣誉校董---完成
    CommercialCollege,      //上大夫商学院
    producers,      //生产商---完成
    owner,      //项目金主---完成
    consumers,      //消费商
    vip,          //vip
    tools,        //工具
    areaCreator,  //区域创客(老项目)
    contract        //合约相关
  ]
};

export default member;
