<template>
	<w-home-header :header='header'>
		<w-home-nav  :nav='nav' :active-index='growIndex'>
		
		</w-home-nav>
		
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
				header: {
					title:{
						value:'成长系统'
					}
				},
				nav: [
					{
						name: '上大夫学院',
						id:15,
					},{
						name: '视频直播',
						id:16,
					},{
						name: '精选短课',
						id:17,
					},{
						name: '专区',
						id:18,
					}]
			}
		},
		mounted(){
		}
	}
</script>

