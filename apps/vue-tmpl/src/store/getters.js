import publicGetters from '$config/store/getters';
import utils from 'blue-utils';

//扩展公共的getters
const getters = utils.extend(publicGetters,{
  /*项目相关的getters*/
});

export default getters;