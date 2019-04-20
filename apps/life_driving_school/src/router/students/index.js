const students = {
	path: '/students',
	name: 'students',
	meta:{
		tabBar: false
	},
	component: () => import("@views/students/students.vue"),
	children: [{
		path: 'message',
		component: () => import("@views/students/message/message"),
		meta: {
			tabBar: false
		},
		children: [{
			path: 'comment',
			component: () => import("@views/students/message/message-list/message-comment"),
			meta: {
				tabBar: false
			},
		},{
			path: 'fabulous',
			component: () => import("@views/students/message/message-list/message-fabulous"),
			meta: {
				tabBar: false
			},
		},{
			path: 'station',
			component: () => import("@views/students/message/message-list/message-station"),
			meta: {
				tabBar: false
			},
		},{
			path: 'notice',
			component: () => import("@views/students/message/message-list/message-notice"),
			meta: {
				tabBar: false
			},
		},{
			path: 'detail/:article_id',
			component: () => import("@views/zixun/detail/zixun-detail"),
			meta: {
				tabBar: false
			},
		}]
	},{
		path: 'qr-code',
		component: () => import("@views/students/qr-code/qr-code"),
		meta: {
			tabBar: false
		},
	},{
		path: 'collection',
		component: () => import("@views/students/collection/collection"),
		meta: {
			tabBar: false
		},
		children: [{
			path: 'detail/:article_id',
			component: () => import("@views/students/collection/detail"),
			meta: {
				tabBar: false
			},
		}]
	},{
		path: 'history',
		component: () => import("@views/students/history/history"),
		meta: {
			tabBar: false
		},
		children: [{
			path: 'detail/:article_id',
			component: () => import("@views/students/history/detail"),
			meta: {
				tabBar: false
			},
		}]
	},{
		path: 'contribute',
		component: () => import("@views/students/contribute/contribute"),
		meta: {
			tabBar: false
		},
	},{
		path: 'feedback',
		component: () => import("@views/students/feedback/feedback"),
		meta: {
			tabBar: false
		},
	},{
		path: 'for-points',
		component: () => import("@views/students/for-points/for-points"),
		meta: {
			tabBar: false
		},
	}],
};

export default students;
