<!-- 每个页面的主视图组件 必须使用 -->
<template>
  <div class="bv-view" :class="{'no-tab-bar':!view.tabBar}">
    <slot/>
    <!-- 公共的view层子路由 -->
    <router-view/>
  </div>
</template>

<script>
  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "bv-view",
    computed: {
      ...mapState(['view'])
    }
  }
</script>

<style scoped lang="scss">
  .bv-view {
    position: relative;
    padding-bottom: 47px;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 47px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 47px);
    background-color: rgba(255, 255, 255, 1);

    &.no-tab-bar {
      padding-bottom: 0;
    }
  }
</style>