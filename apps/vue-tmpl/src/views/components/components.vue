<template>
	<div class="row">

		<div class="row pd-10">
			<router-link to="/components/vue-pull-to">vue-pull-to</router-link>
		</div>

		<div class="row pd-10">
			<router-link to="/components/vue-awesome-swiper">vue-awesome-swiper</router-link>
		</div>

		<div class="row pd-10">
			<router-link to="/components/vue-upload-component">vue-upload-component</router-link>
		</div>

		<div class="row pd-10">
			<router-link to="/components/mint-ui">mint-ui</router-link>
		</div>

		<div class="row pd-10">
			<router-link to="/components/blue-validate">blue-validate</router-link>
		</div>

		<m-transition>
			<router-view class="children-page"/>
		</m-transition>

	</div>
</template>

<script>

  export default {
    name: "components"
  }
</script>

<style scoped lang="scss">

</style>