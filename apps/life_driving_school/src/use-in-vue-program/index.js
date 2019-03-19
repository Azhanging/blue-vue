import BvHomeView from '../components/public/bv-home-view/bv-home-view';


import WNavigator from '../components/wap/w-navigator/w-navigator';
import WHomeHeader from '../components/wap/w-home-header/w-home-header';
import WHomeNav from '../components/wap/w-home-nav/w-home-nav';

import config from '@config';


export function useInVueProgram(opts) {

	const { Vue } = opts;

	//移动端公共组件
	if (config.device.isWap) {
		Vue.component('w-navigator', WNavigator);
		Vue.component('w-home-header', WHomeHeader);
		Vue.component('w-home-nav', WHomeNav);
	} else if (config.device.isPc) {
		//PC端公共组件

	}


	//移动PC公共使用的组件
	Vue.component('bv-home-view', BvHomeView);


}