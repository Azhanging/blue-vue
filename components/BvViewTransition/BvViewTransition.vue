<template>
  <BvTransition :transition-name="transition">
    <slot/>
  </BvTransition>
</template>

<script>
  export default {
    name: "BvViewTransition",
    props: ['transitionName'],
    data() {
      return {
        transition: 'right'
      }
    },
    watch: {
      ['$route'](to, from) {
        if (this.transitionName) {
          this.transition = this.transitionName;
        } else {
          const toDepth = to.path.split('/').length;
          const fromDepth = from.path.split('/').length;
          this.transition = toDepth < fromDepth ? 'left' : 'right';
        }
      }
    }
  }
</script>
