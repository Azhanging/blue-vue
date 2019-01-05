<!-- 主页的导航 -->
<template>
	<m-nav :nav="nav" :active-class-name="'bc-t-danger'" :active-index="activeIndex"></m-nav>
</template>

<script>
export default {
  name: "m-nav-home",
  data() {
    return {
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
      }]
    }
  },
  computed: {
    activeIndex() {
      const path = this.$router.currentRoute.fullPath;
      if (/^\/component.*/.test(path)) {
        return 1;
      } else {
        return 0;
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>