<template>
	<div class="children-page">
		<pull-to>
			<swiper :options="swiperOption" ref="swiper">
				<swiper-slide v-for="(slide, index) in banners" :key="index">
					<div style="height:100px;">{{ slide }}</div>
				</swiper-slide>
				<div class="swiper-pagination" id="pagination" slot="pagination"></div>
			</swiper>
		</pull-to>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import PullTo from 'vue-pull-to';

  export default {
    name: "vue-awesome-swiper",
    data() {
      return {
        banners: [1, 2, 3, 4],
        swiperOption: {
          pagination: {
            el: "#pagination"
          },
          loop: true
        },
        swiper: {}
      }
    },
    components: {
      swiper,
      swiperSlide,
      PullTo
    },
	  methods:{
      swiperUpdate(){
        this.swiper.update();
      }
	  },
    mounted() {
      this.$axios.get('http://localhost:8080/#/').then((res)=>{
        console.log(res);
      });
      this.$nextTick(() => {
        this.swiper = this.$refs['swiper'];
        this.swiperUpdate();
      });
    }
  }
</script>

<style scoped lang="scss">

</style>