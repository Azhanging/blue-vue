import short from './short/index';
import zhuanqu from './zhuanqu/index';
import video from './video/index';
import books from './books';
import detail from './detail';


const grow = {
	path: '/grow',
	name: 'grow',
	meta:{
		tabBar: false
	},
	component: resolve => require(['@/views/grow/grow.vue'], resolve),
	children:[
		detail,
		video,
		zhuanqu,
		short,
		books
	]
};

export default grow;