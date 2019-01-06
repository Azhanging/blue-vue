<!-- 主页的导航 -->
<template>
  <m-nav v-if="nav" :nav="nav" :active-class-name="'bc-t-danger'" :active-index="activeIndex"></m-nav>
</template>

<script>

  import store from '@store';

  export default {
    name: "m-home-nav",
    data() {
      return {
        activeIndex: -1,
        allNav: {
          'home': {
            nav: [{
              content: '首页',
              icon: 'https://pc.dtb315.com/Static/wap/home/images/bottom_btn/home.png',
              activeIcon: 'https://pc.dtb315.com/Static/wap/home/images/bottom_btn/home-active.png',
              to: '/'
            }, {
              content: '组件',
              icon: 'https://pc.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',
              activeIcon: 'https://pc.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
              to: '/components'
            }],
            active() {
              const currentRouter = this.$router.currentRoute;
              const path = currentRouter.fullPath;
              if (/^\/component.*/.test(path)) {
                this.activeIndex = 1;
              } else {
                this.activeIndex = 0;
              }
            }
          },
          'components': {
            nav: [{
              content: '组件',
              icon: 'https://pc.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',
              activeIcon: 'https://pc.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
              to: '/components'
            }, {
              content: 'scroll',
              to: '/components/scroll'
            }],
            active(){
              const currentRouter = this.$router.currentRoute;
              const path = currentRouter.fullPath;
              if (/^\/components\/scroll/.test(path)) {
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
      navName() {
        return store.state.view.navigator;
      },
      nav() {
        const currentNav = this.allNav[this.navName];
        return currentNav && currentNav.nav;
      }
    },
    watch: {
      ['$route']() {
        this.activeNav();
      }
    },
    methods: {
      activeNav() {
        if (this.navName) {
          this.allNav[this.navName].active.call(this);
        }
      }
    },
    mounted() {
      this.activeNav();
    }
  }
</script>

<style scoped lang="scss">

</style>