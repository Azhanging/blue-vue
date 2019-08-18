<!-- 底部导航组件 -->
<template>
  <BvTransition transition-name="top">
    <div class="bv-tab-bar" id="tabBar" style="background:white;">
      <!-- 底部导航列表 -->
      <div class="bv-tab-bar-list-container">
        <div class="bv-tab-bar-list">
          <!-- 跳转 -->
          <a class="bv-tab-bar-item"
             v-for="(item, index) in list"
             :class="[
             item.className,
             activeIndex !== index ? unActiveClassName : activeClassName     //选中的className
           ]"
             :style="item.style"
             :key="`bv-tab-bar-item-${index}`"
             @click.stop="routerTo($event, item, index)"
          >

            <!-- 方向为top的时候出现 -->
            <div v-if="item.icon && item.icon.direction && (item.icon.direction === 'top')">
              <BvTabBarIcon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
            </div>

            <!-- 内容以及左右方向的icon -->
            <div v-if="item.content" class="bv-tab-bar-content bc-flex bc-flex-ai-c bc-flex-jc-c">

              <!-- 方向为left的时候出现 -->
              <BvTabBarIcon :icon="item.icon" :active-index="activeIndex" :current-index="index"
                               v-if="item.icon && item.icon.direction && (item.icon.direction === 'left')"/>

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
                <BvTabBarIcon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
              </template>

            </div>

            <!-- 方向为bottom的时候出现 -->
            <div v-if="item.icon && item.icon.direction && (item.icon.direction === 'bottom')">
              <BvTabBarIcon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
            </div>

            <!-- 子菜单 -->
            <BvTransition transition-name="opacity">
              <!-- 子菜单 -->
              <div class="tab-bar-submenu"
                   v-show="tabBarSubMenuIndex === index"
              >
                <!-- 子菜单列表容器 -->
                <div class="tab-bar-submenu-list-wrap" v-if="item.children" :style="item.children.style">
                  <!--子菜单列表-->
                  <div class="tab-bar-submenu-list" :style="item.children.list.style" v-if="item.children.list">
                    <div class="tab-bar-submenu-list-item bc-t-hide"
                         v-if="item.children.list.items.length > 0"
                         v-for="(submenu, index) in item.children.list.items"
                         :key="`tab-bar-submenu-list-item-${index}`"
                         :class="submenu.className"
                         :style="submenu.style"
                    >
                      <a href="javascript:;"
                         :class="[
                     item.children.unActiveClassName,
                     submenu.link && submenu.link.className
                   ]"
                         :style="submenu.link && submenu.link.style"
                         @click.stop="routerTo($event,submenu,index)"
                      >
                  <span :style="`font-size:${submenu.content.fontSize}px;` + submenu.content.style">
                    {{submenu.content.value}}
                  </span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- 子菜单箭头容器 -->
                <div class="tab-bar-submenu-arrow-wrap" v-if="item.children && item.children.arrow">
                  <!-- 子菜单箭头 -->
                  <i class="tab-bar-submenu-arrow" :style="`border-top: 7px solid ${item.children.arrow.background};`"></i>
                </div>

              </div>
            </BvTransition>

          </a>
        </div>
      </div>
    </div>
  </BvTransition>
</template>

<script>

  import BvTabBarIcon from './BvTabBarIcon'
  import { computSubMenuPosition, setTabBarSubmenuIndex } from './index';

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
      }
    },
    computed: {
      tabBarSubMenuIndex() {
        const state = this.$store.state;
        return state.view.tabBarSubmenuIndex;
      }
    },
    methods: {
      routerTo($event, tabBarItem, index) {
        const { to, children } = tabBarItem;
        const tabBarSubMenuIndex = this.tabBarSubMenuIndex;
        //存在子菜单
        if (children && children.list && this.$utils.isArray(children.list.items)) {

          //当前的index
          const currentIndex = ((index === tabBarSubMenuIndex) ? -1 : index);

          //设置子菜单的状态
          setTabBarSubmenuIndex({
            tabBarSubmenuIndex: currentIndex
          });

          (currentIndex !== -1) && computSubMenuPosition.call(this, {
            menuElm: $event.currentTarget
          });
        } else {
          //设置子菜单的状态
          setTabBarSubmenuIndex({
            tabBarSubmenuIndex: -1
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
    z-index: 1000;
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

    //子菜单
    .tab-bar-submenu {
      position: absolute;
      bottom: 95%;
      z-index: 9700;
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