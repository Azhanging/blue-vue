<template>
	<div class="bc-overflow-hide">
		<div class="bc-row m-swiper-scroll">
			<slot name="items" :scroll-left-to="scrollLeftTo"></slot>
		</div>
	</div>
</template>

<script>

	import Velocity from 'velocity-animate';

  export default {
    name: "m-swiper-scroll",
    props: {
      activeClassName: {
        type: String,
        default: ''
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    watch: {
      currentIndex(val, oldVal) {
        this.scrollLeftTo();
      }
    },
    methods: {
      scrollLeftTo() {
        const index = this.currentIndex;
        const wrapElm = this.$el;
        const scrollElm = wrapElm.children[0];
        const elm = scrollElm.children[index];
        const elmWidth = elm.offsetWidth;
        const elmLeft = elm.offsetLeft;
        const parentWidth = scrollElm.offsetWidth;
        const elmOffsetLeft = (elmLeft - ((parentWidth - elmWidth) / 2));

        Velocity(scrollElm, "scroll", {
          axis: 'x',
          duration: 180,
          MobileHA: true,
          container: scrollElm,
          offset: elmOffsetLeft - scrollElm.scrollLeft
        });

        this.activeElm(elm);

        this.$emit('scroll-left', {
          elm,
          offsetLeft: elmOffsetLeft
        });

      },
      activeElm(elm) {
        const _this = this;
        const parent = elm.parentNode;
        const children = parent.children;
        [].forEach.call(children, (_elm) => {
          if (_elm != elm) {
            _elm.classList.remove(_this.activeClassName);
          } else {
            _elm.classList.add(_this.activeClassName);
          }
        });
      },
      initScrollTo() {
        this.scrollLeftTo(this.currentIndex);
      }
    },
    mounted() {
      this.initScrollTo();
    }
  }
</script>

<style scoped lang="scss">
	.m-swiper-scroll {
		overflow-x: scroll;
		overflow-y: hidden;
		white-space: nowrap;
		word-break: break-all;
		-webkit-overflow-scrolling: touch;
	}
</style>