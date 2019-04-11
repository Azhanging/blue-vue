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
						name: '首页',
						id:4,
						//path: '/life-nav'
					},{
						name: '驾照课程',
						id:38,
						//path: '/life-nav/driving-license'
					},{
						name: '问答专区',
						id:42,
						//path: '/life-nav/question-answer'
					},{
						name: '为您推荐',
						id:43,
						//path: '/life-nav/recommend'
					}]
			}
		},
		mounted(){
			console.log(this.grow_index)
		}
	}
</script>

