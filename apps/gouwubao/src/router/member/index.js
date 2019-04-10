import agent from "./agent";
import chuangke from "./chuangke";
import myVip from "./my-vip";

const member = {
  path: '/member',
  name: 'member',
  meta: {
    tabBar: false
  },
  component: () => import("@/views/member/member.vue"),
  children: [{
    path: 'join/agent',
    component: () => import("@/views/member/join/agent/agent.vue"),
    meta: {
      tabBar: false
    }
  }]
	children:[
		agent,
		chuangke,
		myVip
	]
};

export default member;
