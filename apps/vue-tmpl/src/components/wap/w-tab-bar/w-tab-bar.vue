<!-- 主页的导航 -->
<template>
	<bv-tab-bar v-if="list" :list="list" :active-class-name="'bc-t-danger'" :active-index="activeIndex"/>
</template>

<script>

  import store from '@store';
  import { matchRouter } from '$components/bv-tab-bar';
  import homeTabBar from './home-tab-bar';
  import componentTabBar from './component-tab-bar';

  export default {
    name: "w-tab-bar",
    data() {
      return {
        activeIndex: -1,
        allTabBar: {
          'home': homeTabBar,
          'components': componentTabBar
        }
      }
    },
    computed: {
      tabBarName() {
        return store.state.view.tabBar;
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
          store.commit('setTabBar', false);
        }
      }
    },
    mounted() {
      this.activeTabBar();
    }
  }
</script>