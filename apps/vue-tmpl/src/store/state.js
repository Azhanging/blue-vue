import utils from '$utils';
import { state as publicState } from '$config/store/state';

//extend public state in program
const state = utils.extend(publicState, {
  view: {
    navigator: 'home'
  }
});

export default state;