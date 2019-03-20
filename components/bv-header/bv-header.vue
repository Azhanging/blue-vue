<!-- 头部组件 -->
<template>
  <div class="m-header">
    <div class="m-header-container">
      <div class="m-header-control">
        <slot name="left-control">
          <a class="m-header-btn" @click="leftControlHandler">
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

  export default {
    name: "m-header",
    props: {
      //左边控制
      leftControl: {
        default: '',
        type: String
      },
      //标题
      title: {
        type: [String, Function],
        default: ""
      }
    },
    methods: {
      //左边控制的方法
      leftControlHandler() {
        this.$router.$routerBack(this.leftControl);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '@css/index.scss';
  
  .m-header {
    position: sticky;
    top: 0;
    z-index: 200;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    .m-header-container {
      display: flex;
      align-items: center;
      .m-header-control {
        flex: 1;
        .m-header-btn {
          display: inline-block;
          padding: 10px;
        }
      }
      .m-header-title {
        max-width: 190px;
        padding: 10px;
        font-size: rem(15);
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: normal;
        white-space: nowrap;
      }
    }
  }
</style>