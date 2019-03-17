<!-- 底部导航组件 -->
<template>
  <div class="bv-nav" :style="`background-color: ${backgroundColor};`">
    <div class="bv-nav-list">
      <div class="bv-nav-item" v-for="(item,index) in nav">
        <a @click="routerTo(item.to)"
           :class="[activeIndex !== index ? unActiveClassName : activeClassName]"
        >
          <div v-if="item.icon">
            <img :src="activeIndex === index ? item.activeIcon : item.icon" class="bv-nav-icon"/>
          </div>
          <div v-if="item.content" class="bv-nav-content">
            {{item.content}}
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bv-nav",
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
  .bv-nav {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    font-size: 12px;
    line-height: 12px;
    border-top: 1px solid #e5e5e5;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    .bv-nav-list {
      display: flex;
      align-items: center;
      justify-content: center;
      .bv-nav-item {
        flex: 1;
        padding: 4px;
        text-align: center;
        .bv-nav-icon {
          width: 20px;
          height: 20px;
          vertical-align: top;
          pointer-events: none;
        }
        .bv-nav-content {
          padding-top: 6px;
          text-align: center;
        }
      }
    }
  }
</style>