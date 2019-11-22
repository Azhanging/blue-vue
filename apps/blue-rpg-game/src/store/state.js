import utils from 'blue-utils';
import publicState from '$config/store/state';

//扩展公共的state
const state = utils.extend(publicState, {
  /*项目相关的state*/
  view: {
    tabBar: 'home'
  },
  //角色相关信息
  roleInfo: {}
});

export default state;