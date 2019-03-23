<!-- 底部导航组件 -->
<template>
	<div class="bv-tab-bar" :style="`background-color: ${backgroundColor};`">
		<div class="bv-tab-bar-list">
			<div class="bv-tab-bar-item" v-for="(item,index) in nav">
				<a @click="routerTo(item.to)"
				   :class="[activeIndex !== index ? unActiveClassName : activeClassName]"
				>
					<div v-if="item.icon">
						<img :src="activeIndex === index ? item.activeIcon : item.icon" class="bv-tab-bar-icon"/>
					</div>
					<div v-if="item.content" class="bv-tab-bar-content">
						{{item.content}}
					</div>
				</a>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "bv-tab-bar",
    props: {
      nav: {
        default() {
          return [];
        },
        type: Array
      },
      unActiveClassName: {
        default: 'bc-t-666',
        type: String
      },
      activeClassName: {
        default: '',
        type: String
      },
      activeIndex: {
        default: 0,
        type: Number
      },
      backgroundColor: {
        default: 'white',
        type: String
      }
    },
    methods: {
      routerTo(to) {
        if (this.$utils.isStr(to)) {
          this.$router.push(to);
        } else if (this.$utils.isFunction(to)) {
          to.call(this);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.bv-tab-bar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		font-size: 10px;
		line-height: 12px;
		box-shadow: 0 5px 20px rgba(0, 0, 0, .1);
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		.bv-tab-bar-list {
			display: flex;
			align-items: center;
			justify-content: center;
			.bv-tab-bar-item {
				flex: 1;
				padding: 4px;
				text-align: center;
				.bv-tab-bar-icon {
					width: 20px;
					height: 20px;
					vertical-align: top;
					pointer-events: none;
				}
				.bv-tab-bar-content {
					padding-top: 6px;
					text-align: center;
				}
			}
		}
	}
</style>