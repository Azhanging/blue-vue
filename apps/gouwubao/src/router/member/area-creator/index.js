const areaCreator = {
	path: 'area-creator',
	component: () => import('@/views/member/area-creator/index.vue'),
	children:[{
		path:'await-pay',
		component: () => import('@/views/member/area-creator/await-pay.vue'),
	},{
		path:'history-data',
		component: () => import('@/views/member/area-creator/history-data.vue'),
	},{
		path:'store-income',
		component: () => import('@/views/member/area-creator/store-income.vue'),
	},{
		path:'store-income-detail',
		component: () => import('@/views/member/area-creator/store-income-detail.vue'),

	}]
};

export default areaCreator;