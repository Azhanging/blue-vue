<template>
  <div id="app" class="bc-t-666 bc-f-14rpx">

    <BvViewTransition>
      <keep-alive :exclude="config.view.keepAlive.exclude">
        <router-view/>
      </keep-alive>
    </BvViewTransition>

    <!-- 浮动状态 -->
    <BvSuspend :scrollDistance="view.scroll.distance" v-if="view.scroll.status">
      <i class="bp-icon bp-icon-go-top bc-f-20 bc-t-666" slot="backToTop"></i>
    </BvSuspend>

    <!-- 底部导航 -->
    <WTabBar/>

    <!-- 图片预览的组件 -->
    <BluePhotoSwipe/>

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
