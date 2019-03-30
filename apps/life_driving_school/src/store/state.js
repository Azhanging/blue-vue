import utils from 'blue-utils';
import publicState from '$config/store/state';

//扩展公共的state
const state = utils.extend(publicState, {
  /*项目相关的state*/
  view: {
    tabBar: 'home'
  },
  userInfo: {},
	//聊天信息
  msg:{},
	token:null,
	websocket: {
		status: false //当前的链接状态
	},
});

export default state;