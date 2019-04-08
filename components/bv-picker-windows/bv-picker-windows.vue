<template>
	<bv-picker scope-slot="scope" class="bv-picker-windows-container" :class="{'no-tab-bar':!view.tabBar}">
		<div class="bv-picker-windows">
			<!-- 标题 -->
			<div class="bc-flex bc-flex-ai-c bc-pd-10rp bc-t-999 bc-f-16rp bc-bd-b-e5e">
				<div class="bc-flex-1"></div>
				<div class="bc-flex-2">
					我是标题来的
				</div>
				<div class="bc-flex-1 bc-t-r bc-f-21rp">
					<a href="javascript:;" class="bc-t-666">
						&times;
					</a>
				</div>
			</div>

			<!-- 标题 -->
			<div class="bv-picker-windows-body">
				<bv-swiper-scroll :direction="'y'" class="bv-picker-windows-body-item">
					<template slot="scroll-items">
						<div v-for="i in 300">
							{{i}}
						</div>
					</template>
				</bv-swiper-scroll>
			</div>

		</div>
	</bv-picker>
</template>

<script>

	import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "bv-picker-windows",
    props: {
      slots: {
        default() {
          return [];
        }
      }
    },
    computed: {
      ...mapState(['view'])
    }
  }
</script>

<style scoped lang="scss">
	.bv-picker-windows-container {
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 47px;
		bottom: calc(constant(safe-area-inset-bottom) + 47px);
		bottom: calc(env(safe-area-inset-bottom) + 47px);
		background-color: rgba(0, 0, 0, .2);
		text-align: center;
		//没有tab-bar
		&.no-tab-bar {
			bottom: 0;
		}
		.bv-picker-windows {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: rem(300);
			background-color: white;
			.bv-picker-windows-body {
				.bv-picker-windows-body-item {
					height: rem(300);
				}
			}
		}
	}
</style>