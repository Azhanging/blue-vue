import utils from 'blue-utils';
import publicMutation from '$config/store/mutations';

//扩展公共的mutations
const mutations = utils.extend(publicMutation, {
  /*项目相关mutation*/
	updateWebsocketStatus(state, opts) {
		state.websocket.status = opts.status;
	}
});

export default mutations;