# blue-vue-program
Vue项目公共层

## 文件目录

### ./apps 
vue项目文件夹

### ./vue-config 
公共的vue配置信息，项目的vue.config.js extend当前配置
有关devServer，在before中存在mockServer的使用

### [mockServer](https://www.npmjs.com/package/blue-mock-server)
```javascript
const mockServer = require('blue-mock-server'); 
mockServer({
  app,
  apiFilePath: ``,     //api路径，用绝对路径
  mockDir: ``      //mock路径，用于修改文件，新增文件更新文件缓存使用，用绝对路径
});
```

### ./components 
公共的组件

注：cnpm i 后，因为npm包中存在bug
把./components/vue-upload-component/vue-upload-component.js,
./components/mint-ui/mint-ui.js复制到node_modules相对的npm包中

### ./config
公共的配置信息，项目中的的config会extend当前配置

    2019-8-5 22:20:06 新增keepAlive的过滤控制
    - config.view.keepAlive.exclude 对照 ```<keep-alive :exclude="config.keepAlive.exclude" /> 

### ./assets
需要走loader的公共的资源文件 js || scss || css ...

### ./use-in-vue
注册Vue组件，插件，使用插件都在 ./use-in-vue/index中定义

## Vue-Router
router中的配置问题，每个路由项中，meta的配置都关系到当前访问路由。

### meta 配置

- title：页面的标题，不填写会默认读取config中的view.title
- nav：页面的导航，false || 'navName'，false为不显示导航，
navName为你自己定义的导航名，
具体使用查看（公共组件bv-tab-bar）和（项目组件w-tab-bar）
- afterHook：router afterEach后的执行，路由走完后会走当前钩子,
如当前路由是需要单独设置分享信息的，需要在当前的钩子执行 weChatShare方法，
如果没有定义afterHook，路由则会走unRouterAfterHook方法
- query：上一次entry保存的route.query（不要手动修改）
- params：上一次entry保存的route.params（不要手动修改）

## 项目的配置demo查看./apps/vue-tmpl里的相关组件使用和配置信息

项目内的组件，考虑到多端的使用规范，config.device中的信息来区分当前的端，
项目组件中存在三种公共的组件， pc,wap,public 三个存放位置，按不同端的需要来放置

## 针对keep-alive的缓存处理

第一次request可以写在created hook中，
第二次request数据在activated hook里面处理
（除非是beforeRouteUpdate的状态，params和query都改变了，可以写在activated中），


所有的route.meta.refresh.status = true;会在下一次beforeEntry nextTick才会重置为false。

1. back后的当前的route.meta.refresh.status会默认为true。
2. 通过meta.refresh.unforcedList不在这列表里的route也会设置为true。
3. 排除以上两种情况都为false

（注:路由回环会进行query和params的差异对比，
也会导致route.meta.refresh.status的变更，status会设置为true）






















