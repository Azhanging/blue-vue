import agent from "./agent";
import chuangke from "./chuangke";
import myVip from "./my-vip";
import join from "./join";

const member = {
  path: '/member',
  name: 'member',
  meta: {
    tabBar: false
  },
  component: () => import("@/views/member/member.vue"),
  children: [
    join,
    agent,
    chuangke,
    myVip
  ]
};

export default member;
