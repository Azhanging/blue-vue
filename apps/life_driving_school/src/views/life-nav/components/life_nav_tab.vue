<template>
	<w-home-header :header='title'>
		<w-home-nav  :nav='nav' :active-index='growIndex'></w-home-nav>
	</w-home-header>
</template>

<script>

	export default {
		props:{
			growIndex:0,
			title:''
		},
		data() {
			return {
				nav: [
					{
						nav_name: '首页',
						path: '/life-nav'
					},{
						nav_name: '驾照课程',
						path: '/life-nav/driving-license'
					},{
						nav_name: '问答专区',
						path: '/life-nav/question-answer'
					},{
						nav_name: '为您推荐',
						path: '/life-nav/recommend'
					}]
			}
		},
		mounted(){
			console.log(this.grow_index)
		}
	}
</script>

