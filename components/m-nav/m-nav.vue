<template>
	<div class="m-nav">
		<div class="m-nav-list">
			<div class="m-nav-item" v-for="(item,index) in nav">
				<router-link
					:to="item.to"
					:class="[activeIndex != index ? unActiveClassName : activeClassName]"
				>
					<div v-if="item.icon">
						<img :src="activeIndex == index ? item.activeIcon : item.icon" alt="" width="20" height="20"/>
					</div>
					<div v-if="item.content">
						{{item.content}}
					</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "m-nav",
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
    }
  },
  methods: {
    routerTo(path) {
      if (this.$utils.isStr(path)) {
        this.$router.push(path);
      } else if (this.$utils.isFunction(path)) {
        path.call(this);
      }
    }
  }
}
</script>

<style scoped lang="scss">
	.m-nav {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		border-top: 1px solid #e5e5e5;
		font-size: .6rem;
		.m-nav-list {
			display: flex;
			align-items: center;
			justify-content: center;
			.m-nav-item {
				flex: 1;
				padding: 4px;
				text-align: center;
				.m-nav-icon {
					width: 30px;
					height: 30px;
					vertical-align: top;
				}
				.m-nav-title {
					text-align: center;
				}
			}
		}
	}
</style>