//原生webview配合使用，任务队列运行
class NativeApp {
	constructor() {
		//所有的执行完毕的队列
		this.tasks = [];
	}

	addTask(fn) {
		if (typeof fn !== 'function') return;
		this.tasks.push(fn);
	}

	task(){
		while (this.tasks.length !== 0) {
			try {
				this.tasks.shift().call(this);
			} catch (e) {
				console.warn(e);
			}
		}
	}

}

export default NativeApp;