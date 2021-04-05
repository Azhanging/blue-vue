<template>
  <BvView>
    <BvHeader :center-control="{
      title:`滑动组件`
    }"/>
    <!-- x-滑动 -->
    <BvSwiperScroll :active-class-name="'ba-t-success'" :current-index="scrollIndex">
      <template slot="scroll-items">
        <a href="javascript:;" v-for="i in 15"
           class="ba-pd-10 ba-inline-block ba-t-base"
           @click="activeIndex(i-1)"
        >
          选项{{i}}
        </a>
      </template>
    </BvSwiperScroll>

    <!-- y-滑动 -->
    <BvSwiperScroll style="height:100px;" @scrolled="scrolled" :active-class-name="'ba-t-success'"
                    :current-index="scrollIndex" direction="y">
      <template slot="scroll-items">
        <a href="javascript:;" v-for="i in 15"
           class="ba-pd-10 ba-block ba-t-base"
           @click="activeIndex(i-1)"
        >
          选项{{i}}
        </a>
      </template>
    </BvSwiperScroll>

  </BvView>
</template>

<script>
  let timer;
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
      auto() {
        timer = setTimeout(() => {
          if (this.scrollIndex == 14) {
            this.scrollIndex = 0;
          } else {
            ++this.scrollIndex;
          }
          return this.auto();
        }, 1000);
      }
    },
    activated() {
      this.auto();
    },
    beforeRouteLeave(to, from, next) {
      clearTimeout(timer);
      next();
    }
  }
</script>