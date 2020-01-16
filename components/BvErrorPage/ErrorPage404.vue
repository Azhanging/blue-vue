<template>
	<BvView style="background-color: #f4f4f4;" :has-nav="false">
		<div class="bz-t-c">
			<div class="bz-pd-tb-30rpx">
				<img :src="`${config.path.static}/img/public/error-page/404.png`" alt="" class="icon-404">
			</div>
			<div class="bz-t-c bz-t-base">
				页面找不到了哦~
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