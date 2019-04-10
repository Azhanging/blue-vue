const myVip = {
	path: 'my-vip',
	meta:{
		tabBar: false
	},
	component: () => import("@/views/member/my-vip/my-vip"),//vip
	children: [{
		path:'trading',
		meta: {
			tabBar: false
		},
		component: () => import("@/views/member/my-vip/trading/trading"),//交易记录
	},{
		path:'renewal',
		meta: {
			tabBar: false
		},
		component: () => import("@/views/member/my-vip/renewal/renewal"),//支付
	}]
};

export default myVip;
