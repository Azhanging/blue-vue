// const Zhuanqu = () => import(`@/views/life_school/zhuanqu`);

const special = {
	path: 'zhuanqu/:id',
	name: 'zhuanqu',
	meta:{
		tabBar: false,
		pathID:18
	},
	component: resolve => require(['@/views/grow/zhuanqu/zhuanqu.vue'], resolve),
	children:[{
		path:'column',
		meta:{
			tabBar: false
		},
		component: () => import("@/views/grow/zhuanqu/column/column.vue"),
		children:[{
			path:'album',
			meta:{
				tabBar: false
			},
			component: () => import("@/views/grow/zhuanqu/column/album.vue"),
			children:[{
				path:'album-detail',
				meta:{
					tabBar: false
				},
				component: () => import("@/views/grow/zhuanqu/column/album-detail.vue"),
			}]
		}]
	}]
};

export default special;