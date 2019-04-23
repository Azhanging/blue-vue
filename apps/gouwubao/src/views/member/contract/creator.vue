<template>
	<bv-home-view :router-level="3">
		<bv-header :header="{title:{value:'创客智能合约'}}"></bv-header>
		<div class="bc-row">
			<div class="bc-pd-15rp">
				<div class="bc-row">
					<img :src="`${staticPath}/creator.png`" class="bc-w-100">
				</div>
			</div>
		</div>
	</bv-home-view>
</template>

<script>
export default {
  name: "contract-creator",
  computed:{
    staticPath(){
      return `${this.config.path.static}/img/member/contract/creator`;
    }
  }
}
</script>