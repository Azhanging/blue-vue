<!--
	会议支持
-->
<template>
	<bv-home-view :router-level="3" style="background-color: #f4f4f4;">
		<bv-header :header="{title:{value:'会议支持'}}"></bv-header>

		<div class="bc-row">
			<div class="bc-row"  v-blue-photoswipe="{itemTagName:'DIV'}">
				<div class="bc-row" v-for="i in 8" :class="[ i < 6 ? 'bc-pd-tb-15rp bc-pd-lr-39rp' : 'bc-pd-tb-15rp']">
					<img :src="`${staticPath}/${i+1}.png`" class="bc-w-100" data-size="0x0" :msrc="`${staticPath}/${i+1}.png`">
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
export default {
  name: "meeting",
  computed:{
    staticPath(){
      return `${this.$config.path.static}/img/member/tools/meeting`;
    }
  }
}
</script>

<style scoped lang="scss">

</style>