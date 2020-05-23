<template>
  <BvView :has-nav="false">
    <div class="bz-t-base bz-t-c bz-pd-tb-50rpx">
      <div style="font-size: 10rem;">
        404
      </div>
      <div>
        找不到页面
      </div>
      <div class="bz-pd-tb-15rpx">
        <a href="javascript:;" @click="$router.$routerTo(config.path.base)" class=" bz-t-base">
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