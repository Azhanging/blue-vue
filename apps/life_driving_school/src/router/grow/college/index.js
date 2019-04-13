import books from "../books";

const college = {
	path: 'college/:id',
	name: 'college',
	meta:{
		tabBar: false,
		pathID:[15]
	},
	component: resolve => require(['@/views/grow/college/college.vue'], resolve),
	children:[{
		path: 'detail/:article_id',
		name: 'collegedetail,',
		meta:{
			tabBar: false
		},
		component:  resolve => require(['@/views/grow/college/detail.vue'], resolve),
	},books]
};

export default college;
