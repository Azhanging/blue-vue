<!-- 头部组件 -->
<template>
  <div class="bv-header">
    <!--广告位-->
    <slot name='advertisement'></slot>
    <div class="bv-header-container" :style="`${headerStyle}`">
      <!-- 左边控制 -->
      <div class="bv-header-control">
        <slot name="left-control">
          <div class="bc-flex bc-flex-ai-c">
            <a class="bv-header-btn bv-header-btn-icon" @click="back">
              <i class="bp-icon bp-icon-left bc-f-16"></i>
            </a>
            <a class="bv-header-btn bv-header-btn-icon" @click="goHome">
              <i class="bp-icon bp-icon-home bc-f-16"></i>
            </a>
          </div>
        </slot>
      </div>
      <div class="bv-header-title" :style="centerControl.style">
        <slot name="title">{{(centerControl.title) || config.view.title}}</slot>
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
      headerStyle: {
        default: ``,
        type: String
      },
      //左边控制
      leftControl: {
        default() {
          return {
            backPath: ``
          }
        },
        type: Object
      },
      centerControl: {
        default() {
          return {
            title: ``,
            style: ``
          }
        }
      }
    },
    methods: {
      //左边控制的方法
      back() {
        const router = this.$router;
        const backPath = this.leftControl.backPath;
        if (this.leftControl.backPath) {
          router.routerTo(backPath);
        } else {
          router.routerBack();
        }
      },
      goHome() {
        this.$router.push(this.config.path.home);
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
      background-color: white;
      border-bottom: 1px solid #e5e5e5;
      .bv-header-control {
        flex: 1;
        .bv-header-btn {
          display: inline-block;
          padding: 10px;
          &.bv-header-btn-icon {
            font-size: 0;
          }
        }
      }
      .bv-header-title {
        max-width: 190px;
        padding: 10px;
        font-size: rem(16);
        font-weight: bold;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: normal;
        white-space: nowrap;
      }
    }
  }
</style>
