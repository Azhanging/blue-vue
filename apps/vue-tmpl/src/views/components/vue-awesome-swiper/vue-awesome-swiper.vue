<template>
	<div class="children-page">
		<m-scroll>
			<swiper :options="swiperOption" ref="swiper">
				<swiper-slide v-for="(slide, index) in banners" :key="index">
					<div style="height:100px;">{{ slide }}</div>
				</swiper-slide>
				<div class="swiper-pagination" id="pagination" slot="pagination"></div>
			</swiper>
		</m-scroll>
	</div>
</template>

<script>
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