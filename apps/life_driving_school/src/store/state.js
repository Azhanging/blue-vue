import utils from 'blue-utils';
import publicState from '$config/store/state';

//扩展公共的state
const state = utils.extend(publicState, {
  /*项目相关的state*/
  view: {
    tabBar: 'home'
  },
  userInfo: {},
});

export default state;