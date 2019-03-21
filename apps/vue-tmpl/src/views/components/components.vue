<template>
	<bv-home-view>
		<bv-header :title="'组件列表'"></bv-header>
		<div class="bc-row">
			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/vue-awesome-swiper" class="bc-t-base">vue-awesome-swiper</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/vue-upload-component" class="bc-t-base">vue-upload-component</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/scroll" class="bc-t-base">scroll</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/blue-validate" class="bc-t-base">blue-validate</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/picker" class="bc-t-base">picker</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/page-list" class="bc-t-base">page-list</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/swiper-scroll" class="bc-t-base">swiper-scroll</router-link>
			</div>

		</div>
	</bv-home-view>
</template>

<script>
  export default {
    name: "components",
    mounted() {
      this.$axios.get('/api/test/index').then((result) => result);
    }
  }
</script>