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
             activeIndex !== index ? unActiveClassName : activeClassName     //选中的className
           ]"
             :key="`bv-tab-bar-item-${index}`"
             @click.stop="routerTo($event, item)"
          >

            <div v-if="item.icon">
              <BvTabBarIcon :icon="item.icon" :active-index="activeIndex" :current-index="index"/>
            </div>

            <div v-if="item.text" class="br-tab-bar-content bz-flex bz-flex-ai-c bz-flex-jc-c">
              {{item.text}}
            </div>
          </a>
        </div>
      </div>
    </div>
  </BvTransition>
</template>

<script>

  import BvTabBarIcon from './BvTabBarIcon'

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
        default: 'bz-t-666',
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
      routerTo($event, tabBarItem) {
        const { to } = tabBarItem;
        //非子菜单
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
        padding: 4px;
      }
    }

    .br-tab-bar-content {
      font-size: 12px;
    }
  }
</style>