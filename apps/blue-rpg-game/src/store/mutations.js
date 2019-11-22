import utils from 'blue-utils';
import publicMutation from '$config/store/mutations';

//扩展公共的mutations
const mutations = utils.extend(publicMutation, {
  /*项目相关mutation*/

  //设置当前的角色信息
  SET_ROLE_INFO(state, roleData) {
    state.roleInfo = roleData;
  }
});

export default mutations;