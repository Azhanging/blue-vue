<template>
  <BvView :has-nav="view.tabBar" :router-level="routerLevel">

    <slot/>
    <template slot="suspend" slot-scope="scope">
      <BvSuspend :scrollDistance="scope.scroll.top" :backElement="$parent.$el && $parent.$el.children[0]">
        <template slot="back-to-top">
          <i class="bv-icon bv-icon-go-top bc-f-30 bc-t-666"></i>
        </template>
      </BvSuspend>
    </template>

    <template slot="other">
      <slot name="other"></slot>
    </template>

  </BvView>
</template>

<script>

  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "bv-home-view",
    computed: {
      ...mapState(['view'])
    },
    provide() {
      return {
        routerLevel: this.routerLevel,
        hasSuspend: this.hasSuspend
      };
    },
    props: {
      //路由层级，用于多个position fixed的时候使用
      routerLevel: {
        default: 1,
        type: Number
      },
      //是否有浮动的层级
      hasSuspend: {
        default: true,
        type: Boolean
      }
    }
  }
</script>