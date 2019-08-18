<!-- 加载更多的组件 -->
<template>
	<div
		:infinite-scroll-distance="distance"
		infinite-scroll-disabled="disabled"
		infinite-scroll-immediate-check="immediateCheck"
		v-infinite-scroll="loadEvent"
	>
		<!-- load down slot -->
		<slot name="load-up"></slot>

		<!--main slot-->
		<slot></slot>

		<!-- load down slot -->
		<slot name="load-down"></slot>

	</div>
</template>

<script>

  export default {
    name: "infinite-scroll",
    props: {
      distance: {
        type: [Number, String],
        default: 30
      },
      disabled: {
        type: Boolean,
        default: false
      },
      immediateCheck: {
        type: [String, Boolean],
        default: true   //会立即执行一次loadEvent
      },
      api: {
        type: [Function, Boolean],
        default: false
      }
    },
    methods: {
      loadEvent() {
        const api = this.api;
        if (!api) return;
        try {
          api();
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>
