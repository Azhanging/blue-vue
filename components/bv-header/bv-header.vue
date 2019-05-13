<!-- 头部组件 -->
<template>
	<div class="bv-header">
		<div class="bv-header-container" :style="`background-color:white;border-bottom:1px solid #e5e5e5;${header.style}`">
			<div class="bv-header-control">
				<slot name="left-control">
					<a class="bv-header-btn" @click="leftControlHandler">
						<span class="bc-arrow bc-arrow-l"></span>
					</a>
				</slot>
			</div>
			<div class="bv-header-title" :style="header.title && header.title.style">
				<slot name="set">{{(header.title && header.title.value) || config.view.title}}</slot>
			</div>
			<div class="bv-header-control bc-t-r">
				<!-- 有操作的插槽 -->
				<slot name="right-control"/>
			</div>
		</div>
		<!-- 额外的插槽 -->
		<slot/>
	</div>
</template>

<script>

  export default {
    name: "bv-header",
    props: {
      //左边控制
      leftControl: {
        default: '',
        type: [String, Function]
      },
      //头部组件的配置信息
      header: {
        default() {
          return {
            /*title: {
              style: '',
              value: ''
            },
            style: ''*/
          }
        },
        type: Object
      }
    },
    methods: {
      //左边控制的方法
      leftControlHandler() {
        this.$router.routerBack(this.leftControl);
      }
    }
  }
</script>

<style scoped lang="scss">
	.bv-header {
		position: sticky;
		top: 0;
		z-index: 200;
		background-color: #fff;
		border-top: 1px solid #f5f5f5;
		.bv-header-container {
			display: flex;
			align-items: center;
			.bv-header-control {
				flex: 1;
				.bv-header-btn {
					display: inline-block;
					padding: 10px;
				}
			}
			.bv-header-title {
				max-width: 190px;
				padding: 10px;
				font-size: rem(18);
				font-weight: bold;
				text-overflow: ellipsis;
				overflow: hidden;
				word-wrap: normal;
				white-space: nowrap;
			}
		}
	}
</style>
