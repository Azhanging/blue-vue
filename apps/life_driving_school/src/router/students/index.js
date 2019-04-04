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
	},{
		path: 'history',
		component: () => import("@views/students/history/history"),
		meta: {
			tabBar: false
		},
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
	}],
};

export default students;
