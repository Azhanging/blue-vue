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
		this.onopen();
	}
	onopen(){
		this.websocket.onopen = () => {
			//更新连接状态
			// console.log('连接...');
			// this.websocket.send(JSON.stringify({
			// 	live_video_id: config.id,
			// 	content: config.textareaVal
			// }));
		}
	}
	close(){
		this.websocket.close()
	}
	onclose() {
		// this.websocket.close()

		this.websocket.onclose = () => {
			// console.log('连接已关闭...');
		}
	}
	onMessage(cb) {
		this.websocket.onmessage = (data) => {
			// console.log('接收到....')
			cb.call(this, data);
		}
	}
	send(){
		this.websocket.send = (data) => {
			// console.log('发送')
			// cb.call(this, data);
		}
	}
}

export function chatFn(opts) {

	const msg = new WebSocketChat(opts.url);

}