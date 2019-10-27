<template>
  <div id="app" class="bc-t-666 bc-f-14rp">

    <BvViewTransition>
      <keep-alive :exclude="config.view.keepAlive.exclude">
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
</style>
