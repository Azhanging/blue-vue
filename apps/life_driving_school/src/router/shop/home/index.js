const Shop = () => import(`@/views/shop/home`);

const shopHome = {
	path: '/shop',
	name: 'shop',
	component: Shop,
	meta:{
		title: '商城',
	},
};

export default shopHome;