<template>
  <BvView :has-nav="view.tabBar">
    <slot/>
  </BvView>
</template>

<script>

  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "BvLayoutView",
    computed: {
      ...mapState(['view'])
    },
    provide() {
      return {
        hasSuspend: this.hasSuspend
      };
    },
    props: {
      //是否有浮动的层级
      hasSuspend: {
        default: true,
        type: Boolean
      }
    }
  }
</script>