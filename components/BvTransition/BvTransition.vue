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
        default: 'right',
        type: String
      }
    }
  }
</script>

<style lang="scss">
  .opacity-enter-active,
  .opacity-leave-active,
  .left-enter-active,
  .left-leave-active,
  .top-enter-active,
  .top-leave-active,
  .right-enter-active,
  .right-leave-active {
    transition: all .4s;
  }

  .opacity-enter,
  .opacity-leave-active,
  .left-enter,
  .left-leave-active,
  .top-enter,
  .top-leave-active,
  .right-enter,
  .right-leave-active {
    opacity: 0;
    pointer-events: none;
  }

  .opacity-enter {
    opacity: .1;
  }

  .opacity-leave-active {
    opacity: 0;
  }

  .top-enter {
    transform: translateY(100px);
  }

  .top-leave-active {
    transform: translateY(-100px);
  }

  .left-enter {
    transform: translateX(-100px);
  }

  .left-leave-active {
    transform: translateX(100px);
  }

  .right-enter {
    transform: translateX(100px);
  }

  .right-leave-active {
    transform: translateX(-100px);
  }
</style>
