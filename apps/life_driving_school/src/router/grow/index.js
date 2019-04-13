import short from './short/index';
import zhuanqu from './zhuanqu/index';
import video from './video/index';

import college from './college'


const grow = {
	path: '/grow/:grow_id',
	name: 'grow',
	meta:{
		tabBar: false,
		pathID:[12]
	},
	component: resolve => require(['@/views/grow/grow.vue'], resolve),
	children:[
		video,
		zhuanqu,
		short,
		college
	]
};

export default grow;
