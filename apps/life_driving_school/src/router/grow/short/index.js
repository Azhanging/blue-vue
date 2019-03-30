
const short_course = {
	path: 'short',
	name: 'short',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/short/short.vue'], resolve),
	children:[]
};

export default short_course;