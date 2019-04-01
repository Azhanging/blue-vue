import Vue from 'vue';
import store from '@store';

export default class WebSocketChat{
	constructor(path) {
		this.websocket = new WebSocket(path);
		this.init();
	}
	init(){
		this.onclose();
		this.onMessage();
		this.onopen()
	}
	onopen(){
		this.websocket.onopen = () => {
			//更新连接状态
			store.commit('updateWebsocketStatus', {
				status: true
			});
			console.log('连接...');
		}
	}
	onclose() {
		this.websocket.onclose = () => {
			console.log('连接已关闭...');
		}
	}
	onMessage(cb) {
		this.websocket.onmessage = (data) => {
			cb.call(this, data);
		}
	}
}

export function chatFn(opts){

	const msg = new WebSocketChat(opts.url);
				// state = store.state;

	//设置msg到state的状态中
	// Vue.set(state.websocket, 'msg', msg);

	//接受到消息
	// msg.onMessage((evt) => {
	// 	const data = JSON.parse(evt.data),
	// 				type = data.type;

		//存在新的token，更新一次
		// if(data.token) {
		// 	store.commit('updateToken', {
		// 		token: data.token
		// 	});
		// }

		// if(type == 'ping' || type == 'pong') {

			//发送token值
			// msg.websocket.send(JSON.stringify({
			// 	token: store.state.token,
			// 	type: 'pong'
			// }));
			// return;

		// } else if(type == 'say') {
		//
		// 	//接受到信息，更新到用户信息列表中
		// 	store.commit('addNewMsg', {
		// 		id: data.id,
		// 		msg: {
		// 			id: data.msg.id,
		// 			msg: data.msg.msg,
		// 			time: data.msg.time
		// 		},
		// 		head: data.head,
		// 		username: data.from_client_name,
		// 		token: store.state.token
		// 	});
		//
		// }


	// })
}





// chatFn({
// 	url:data.url
// });