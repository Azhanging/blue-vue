<!-- 每个页面的主视图组件 必须使用 -->
<template>
	<div class="m-view">
		<!-- scroll 层 -->
		<div class="m-view-scroll">
			<slot></slot>
		</div>

		<!-- 浮层 -->
		<slot name="suspend" :scroll="scroll"></slot>

		<!-- 底部导航 -->
		<slot name="nav"></slot>

	</div>
</template>

<script>
	import { setViewEvent } from './index';

  export default {
    name: "m-view",
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
		bottom: 0;
		left: 0;
		z-index: 120;
		background-color: white;
		padding-bottom: 48px;
	}

	.m-view-scroll {
		width: 100%;
		height: 100%;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
	}

</style>