<!-- home页导航组件 -->
<template>
	<div class="bc-flex bc-flex-jc-c bc-t-c home-nav">
			<!--默认不带path,需要path,用插槽修改-->
			<div class='bc-flex-1' v-for="(item,index) in nav">
				<slot name='changePath'>
					<router-link :to="$router.routerID.getPathID({
						id:item.id,
						params:{
							id:item.id
						}
					})">
						<div :class="[activeIndex !== index ? unActiveClassName : activeClassName,'bc-pd-tb-12rp','bc-inline-block']"
						     v-if="item.name">
							{{item.name}}
						</div>
					</router-link>
				</slot>
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
      // routerTo(item) {
      //   const path = item.path;
      //   this.$router.push(path);
      //   this.$emit('router-to', {
      //     params: item.params || {}
      //   });
      // }
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
