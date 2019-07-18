<!-- 头部组件 -->
<template>
  <div class="bv-header">
    <!--广告位-->
    <slot name='advertisement'></slot>
    <div class="bv-header-container" :style="`${header.style}`">
      <!-- 左边控制 -->
      <div class="bv-header-control">
        <slot name="left-control">
          <div class="bc-flex bc-flex-ai-c">
            <a class="bv-header-btn bv-header-btn-icon" @click="leftControlHandler">
              <i class="bv-icon bv-icon-left bc-f-16"></i>
            </a>
            <a class="bv-header-btn bv-header-btn-icon" @click="routerToHome">
              <i class="bv-icon bv-icon-home bc-f-16"></i>
            </a>
          </div>
        </slot>
      </div>
      <div class="bv-header-title" :style="header.title && header.title.style">
        <slot name="title">{{(header.title && header.title.value) || config.view.title}}</slot>
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
      //左边控制
      leftControl: {
        default: '',
        type: [String, Function]
      },
      //头部组件的配置信息
      header: {
        default() {
          return {
            /*title: {
              style: '',
              value: ''
            },
            style: ''*/
          }
        },
        type: Object
      }
    },
    methods: {
      //左边控制的方法
      leftControlHandler() {
        const router = this.$router;
        if(this.leftControl){
          router.routerTo(this.leftControl);
        } else {
          router.routerBack();
        }
      },
      routerToHome() {
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
