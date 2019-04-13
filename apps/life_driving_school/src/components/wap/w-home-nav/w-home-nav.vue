<!-- home页导航组件 -->
<template>
	<div class="bc-flex bc-flex-jc-c bc-t-c home-nav">
		<slot name='changePath'>
		
			<div class='bc-flex-1' v-for="(item,index) in nav">
					<router-link :to="$router.routerID.getPathID({
						[defaultParams_key]:item.id,
						params:Object.assign({
							[defaultParams_key]:item.id
						},otherParams)
					})">
						<div :class="[activeIndex !== index ? unActiveClassName : activeClassName,'bc-pd-tb-12rp','bc-inline-block']"
						     v-if="item.name">
							{{item.name}}
						</div>
					</router-link>
			</div>
		</slot>
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
      },
	    otherParams:{
      	default:{},
		    type:Object
	    },
	    defaultParams_key:{
      	default:'id',
		    type:String
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
