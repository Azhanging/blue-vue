<template>
	<BvLayoutView>
		<BvHeader :center-control="{
  		title:`组价列表`
		}"/>
		<div class="bc-row">
			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/vue-awesome-swiper" class="bc-t-base">vue-awesome-swiper</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/vue-upload-component" class="bc-t-base">vue-upload-component</router-link>
			</div>

			<div v-for="i in 10" class="bc-pd-20"></div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/load-more/1" class="bc-t-base">load-more-1</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/load-more/2" class="bc-t-base">load-more-2</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/load-more/1" class="bc-t-base">component-load-more-1</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/components/load-more/2" class="bc-t-base">component-load-more-2</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/scroll/1" class="bc-t-base">scroll-1</router-link>
			</div>

			<div class="bc-row bc-pd-10 bc-t-c">
				<router-link to="/scroll/2" class="bc-t-base">scroll-2</router-link>
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
	</BvLayoutView>
</template>

<script>
  export default {
    name: "components"
  }
</script>