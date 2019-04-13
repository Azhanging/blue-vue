import agent from "./agent";
import creator from "./creator";
import vip from "./vip";

const member = {
  path: '/member',
  name: 'member',
  meta: {
    tabBar: false
  },
  component: () => import("@/views/member/member.vue"),
  children: [
    agent,
    creator,
    vip
  ]
};

export default member;
