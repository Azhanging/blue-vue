<template>
	<div class="row">

		<div class="row pd-10 t-c">
			<nuxt-link to="/components/vue-awesome-swiper/vue-awesome-swiper">vue-awesome-swiper</nuxt-link>
		</div>

		<div class="row pd-10 t-c">
			<nuxt-link to="/components/vue-upload-component/vue-upload-component">vue-upload-component</nuxt-link>
		</div>

		<div class="row pd-10 t-c">
			<nuxt-link to="/components/mint-ui/mint-ui">mint-ui</nuxt-link>
		</div>

		<div class="row pd-10 t-c">
			<nuxt-link to="/components/validate/validate">blue-validate</nuxt-link>
		</div>

		<div class="row pd-10 t-c">
			<nuxt-link to="/components/picker/picker">picker</nuxt-link>
		</div>

		<div class="row pd-10 t-c">
			<nuxt-link to="/components/page-list/page-list">page-list</nuxt-link>
		</div>

		<m-transition>
			<nuxt-child class="children-page"/>
		</m-transition>

	</div>
</template>

<script>

  export default {
    name: "components"
  }
</script>
