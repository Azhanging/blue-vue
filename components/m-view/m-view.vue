<!-- 每个页面的主视图组件 必须使用 -->
<template>
	<div class="m-view" :class="{'no-nav-view':!hasNav}" :style="`z-index:${100 * routerLevel};`">

		<!-- scroll 层 -->
		<div class="m-view-scroll">
			<slot></slot>
		</div>

		<!-- 浮层 -->
		<slot name="suspend" :scroll="scroll"></slot>

	</div>
</template>

<script>

  import { setViewEvent } from './index';
  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "m-view",
    props: {
      routerLevel: {
        default: 1,
        type: Number
      },
      hasNav: {
        default: true,
        type: Boolean
      }
    },
    computed: {
      ...mapState(['view'])
    },
    data() {
      return {
        scroll: {
          top: 0
        }
      }
    },
    mounted() {
      setViewEvent.call(this);
    }
  }
</script>

<style scoped lang="scss">

	.m-view {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 48px;
		left: 0;
		z-index: 100;
		background-color: white;
		&.no-nav-view {
			bottom: 0;
		}
	}

	.m-view-scroll {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

</style>