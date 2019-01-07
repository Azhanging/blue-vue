<template>
	<div class="m-header">
		<div class="m-header-container">
			<div class="m-header-control">
				<slot name="left-control">
					<a class="m-header-btn" @click="back">
						<span class="bc-arrow bc-arrow-l bc-arrow"></span>
					</a>
				</slot>
			</div>
			<div class="m-header-title">{{title}}</div>
			<div class="m-header-control">
				<slot name="right-control"></slot>
			</div>
		</div>
	</div>
</template>

<script>

  import router from '@router';

  export default {
    name: "m-header",
    props: {
      leftControl: {
        default: '',
        type: String
      },
      title: {
        type: [String, Function],
        default: ""
      }
    },
    methods: {
      back() {
        const utils = this.$utils;
        const leftControl = this.leftControl;
        if (leftControl && utils.isStr(leftControl)) {
          router.push(leftControl);
        } else if (utils.isFunction(leftControl)) {
          leftControl.call(this);
        } else if (history.length > 1) {
          router.back();
        } else {
          router.push('/');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.m-header {
		position: sticky;
		top: 0;
		z-index: 200;
		background-color: #fff;
		border-top: 1px solid #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
		.m-header-container {
			display: flex;
			align-items: center;
			.m-header-control {
				flex: 1;
				.m-header-btn {
					display: inline-block;
					padding: 10px;
				}
			}
			.m-header-title {
				padding: 10px;
				font-size: 1rem;
			}
		}
	}
</style>