import utils from 'blue-utils';
import publicMutation from '$config/store/mutations';

//扩展公共的mutations
const mutations = utils.extend(publicMutation, {
  /*项目相关mutation*/
});

export default mutations;