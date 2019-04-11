import short from './short/index';
import zhuanqu from './zhuanqu/index';
import video from './video/index';
import books from './books';
import detail from './detail';
import college from './college'


const grow = {
	path: '/grow/:id',
	name: 'grow',
	meta:{
		tabBar: false,
		pathID:12
	},
	component: resolve => require(['@/views/grow/grow.vue'], resolve),
	children:[
		video,
		zhuanqu,
		short,
		books,
		detail,
		college
	]
};

export default grow;