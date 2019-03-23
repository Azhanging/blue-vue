<!-- 每个页面的主视图组件 必须使用 -->
<template>
	<div class="bv-view" :class="{'no-nav-view':!hasNav}" :style="`z-index:${100 * routerLevel};`">

		<!-- scroll 层 -->
		<div class="bv-view-scroll">
			<slot></slot>
		</div>

		<!-- 公共的view层子路由 -->
		<bv-transition>
			<router-view/>
		</bv-transition>

		<!-- 浮层 -->
		<slot name="suspend" :scroll="scroll"></slot>

		<!-- 底部 -->
		<slot name="footer"></slot>

	</div>
</template>

<script>

  import { setViewEvent, setParentViewScroll, findParentView } from './index';
  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "bv-view",
    props: {
      routerLevel: {
        default: 1,
        type: Number
      },
      hasNav: {
        default: true,
        type: [Boolean, String]
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
    },
    destroyed() {
      setParentViewScroll({
        scrollElm: findParentView.call(this),
        type: 'destroyed'
      });
    }
  }
</script>

<style scoped lang="scss">

	.bv-view {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 47px;
		left: 0;
		z-index: 100;
		background-color: rgba(255, 255, 255, 1);
		&.no-nav-view {
			bottom: 0;
		}

		.bv-view-scroll {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
		}
	}

</style>