<!-- 主页的导航 -->
<template>
  <BvTabBar v-if="list" :list="list" :active-class-name="'ba-t-base'" :active-index="activeIndex"/>
</template>

<script>

  import store from '@store';
  import { matchRouter } from '$components/BvTabBar';
  import homeTabBar from './home-tab-bar';

  export default {
    name: "WTabBar",
    data() {
      return {
        activeIndex: -1,
        allTabBar: {
          'home': homeTabBar
        }
      }
    },
    computed: {
      tabBarName() {
        return store.state.view.tabBar.name;
      },
      list() {
        const currentNav = this.allTabBar[this.tabBarName];
        return currentNav && currentNav.list.items;
      }
    },
    watch: {
      ['$route']() {
        this.activeTabBar();
      }
    },
    methods: {
      activeTabBar() {
        //匹配到对应导航配置
        const nav = this.allTabBar[this.tabBarName];
        if (nav) {
          nav.active.call(this);
        } else if (this.tabBarName !== false) {
          //没有配置到导航配置，直接设置为没有导航
          store.commit('SET_TAB_BAR', {
            name: false
          });
        }
      }
    },
    mounted() {
      this.activeTabBar();
    }
  }
</script>