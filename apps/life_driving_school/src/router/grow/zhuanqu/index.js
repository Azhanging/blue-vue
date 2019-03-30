// const Zhuanqu = () => import(`@/views/life_school/zhuanqu`);

const special = {
	path: 'zhuanqu',
	name: 'zhuanqu',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/zhuanqu/special.vue'], resolve),
	children:[{
		path:'column',
		meta:{
			tabBar: false
		},
		component: resolve => require(['@/views/grow/zhuanqu/column.vue'], resolve),
	}]
};

export default special;