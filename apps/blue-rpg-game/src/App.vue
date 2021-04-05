<template>
  <div id="app" class="ba-t-666 ba-f-28rpx">
    <keep-alive :exclude="config.view.keepAlive.exclude">
      <router-view/>
    </keep-alive>

    <!-- 浮动状态 -->
    <BvSuspend :scrollDistance="view.suspend.distance" :show="view.suspend.status">
      <i class="bp-icon bp-icon-go-top ba-f-20 ba-t-666" slot="backToTop"></i>
    </BvSuspend>

    <!-- 底部导航 -->
    <WTabBar/>

    <!-- 图片预览的组件 -->
    <BvPhotoSwipe/>

  </div>
</template>

<script>
  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: 'app',
    computed: {
      ...mapState(['view'])
    }
  };
</script>

<style lang="scss">
  @import url(//at.alicdn.com/t/font_1270732_8tdxo0ksvkf.css);
</style>
