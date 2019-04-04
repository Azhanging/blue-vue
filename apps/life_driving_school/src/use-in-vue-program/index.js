import BvHomeView from '../components/public/bv-home-view/bv-home-view';

import WTabBar from '../components/wap/w-tab-bar/w-tab-bar';
import WHomeHeader from '../components/wap/w-home-header/w-home-header';
import WHomeNav from '../components/wap/w-home-nav/w-home-nav';
import config from '@config';

export function useInVueProgram(opts) {

	const { Vue } = opts;

	if (config.device.isWap) {
    //移动端公共组件
	} else if (config.device.isPc) {
		//PC端公共组件
	}

	//移动端公共组件
  Vue.component('w-tab-bar', WTabBar);
  Vue.component('w-home-header', WHomeHeader);
  Vue.component('w-home-nav', WHomeNav);


	//移动PC公共使用的组件
	Vue.component('bv-home-view', BvHomeView);

}