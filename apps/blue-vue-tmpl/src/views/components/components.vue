<template>
	<BvView>
		<BvHeader :center-control="{
  		title:`组价列表`
		}"/>
		<div class="bz-row">
			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/vue-awesome-swiper" class="bz-t-base">vue-awesome-swiper</router-link>
			</div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/vue-upload-component" class="bz-t-base">vue-upload-component</router-link>
			</div>

			<div v-for="i in 10" class="bz-pd-20"></div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/scroll/1" class="bz-t-base">scroll-1</router-link>
			</div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/scroll/2" class="bz-t-base">scroll-2</router-link>
			</div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/blue-validate" class="bz-t-base">blue-validate</router-link>
			</div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/picker" class="bz-t-base">picker</router-link>
			</div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/page-list" class="bz-t-base">page-list</router-link>
			</div>

			<div class="bz-row bz-pd-10 bz-t-c">
				<router-link to="/components/swiper-scroll" class="bz-t-base">swiper-scroll</router-link>
			</div>

		</div>
	</BvView>
</template>

<script>
  export default {
    name: "components"
  }
</script>