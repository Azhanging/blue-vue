
const college = {
	path: 'college/:id',
	name: 'college',
	meta:{
		tabBar: false,
		pathID:15
	},
	component: resolve => require(['@/views/grow/college/college.vue'], resolve),

};

export default college;