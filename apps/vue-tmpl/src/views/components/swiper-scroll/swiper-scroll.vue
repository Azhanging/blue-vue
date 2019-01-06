<template>
	<m-home-view>
		<m-header :title="'滑动组件'"></m-header>
		<m-swiper-scroll @scroll-left="scrollLeft" :active-class-name="'bc-t-success'" :current-index="scrollIndex">
			<template slot="items">
				<a href="javascript:;" v-for="i in 30"
				   class="bc-pd-10 bc-inline-block bc-t-base"
				   @click="activeIndex(i-1)"
				>
					选项{{i}}
				</a>
			</template>
		</m-swiper-scroll>
	</m-home-view>
</template>

<script>
	export default {
    name: "scroll",
    data() {
      return {
        scrollIndex: 0
      }
    },
    methods: {
      activeIndex(i) {
        this.scrollIndex = i;
      },
      scrollLeft(state) {
        console.log(state);
      }
    }
  }
</script>

<style scoped lang="scss">

</style>