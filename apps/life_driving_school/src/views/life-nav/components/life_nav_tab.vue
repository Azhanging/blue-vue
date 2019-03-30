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
						path: '/life_nav'
					},{
						nav_name: '驾照课程',
						path: '/life_nav/driving_license'
					},{
						nav_name: '问答专区',
						path: '/life_nav/question_answer'
					},{
						nav_name: '为您推荐',
						path: '/life_nav/recommend'
					}]
			}
		},
		mounted(){
			console.log(this.grow_index)
		}
	}
</script>

