<!-- 浮层组件 -->
<template>
  <div class="suspend">
    <!-- 回到顶部 -->
    <div class="back-to-top" v-show="backToTopShow">
      <a href="javascript:;" @click="backToTop">
        <img src="//www.dtb315.com/Static/wap/home/images/scrollTop.png?v=13mqr11?v=0" width="30" height="30">
      </a>
    </div>
  </div>
</template>

<script>

  import Velocity from 'velocity-animate';

  export default {
    name: "bv-suspend",
    props: {
      //对应的m-view中的element
      backElement: {
        type: Element
      },
      //显示距离
      distance: {
        type: Number,
        default: 100
      },
      //当前的scroll距离
      scrollDistance: {
        type: Number,
        default: 0
      }
    },
    computed: {
      backToTopShow() {
        return this.scrollDistance > this.distance;
      }
    },
    methods: {
      backToTop() {
        if (!this.backElement) return;
        Velocity(this.backElement, "scroll", {
          container: this.backElement,
          duration: 180,
          MobileHA: true,
          offset: -this.backElement.scrollTop
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  .suspend {
    position: fixed;
    z-index: 1;
    right: 10px;
    bottom: 60px;
    bottom: calc(constant(safe-area-inset-bottom) + 60px);
    bottom: calc(env(safe-area-inset-bottom) + 60px);
  }

</style>