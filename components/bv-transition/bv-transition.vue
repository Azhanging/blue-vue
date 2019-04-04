<template>
  <transition :name="transitionName" mode="in-out">
    <slot/>
  </transition>
</template>

<script>
  export default {
    name: "bv-transition",
    props: {
      transitionName: {
        default: 'slide-right',
        type: String
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
    pointer-events: none;
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
