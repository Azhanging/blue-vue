<!-- 浮层组件 -->
<template>
  <div class="suspend">
    <!-- 回到顶部 -->
    <BvTransition transition-name="top">
      <div class="back-to-top" v-show="show && backToTopShow">
        <a href="javascript:;" @click="backToTop">
          <slot name="backToTop"/>
        </a>
      </div>
    </BvTransition>
  </div>
</template>

<script>

  import Velocity from 'velocity-animate';

  export default {
    name: "BvSuspend",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      scrollDistance: {
        type: Number,
        default: 0
      },
      //显示距离
      distance: {
        type: Number,
        default: 100
      }
    },
    computed: {
      backToTopShow() {
        if (this.show === false) return false;
        return this.scrollDistance > this.distance;
      }
    },
    methods: {
      backToTop() {
        Velocity(document.documentElement, "scroll", {
          container: document.documentElement,
          duration: 180,
          MobileHA: true,
          offset: -document.documentElement.scrollTop
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