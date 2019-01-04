<template>
	<div class="suspend">
		<!-- 回到顶部 -->
		<div class="back-to-top" v-show="backToTopShow">
			<a href="javascript:;" @click="backToTop">
				<img src="//www.dtb315.com/Static/wap/home/images/scrollTop.png?v=13mqr11?v=0" width="30" height="30">
			</a>
		</div>
	</div>
</template>

<script>
  export default {
    name: "m-suspend",
    props: {
      backElement: {
        type: Element
      },
      //显示距离
      distance: {
        type: Number,
        default: 100
      },
      //当前的scroll距离
      scrollDistance: {
        type: Number,
        default: 0
      }
    },
    computed: {
      backToTopShow() {
        return this.scrollDistance > this.distance;
      }
    },
    methods: {
      backToTop() {
        if (this.backElement) {
          this.backElement.scrollTop = 0;
        } else {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
          if (pageYOffset in window) {
            window.pageYOffset = 0;
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	.suspend {
		position: fixed;
		z-index: 1;
		right: 10px;
		bottom: 60px;
	}

</style>