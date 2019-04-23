<!--
	平台介绍
-->
<template>
	<bv-home-view :router-level="3">
		<bv-header :header="{title:{value:'平台介绍'}}"></bv-header>

		<div class="bc-row">
			<div class="bc-pd-15rp">
				<div class="bc-row">
					<img :src="`${staticPath}/1.png`" class="bc-w-100">
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
export default {
  name: "introduction",
	computed:{
    staticPath(){
      return `${this.config.path.static}/img/member/tools/introduction`;
    }
	}
}
</script>

<style scoped lang="scss">

</style>