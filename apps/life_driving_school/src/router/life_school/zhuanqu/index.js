// const Zhuanqu = () => import(`@/views/life_school/zhuanqu`);

const special = {
	path: '/zhuanqu',
	name: 'zhuanqu',
	component: resolve => require(['@/views/life_school/zhuanqu'], resolve),
	children:[]
};

export default special;