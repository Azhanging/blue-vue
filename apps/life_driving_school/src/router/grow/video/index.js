
const video = {
	path: 'video/:classId',
	name: 'video',
	meta:{
		tabBar: false,
		pathID:[16]
	},
	component: resolve => require(['@/views/grow/video/video.vue'], resolve),
	children:[{
		path: 'room',
		name: 'videoRoom',
		meta:{
			tabBar: false
		},
		component: resolve => require(['@/views/grow/video/video_room.vue'], resolve),
	}]
};

export default video;