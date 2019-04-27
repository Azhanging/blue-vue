<!-- home页导航组件 -->
<template>
	<div class="bc-flex bc-flex-jc-sa bc-t-c home-nav bc-flex-ai-c">
		<slot name='changePath'>
		
			<div class='bc-flex-1 item' v-for="(item,index) in nav">
					<router-link  :class="[activeIndex != item.id ? unActiveClassName : activeClassName,'itemNav','bc-pd-tb-8','bc-inline-block']"
					              v-if="item.name" :to="$router.routerID.getPathID({
						id:item.id,
						params:Object.assign({
							[defaultParams_key]:item.id
						},otherParams)
						
					})">
						{{item.name}}
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
		/*height: rem(40);*/
		border-bottom: 1px #eee solid;
		.item{
			
			.itemNav{
			
			}
			
		}
		
		.active {
			color: $color-base;
			border-bottom: 2px $color-base solid;
			font-size: rem(16);
			box-sizing: border-box;
		}
	}


</style>
