const pkg = require('./package');
const vueConfig = require('./vue.config');
const utils = require('../../public/js/utils');

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/component.css' },
    ],
    script: [
      { src: "//res.wx.qq.com/open/js/jweixin-1.4.0.js" }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/use-in-vue',
    '@/plugins/extend-in-vue'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  proxy: {
    "/api": {
      target: 'http://fw.dtb315.com',
      pathRewrite: {
        "^/api": ""
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, { isClient, isServer, isDev }) {
      //extend my vue public config
      if (isClient) {
        utils.extend(config, vueConfig.configureWebpack, false);
      } else if (isServer) {
        utils.extend(config.resolve.alias, vueConfig.configureWebpack.resolve.alias, false);
      }
    }
  },
  router: {
    middleware: ['user-agent']
  }
};
