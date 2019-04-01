
const video = {
	path: 'books',
	name: 'books',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/books/books.vue'], resolve),
	children: [{
		path: 'chapter',
		component: () => import("@/views/grow/books/chapter"),
		meta: {
			tabBar: false
		}
	}]
};

export default video;