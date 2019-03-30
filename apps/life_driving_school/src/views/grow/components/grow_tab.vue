<template>
	<w-home-header :title='"成长系统"'>
		<w-home-nav  :nav='nav' :active-index='growIndex'></w-home-nav>
		
		<slot name='second_tab'></slot>
	</w-home-header>
	
</template>

<script>

	export default {
		props:{
			growIndex:0
		},
		data() {
			return {
				nav: [
					{
						nav_name: '上大夫学院',
						path: '/grow'
					},{
						nav_name: '视频直播',
						path: '/grow/video'
					},{
						nav_name: '精选短课',
						path: '/grow/short'
					},{
						nav_name: '专区',
						path: '/grow/zhuanqu'
					}]
			}
		},
		mounted(){
		}
	}
</script>

