<!-- 底部导航组件 -->
<template>
	<div class="bv-tab-bar" :style="style" id="tabBar">
		<!-- 底部导航列表 -->
		<div class="bv-tab-bar-list">
			<div class="bv-tab-bar-item" v-for="(item,index) in list" :class="[item.className]" :style="item.style">
				<a @click.stop="routerTo($event,item)" class="bc-block"
				   :class="[
				     activeIndex !== index ? unActiveClassName : activeClassName,     //选中的className
				     item.link && item.link.className                                 //针对链接的样式
				   ]"
				   :style="item.link && item.link.style"
				>
					<!-- 方向为top的时候出现 -->
					<div v-if="item.icon && item.icon.direction && (item.icon.direction === 'top')">
						<bv-tab-bar-icon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
					</div>

					<!-- 内容以及左右方向的icon -->
					<div v-if="item.content" class="bv-tab-bar-content bc-flex bc-flex-ai-c bc-flex-jc-c">

						<!-- 方向为left的时候出现 -->
						<template v-if="item.icon && item.icon.direction && (item.icon.direction === 'left')">
							<bv-tab-bar-icon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
						</template>

						<span
							:style="`padding-${item.icon && item.icon.direction &&
								(item.icon.direction === 'top' &&
								item.icon.direction !== 'left' &&
								item.icon.direction !== 'right') ? 'top' : (item.icon && item.icon.direction)}: 4px;` +
					     `font-size:${item.content.fontSize}px;` +
					     item.content.style"
							:class="[item.content.className]"
						>
							{{item.content.value}}
						</span>

						<!-- 方向为right的时候出现 -->
						<template v-if="item.icon && item.icon.direction && (item.icon.direction === 'right')">
							<bv-tab-bar-icon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
						</template>

					</div>

					<!-- 方向为bottom的时候出现 -->
					<div v-if="item.icon && item.icon.direction && (item.icon.direction === 'bottom')">
						<bv-tab-bar-icon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
					</div>

				</a>
			</div>
		</div>

		<!-- 子菜单 -->
		<bv-transition transition="slide-top">
			<div class="tab-bar-submenu" id="tarBarSubMenu" v-show="tabBarSubMenuStatus" v-if="subMenu.list && subMenu.list.items && subMenu.arrow">

				<!-- 子菜单列表容器 -->
				<div class="tab-bar-submenu-list-wrap" :style="subMenu.style">
					<!--子菜单列表-->
					<div class="tab-bar-submenu-list" :style="subMenu.list.style">
						<div class="tab-bar-submenu-list-item bc-t-hide" v-for="item in subMenu.list.items" :class="item.className" :style="item.style">
							<a href="javascript:;"
							   :class="[
					     subMenu.unActiveClassName,
					     item.link && item.link.className
					   ]"
							   :style="item.link && item.link.style"
							   @click.stop="routerTo($event,item)"
							>
							<span :style="`font-size:${item.content.fontSize}px;` + item.content.style">
								{{item.content.value}}
							</span>
							</a>
						</div>
					</div>
				</div>

				<!-- 子菜单箭头容器 -->
				<div class="tab-bar-submenu-arrow-wrap">
					<!-- 子菜单箭头 -->
					<i class="tab-bar-submenu-arrow" :style="`border-top: 7px solid ${subMenu.arrow.background};`"></i>
				</div>

			</div>
		</bv-transition>

	</div>
</template>

<script>

	import BvTabBarIcon from './bv-tab-bar-icon'

  import { computSubMenuPosition, setTabBarSubMenuStatus } from './index';

  //记录最后一次的tabBar的elm
  let lastTabBarItem = null;

  export default {
    name: "bv-tab-bar",
    components: {
      BvTabBarIcon
    },
    props: {
      list: {
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
      style: {
        default: 'background:white;',
        type: String
      }
    },
    data() {
      return {
        subMenu: {}
      };
    },
    computed: {
      tabBarSubMenuStatus() {
        return this.$store.state.view.tabBarSubMenu;
      }
    },
    methods: {
      routerTo($event, tabBarItem) {
        const { to, children } = tabBarItem;
        const tabBarItemElm = $event.currentTarget;
        //存在子菜单
        if (children && children.list && this.$utils.isArray(children.list.items)) {
          //设置子菜单的状态
          setTabBarSubMenuStatus({
            tabBarSubMenuStatus: (() => {
              if (tabBarItemElm !== lastTabBarItem) {
                return true;
              } else {
                return !this.tabBarSubMenuStatus;
              }
            })()
          });
          lastTabBarItem = tabBarItemElm;
          this.subMenu = children;
          this.tabBarSubMenuStatus && computSubMenuPosition.call(this, {
            menuElm: $event.currentTarget
          });
        } else {
          //设置子菜单的状态
          setTabBarSubMenuStatus({
            tabBarSubMenuStatus: false
          });
          //非子菜单
          if (this.$utils.isStr(to)) {
            this.$router.push(to);
          } else if (this.$utils.isFunction(to)) {
            to.call(this);
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.bv-tab-bar {
		position: fixed;
		width: auto;
		z-index: 10000;
		left: 0;
		bottom: 0;
		width: 100%;
		max-height: 47px !important;
		line-height: 12px;
		border-top: 1px solid #e5e5e5;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);

		//导航列表
		.bv-tab-bar-list {
			display: flex;
			align-items: center;
			justify-content: center;
			.bv-tab-bar-item {
				flex: 1;
				text-align: center;
				.bv-tab-bar-icon {
					width: 20px;
					height: 20px;
					max-width: 20px !important;
					max-height: 20px !important;
					vertical-align: top;
					pointer-events: none;
				}
				.bv-tab-bar-content {
					text-align: center;
				}
			}
		}

		.tab-bar-submenu {
			position: absolute;
			bottom: 95%;
			z-index: 100000;
			//子菜单
			.tab-bar-submenu-list-wrap {
				padding: rem(3);
				.tab-bar-submenu-list {
					padding: 0 rem(4);
					//子菜单选项
					.tab-bar-submenu-list-item {
						text-align: center;
						padding: rem(10) rem(5);
					}
				}
			}
			//子菜单箭头
			.tab-bar-submenu-arrow-wrap {
				text-align: center;
				line-height: 7px;
				font-size: 0;
				.tab-bar-submenu-arrow {
					display: inline-block;
					width: 0;
					height: 0;
					border-left: 7px solid transparent;
					border-right: 7px solid transparent;
					border-bottom: 0 solid transparent;
				}
			}
		}
	}
</style>