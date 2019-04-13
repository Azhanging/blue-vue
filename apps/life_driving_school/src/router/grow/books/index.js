
const video = {
	path: 'books/:id',
	name: 'books',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/books/books.vue'], resolve),
	children: [{
		path: 'chapter/:chapter_id',
		component: () => import("@/views/grow/books/chapter"),
		meta: {
			tabBar: false
		},
		children: [{
			path: 'detail/:yuedu_id',
			component: () => import("@/views/grow/books/detail"),
			meta: {
				tabBar: false
			}
		}]
	}]
};

export default video;
