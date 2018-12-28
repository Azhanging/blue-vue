<template>
	<div
		:infinite-scroll-distance="distance"
		infinite-scroll-disabled="load.state.disable"
		infinite-scroll-immediate-check="immediateCheck"
		v-infinite-scroll="loadEvent"
	>
		<!-- load down slot -->
		<slot name="load-up" :load="load"></slot>

		<!--main slot-->
		<slot></slot>

		<!-- load down slot -->
		<slot name="load-down" :load="load"></slot>

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
        type: [String, Boolean],
        default: 'load.state.disable'
      },
      immediateCheck: {
        type: [String, Boolean],
        default: true
      },
      api: {
        type: [Function, Boolean],
        default: false
      }
    },
    data() {
      return {
        load: {
          state: {
            disable: false,
            hasMoreData: true
          }
        }
      }
    },
    methods: {
      loadEvent() {
        const api = this.api;
        const load = this.load;
        const state = load.state;
        if (!api) {
          state.disable = true;
          return;
        }
        state.disable = true;
        try {
          api().then((res = {}) => {
            this.$nextTick(() => {
              this.load.state.disable = res.disabled || false;
            });
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
</script>

<style scoped lang="scss">

</style>