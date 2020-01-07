<!-- scroll组件 -->
<template>
  <div data-scroll-elm>
    <!-- 内部容器 -->
    <div data-scroll-container>
      <slot/>
    </div>
  </div>
</template>

<script>

  import { initScroll } from './index';

  export default {
    name: "bv-scroll",
    props: {
      distance: {
        type: [Number, String],
        default: 50
      },
      disabled: {
        type: Boolean,
        default: false
      },
      immediate: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      initScroll.call(this);
    }
  }
</script>
