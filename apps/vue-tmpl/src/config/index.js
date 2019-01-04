import $utils from '$utils';
import { config } from '$config'

const programConfig = $utils.extend(config, {
  view: {
    title: "我是项目默认标题"
  }
});

export default programConfig;