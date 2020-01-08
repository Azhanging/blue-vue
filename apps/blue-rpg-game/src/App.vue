<template>
  <div id="app" class="bc-t-333 bc-f-14rpx">

    <BvViewTransition>
      <keep-alive :exclude="config.app.keepAlive.exclude">
        <router-view/>
      </keep-alive>
    </BvViewTransition>

    <!-- 底部导航 -->
    <WTabBar></WTabBar>

    <!-- 图片预览的组件 -->
    <BluePhotoSwipe/>

  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="scss">
  @import url(//at.alicdn.com/t/font_1270732_8tdxo0ksvkf.css);
  a {
    color: #333;
  }
</style>
