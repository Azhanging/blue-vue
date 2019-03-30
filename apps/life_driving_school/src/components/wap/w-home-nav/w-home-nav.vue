<!-- home页导航组件 -->
<template>
	<div class="bc-flex bc-flex-jc-c bc-t-c home-nav">
		<div class='bc-flex-1' v-for="(item,index) in nav">
			<a @click="routerTo(item)"
			   class="bc-pd-tb-12rp bc-inline-block"
			   :class="[activeIndex !== index ? unActiveClassName : activeClassName]"
			   v-if="item.nav_name"
			>
				{{item.nav_name}}
			</a>
		</div>
	</div>
</template>

<script>
	
	export default {
    name: "home-nav",
    props: {
      activeClassName: {
        default: 'active',
        type: String
      },
      unActiveClassName: {
        default: 'bc-t-666',
        type: String
      },
      activeIndex: {
        default: 0,
        type: Number
      },
      nav: {
        default: [],
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {
      routerTo(item) {
        const path = item.path;
        this.$router.push(path);
        this.$emit('router-to', {
          params: item.params || {}
        });
      }
    },
    mounted() {

    }
  }
</script>

<style scoped lang="scss">
	.home-nav {
		border-bottom: 1px #eee solid;
		.active {
			color: $color-base;
			border-bottom: 2px $color-base solid;
		}
	}


</style>