const Zhuanqu = () => import(`../../views/zhuanqu/index.vue`);

const special = {
	path: '/zhuanqu',
	name: 'zhuanqu',
	component: Zhuanqu,
	children:[]
};

export default special;