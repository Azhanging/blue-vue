<template>
	<BvView>
		<BvHeader :center-control="{
  		title:`组价列表`
		}"/>
		<div class="ba-row">

			<div v-for="i in 30" class="ba-pd-20"></div>

			<div class="ba-row ba-pd-10 ba-t-c">
				<router-link to="/components/scroll/1" class="ba-t-base">scroll-1</router-link>
			</div>

			<div class="ba-row ba-pd-10 ba-t-c">
				<router-link to="/components/scroll/2" class="ba-t-base">scroll-2</router-link>
			</div>

			<div class="ba-row ba-pd-10 ba-t-c">
				<router-link to="/components/blue-validate" class="ba-t-base">blue-validate</router-link>
			</div>

			<div class="ba-row ba-pd-10 ba-t-c">
				<router-link to="/components/picker" class="ba-t-base">picker</router-link>
			</div>

			<div class="ba-row ba-pd-10 ba-t-c">
				<router-link to="/components/swiper-scroll" class="ba-t-base">swiper-scroll</router-link>
			</div>

		</div>
	</BvView>
</template>

<script>
  export default {
    name: "components"
  }
</script>