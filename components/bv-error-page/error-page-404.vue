<template>
	<bv-view style="background-color: #f4f4f4;" :has-nav="false">
		<div class="bc-t-c">
			<div class="bc-pd-tb-30rp">
				<img :src="`${config.path.static}/img/public/error-page/404.png`" alt="" class="icon-404">
			</div>
			<div class="bc-t-c bc-t-base">
				页面找不到了哦~
			</div>
			<div class="bc-pd-tb-15rp">
				<a href="javascript:;" @click="$router.routerTo(config.path.base)" class=" bc-t-base">
					回到首页 >>
				</a>
			</div>
		</div>
	</bv-view>
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