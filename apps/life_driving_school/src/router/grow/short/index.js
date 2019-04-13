
const short_course = {
	path: 'short/:id',
	name: 'short',
	meta:{
		tabBar: false,
		pathID:[17]
	},
	component: resolve => require(['@/views/grow/short/short.vue'], resolve),
	children:[
		{
			path:'detail',
			meta:{
				tabBar: false
			},
			component: resolve => require(['@/views/grow/short/detail.vue'], resolve),
		}
	]
};

export default short_course;