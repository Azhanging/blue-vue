<template>
	<div>
		<div class="pd-10">
			<router-link to="/components/mint-ui/scroll/scroll">
				scroll
			</router-link>
		</div>

		<m-transition>
			<nuxt-child class="children-page"/>
		</m-transition>

	</div>
</template>

<script>

  export default {
    name: "mint-ui",
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        if (vm.programConfig.env.isWeChat) {
          vm.$wxShare({
            title: "mint page",
            desp: "mint page"
          });
        }
      });
    }
  }
</script>

<style scoped lang="scss">

</style>
