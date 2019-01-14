<template>
  <transition :name="transitionName" mode="out-in">
    <slot></slot>
  </transition>
</template>

<script>
  export default {
    name: "m-transition",
    props: ['transition'],
    data() {
      return {
        transitionName: 'slide-right'
      }
    },
    watch: {
      '$route'(to, from) {
        if (this.transition) {
          this.transitionName = this.transition;
        } else {
          const toDepth = to.path.split('/').length;
          const fromDepth = from.path.split('/').length;
          this.transitionName = toDepth < fromDepth ? 'slide-left' : 'slide-right';
        }
      }
    }
  }
</script>

<style lang="scss">
  .slide-left-enter-active,
  .slide-left-leave-active,
  .slide-top-enter-active,
  .slide-top-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: all .4s;
  }

  .slide-left-enter,
  .slide-left-leave-active,
  .slide-top-enter,
  .slide-top-leave-active,
  .slide-right-enter,
  .slide-right-leave-active {
    opacity: 0;
  }

  .slide-top-enter {
    transform: translateY(100px);
  }

  .slide-top-leave-active {
    transform: translateY(100px);
  }

  .slide-left-enter {
    transform: translateX(-100px);
  }

  .slide-left-leave-active {
    transform: translateX(100px);
  }

  .slide-right-enter {
    transform: translateX(100px);
  }

  .slide-right-leave-active {
    transform: translateX(-100px);
  }
</style>
