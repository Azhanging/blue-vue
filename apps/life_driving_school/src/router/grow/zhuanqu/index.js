// const Zhuanqu = () => import(`@/views/life_school/zhuanqu`);

const special = {
	path: 'zhuanqu/:classId',
	name: 'zhuanqu',
	meta:{
		tabBar: false,
		pathID:[18]
	},
	component: resolve => require(['@/views/grow/zhuanqu/zhuanqu.vue'], resolve),
	children:[{
		path:'column/:column_id',
		meta:{
			tabBar: false
		},
		component: () => import("@/views/grow/zhuanqu/column/column.vue"),
		children:[{
			path:'album/:album_id',
			meta:{
				tabBar: false
			},
			component: () => import("@/views/grow/zhuanqu/column/album.vue"),
			children:[{
				path:'album-detail/:album_detail_id',
				meta:{
					tabBar: false
				},
				component: () => import("@/views/grow/zhuanqu/column/album-detail.vue"),
			}]
		}]
	}]
};

export default special;
