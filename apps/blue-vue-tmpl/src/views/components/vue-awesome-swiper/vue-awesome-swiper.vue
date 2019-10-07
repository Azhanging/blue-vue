<template>
  <bv-home-view :router-level="2">
    <BvHeader :center-control="{
	  	title:`轮播组件`
		}"/>
    <BvScroll>
      <swiper :options="swiperOption" ref="swiper">
        <swiper-slide v-for="(slide, index) in banners" :key="index">
          <div style="height:100px;">{{ slide }}</div>
        </swiper-slide>
        <div class="swiper-pagination" id="pagination" slot="pagination"></div>
      </swiper>
    </BvScroll>
  </bv-home-view>
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
    methods: {
      swiperUpdate() {
        this.swiper.update();
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.swiper = this.$refs['swiper'];
        this.swiperUpdate();
      });
    }
  }
</script>