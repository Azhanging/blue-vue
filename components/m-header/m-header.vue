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
      title: {
        type: String,
        default: ""
      }
    },
    methods: {
      back() {
        if (history.length > 1) {
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
		/*position: sticky;
		top: 0;
		background-color: #fff;
		z-index: 200;*/
		.m-header-container {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #e5e5e5;
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