const newecosystem = {
	path: '/tow-nav/:tow_nav_id',
	component: () => import("@views/ecosystem/tow-nav/tow-nav"),
	meta: {
		tabBar: false
	},
	children: [
		{
			path: 'tow-nav-detail/:tow_nav_detail_id',
			component: () => import("@views/ecosystem/tow-nav-detail/tow-nav-detail"),
			meta: {
				tabBar: false,
			},
			children: [
				{
					path: 'more-infor',
					component: () => import("@views/ecosystem/more-infor/more-infor"),
					meta: {
						tabBar: false,
					},
					children:[
						{
							path: 'detail/:article_id',
							component: () => import("@views/ecosystem/components/detail"),
							meta: {
								tabBar: false,
							}
						}
					]
				}, {
					path: 'more-course',
					component: () => import("@views/ecosystem/more-course/more-course"),
					meta: {
						tabBar: false,
					},
					children:[
						{
							path: 'detail/:article_id',
							component: () => import("@views/ecosystem/components/detail"),
							meta: {
								tabBar: false,
							}
						}
					]
				}, {
					path: 'more-serve',
					component: () => import("@views/ecosystem/more-serve/more-serve"),
					meta: {
						tabBar: false,
					}
				}, {
					path: 'more-product',
					component: () => import("@views/ecosystem/more-product/more-product"),
					meta: {
						tabBar: false,
					}
				},{
					path: 'detail/:article_id',
					component: () => import("@views/ecosystem/components/detail"),
					meta: {
						tabBar: false,
					}
				}
			]
		},
	]
};

export default newecosystem;
