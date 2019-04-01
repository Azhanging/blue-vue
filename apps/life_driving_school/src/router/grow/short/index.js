
const short_course = {
	path: 'short',
	name: 'short',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/short/short.vue'], resolve),
	children:[
		{
			path:'shortdetail',
			meta:{
				tabBar: false
			},
			component: resolve => require(['@/views/grow/short/shortdetail.vue'], resolve),
		}
	]
};

export default short_course;