<!--
	每日必做
-->
<template>
	<bv-home-view :router-level="3">
		<bv-header :header="{title:{value:'每日必做'}}"></bv-header>

		<div class="bc-row">
			<div class="bc-pd-15rp"  v-blue-photoswipe="{itemTagName:'DIV'}">
				<div class="bc-row">
					<img :src="`${staticPath}/1.png`" class="bc-w-100" data-size="0x0" :msrc="`${staticPath}/1.png`">
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
export default {
  name: "doing-every-day",
	computed:{
    staticPath(){
      return `${this.$config.path.static}/img/member/tools/doing-every-day`;
    }
	}
}
</script>

<style scoped lang="scss">

</style>