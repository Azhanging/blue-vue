import utils from 'blue-utils';
import publicConfig from '$config';
//环境
const env = require('./env');

//合并公共的配置
const config = utils.extend(publicConfig, {
	view: {
		title: "BLUE-TEXT-RPG-GAME",
		tabBar: 'home',
		keepAlive: {
			exclude: /.+/
		}
	},
	env,
	path: {
		base: location.origin,
		static: location.origin,
		login: `/login`
	},
	share: {
		title: "blue-vue-tmpl",
		deps: "blue-vue-tmpl is vue public template",
		imgUrl: ""
	},
	user: {
		url: '/member/getUserInfo'
	},
	login: {
		in: {
			url: `/admin/login/in`
		},
		storage: {
			['secret-key']: 'secret-key'
		}
	},
	axios: {
		baseURL: '/api',
		timeout: 999999999
	},
	debug: true
});

export default config;