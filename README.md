# blue-vue-program
public vue program 

## 文件目录

### ./apps 
vue项目文件夹

### ./vue-config 
公共的vue配置信息，项目的vue.config.js extend当前配置
有关devServer，在before中存在mockServer的使用

#### mockServer
```javascript
mockServer({
  app,
  apiPath: ``,     //api路径，用绝对路径
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

### ./assets
需要走loader的公共的资源文件 js || scss || css ...

### ./use-in-vue
注册Vue组件，插件，使用插件都在 ./use-in-vue/index中定义

## Vue-Router
router中的配置问题，每个路由项中，meta的配置都关系到当前访问路由。

#### meta 配置

title：页面的标题，不填写会默认读取config中的view.title

nav：页面的导航，false || 'navName'，false为不显示导航，
navName为你自己定义的导航名，
具体使用查看（公共组件bv-tab-bar）和（项目组件w-tab-bar）

afterHook：router afterEach后的执行，路由走完后会走当前钩子,
如当前路由是需要单独设置分享信息的，需要在当前的钩子执行 weChatShare方法，
如果没有定义afterHook，路由则会走unRouterAfterHook方法

## 项目的配置demo查看./apps/vue-tmpl里的相关组件使用和配置信息

项目内的组件，考虑到多端的使用规范，config.device中的信息来区分当前的端，
项目组件中存在三种公共的组件， pc,wap,public 三个存放位置，按不同端的需要来放置


## 针对keep-alive的缓存处理

可以在activated hook里面处理请求数据，init和back都会触发activated从而更新数据。
类似列表的相同路径不同的params或者query可以通过loadMore里面routerKey去区分刷新或者不刷新数据，
参考views/components/load-more的处理（通过load-more.js mixin扩展，需要详细阅读这个文件）。

针对非列表的直接不需要判断条件，参考views/index的处理






















