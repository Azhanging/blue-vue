<template>
	<transition :name="transition" mode="in-out">
		<slot/>
	</transition>
</template>

<script>
  export default {
    name: "bv-transition",
    props: ['transitionName'],
    data() {
      return {
        transition: 'right'
      }
    },
    watch: {
      ['$route'](to, from) {
        if (this.transitionName) {
          this.transition = this.transitionName;
        } else {
          const toDepth = to.path.split('/').length;
          const fromDepth = from.path.split('/').length;
          this.transition = toDepth < fromDepth ? 'left' : 'right';
        }
      }
    }
  }
</script>

<style lang="scss">
	.left-enter-active,
	.left-leave-active,
	.top-enter-active,
	.top-leave-active,
	.right-enter-active,
	.right-leave-active {
		transition: all .4s;
	}

	.left-enter,
	.left-leave-active,
	.top-enter,
	.top-leave-active,
	.right-enter,
	.right-leave-active {
		opacity: 0;
	}

	.top-enter {
		transform: translateY(100px);
	}

	.top-leave-active {
		transform: translateY(100px);
	}

	.left-enter {
		transform: translateX(-100px);
	}

	.left-leave-active {
		transform: translateX(100px);
	}

	.right-enter {
		transform: translateX(100px);
	}

	.right-leave-active {
		transform: translateX(-100px);
	}
</style>
