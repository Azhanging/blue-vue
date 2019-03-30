
const video = {
	path: 'books',
	name: 'books',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/books/books.vue'], resolve),
};

export default video;