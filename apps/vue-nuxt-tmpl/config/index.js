import $utils from 'blue-utils';
import { config } from '$config'

const programConfig = $utils.extend(config, {
  path: {
    base: 'http://fw.dtb315.com'
  }
});

export default programConfig;
