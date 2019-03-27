<!-- 主页的导航 -->
<template>
	<bv-tab-bar v-if="list" :list="list" :active-class-name="'bc-t-danger'" :active-index="activeIndex"></bv-tab-bar>
</template>

<script>

  import store from '@store';

  import { matchRouter } from '$components/bv-tab-bar';

  export default {
    name: "w-tab-bar",
    data() {
      return {
        activeIndex: -1,
        allTabBar: {
          'home': {
            list: [{
              content: '首页',
              icon: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/home.png',
              activeIcon: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/home-active.png',
              to: '/'
            }, {
              content: '组件',
              icon: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',
              activeIcon: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
              to: '/components'
            }],
            active() {
              const currentRouter = this.$router.currentRoute;
              const path = currentRouter.fullPath;
              if (matchRouter([
                  /^\/component.*/,    //组件路由
                ], path)) {
                this.activeIndex = 1;
              } else {
                this.activeIndex = 0;
              }
            }
          },
          'components': {
            list: [{
              content: '组件',
              icon: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',
              activeIcon: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
              to: '/components'
            }, {
              content: 'scroll',
              to: '/components/scroll'
            }],
            active() {
              const currentRouter = this.$router.currentRoute;
              const path = currentRouter.fullPath;
              if (matchRouter([
                  /^\/components\/scroll/,    //组件滑动路由
                ], path)) {
                this.activeIndex = 1;
              } else {
                this.activeIndex = 0;
              }
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