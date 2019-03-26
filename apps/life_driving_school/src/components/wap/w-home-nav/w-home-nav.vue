<!-- home页导航组件 -->
<template>
	<div class="bc-flex home-nav">
		<div  class='bc-flex-1 bc-t-c' v-for="(item,index) in nav">
			<a @click="routerTo(item)"
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
			}
		},
		data() {
			return {
				nav: [
					{
					nav_name: '首页',
					path: '/'
				}, {
					nav_name: '生命计划',
					path: '/'
				}, {
					nav_name: '资讯',
					path: '/article/zexun',
					params: {
						type: "zexun"
					}
				}, {
					nav_name: '公开课',
					path: '/article/gongkaike',
					params: {
						type: "gongkaike"
					}
				}, {
					nav_name: '专区',
					path: '/zhuanqu'
				}]
			}
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
		mounted(){
		
		}
	}
</script>

<style scoped lang="scss">
	@import '@css/index.scss';
	
	
	.home-nav{
		border-bottom: 1px #eee solid;
		a{
			height: 40px;
			display: inline-block;
			line-height: 40px;
		}
		.active{
			color:$color-base;
			border-bottom: 2px $color-base solid;
			
		}
	}


</style>