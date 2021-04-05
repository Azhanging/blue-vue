<template>
  <BvView :has-nav="false">
    <div class="ba-t-base ba-t-c ba-pd-tb-50rpx">
      <div style="font-size: 10rem;">
        404
      </div>
      <div>
        找不到页面
      </div>
      <div class="ba-pd-tb-15rpx">
        <a href="javascript:;" @click="$router.$routerTo(config.path.base)" class=" ba-t-base">
          回到首页 >>
        </a>
      </div>
    </div>
  </BvView>
</template>

<script>
  export default {
    name: "error-page-404"
  }
</script>

<style scoped lang="scss">
  .icon-404 {
    width: rem(160);
  }
</style>