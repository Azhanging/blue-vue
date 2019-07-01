<!-- 浮层组件 -->
<template>
  <div class="suspend">
    <!-- 回到顶部 -->
    <bv-transition transition-name="top">
      <div class="back-to-top" v-show="backToTopShow">
        <a href="javascript:;" @click="backToTop">
          <slot name="back-to-top"></slot>
        </a>
      </div>
    </bv-transition>
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