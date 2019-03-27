<!-- 主页的导航 -->
<template>
	<bv-tab-bar v-if="list" :list="list" :active-class-name="'bc-t-base'" :active-index="activeIndex"></bv-tab-bar>
</template>

<script>

  import store from '@store';

  import config from '@config';
  import router from "@router";

  import { activeNav } from '@assets/js/activePath';

  const staticPath = config.path.static;

  export default {
    name: "w-tab-bar",
    data() {
      return {
        activeIndex: -1,
        allTabBar: {
          'home': {
            list: [{
              content: '生命驾校',
              icon: `${staticPath}/img/public/home1.png`,
              activeIcon: `${staticPath}/img/public/home2.png`,
              to: '/'
            }, {
              content: '商城',
              icon: `${staticPath}/img/public/shangchen1.png`,
              activeIcon: `${staticPath}/img/public/shangchen2.png`,
              to() {
                location.href = `${config.path.base}/home/index/index`;
              }
            }, {
              content: '驾校中心',
              icon: `${staticPath}/img/public/fenlei1.png`,
              activeIcon: `${staticPath}/img/public/fenlei2.png`,
              to: '/'
            }, {
              content: '发现',
              icon: `${staticPath}/img/public/faxian1.png`,
              activeIcon: `${staticPath}/img/public/faxian2.png`,
              to: '/'
            }, {
              content: '我的',
              icon: `${staticPath}/img/public/my1.png`,
              activeIcon: `${staticPath}/img/public/my2.png`,
              to: '/'
            }],
            active() {
              const path = router.currentRoute.fullPath;
              this.activeIndex = activeNav(path)
            }
          }
        }
      }
    },
    computed: {
      tabBarName() {
        return store.state.view.tabBar;
      },
      list() {
        const currentNav = this.allTabBar[this.tabBarName];
        return currentNav && currentNav.list;
      }
    },
    watch: {
      ['$route']() {
        this.activeNav();
      }
    },
    methods: {
      activeNav() {
        //匹配到对应导航配置
        const nav = this.allTabBar[this.tabBarName];
        if (nav) {
          nav.active.call(this);
        } else if (this.tabBarName !== false) {
          //没有配置到导航配置，直接设置为没有导航
          store.commit('setTabBar', false);
        }
      }
    },
    mounted() {
      this.activeNav();
    }
  }
</script>