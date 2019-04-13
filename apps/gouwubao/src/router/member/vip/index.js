const vip = {
	path: 'vip',
	meta:{
		tabBar: false
	},
	component: () => import("@/views/member/vip/vip"), //vip
	children: [{
		path:'trading',
		meta: {
			tabBar: false
		},
		component: () => import("@/views/member/vip/trading/trading"), //交易记录
	}]
};

export default vip;
