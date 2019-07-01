<template>
  <bv-view :router-level="routerLevel">

    <template slot="default" slot-scope="scope">
      <slot :scroll="scope.scroll"></slot>
    </template>

    <template slot="suspend" slot-scope="scope">
      <bv-suspend :scrollDistance="scope.scroll.top" :backElement="$parent.$el && $parent.$el.children[0]">
        <template slot="back-to-top">
          <img :src="`${config.path.static}/img/home/scrollTop.png`" width="30" height="30">
        </template>
      </bv-suspend>
    </template>

    <template slot="other">
      <slot name="other"></slot>
    </template>

    <template slot="footer">
      <slot name="footer"></slot>
    </template>

  </bv-view>
</template>

<script>
  export default {
    name: "bv-home-view",
    provide() {
      return {
        routerLevel: this.routerLevel,
        hasSuspend: this.hasSuspend,
        keepAliveExclude: this.keepAliveExclude
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
      },
      keepAliveExclude: {
        default: () => [],
        type: [Array, String, RegExp]
      }
    }
  }
</script>