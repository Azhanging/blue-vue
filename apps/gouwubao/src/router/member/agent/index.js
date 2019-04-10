const agent = {
	path: 'agent',
	meta:{
		tabBar: false
	},
	component: () => import("@/views/member/agent/agent.vue"),
	children: [{
		path: 'mall-income',
		component: () => import("@/views/member/components/mall-income"),//商城收益
		meta: {
			tabBar: false
		}
	},{
		path: 'for-the',
		component: () => import("@/views/member/components/for-the"),//商城收益
		meta: {
			tabBar: false
		}
	},{
		path: 'history',
		component: () => import("@/views/member/components/history"),//历史收益
		meta: {
			tabBar: false
		}
	},{
		path: 'tutoring',
		component: () => import("@/views/member/components/tutoring"),//辅导收益
		meta: {
			tabBar: false
		}
	},{
		path: 'to-quit',
		component: () => import("@/views/member/agent/to-quit"),//申请退出
		meta: {
			tabBar: false
		}
	}]
};

export default agent;
