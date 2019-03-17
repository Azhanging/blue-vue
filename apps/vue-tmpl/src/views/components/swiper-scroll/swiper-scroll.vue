<template>
	<bv-home-view :router-level="2">
		<bv-header :title="'滑动组件'"></bv-header>

		<!-- x-滑动 -->
		<bv-swiper-scroll :active-class-name="'bc-t-success'" :current-index="scrollIndex">
			<template slot="scroll-items">
				<a href="javascript:;" v-for="i in 15"
				   class="bc-pd-10 bc-inline-block bc-t-base"
				   @click="activeIndex(i-1)"
				>
					选项{{i}}
				</a>
			</template>
		</bv-swiper-scroll>

		<!-- y-滑动 -->
		<bv-swiper-scroll style="height:100px;" @scrolled="scrolled" :active-class-name="'bc-t-success'" :current-index="scrollIndex" direction="y">
			<template slot="scroll-items">
				<a href="javascript:;" v-for="i in 15"
				   class="bc-pd-10 bc-block bc-t-base"
				   @click="activeIndex(i-1)"
				>
					选项{{i}}
				</a>
			</template>
		</bv-swiper-scroll>

	</bv-home-view>
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
      scrolled(state) {
        console.log(state);
      },
	    auto(){
        setTimeout(() => {
          if(this.scrollIndex == 14){
            this.scrollIndex = 0;
          } else {
            ++this.scrollIndex;
          }
          this.auto();
        }, 1000);
	    }
    },
    mounted() {
      this.auto();
    }
  }
</script>

<style scoped lang="scss">

</style>