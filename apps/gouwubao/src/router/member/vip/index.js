const vip = {
	path: 'vip',
	component: () => import("@/views/member/vip/vip"), //vip
	children: [{
		path:'trading',
		component: () => import("@/views/member/vip/trading"), //交易记录
	}]
};

export default vip;
