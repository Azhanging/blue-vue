<template>
	<w-home-header :header='title' :leftControl="leftControl">
		<w-home-nav  :nav='nav' :otherParams='{nav_id:$route.params.nav_id}' :active-index='growIndex'></w-home-nav>
	</w-home-header>
</template>

<script>

	export default {
		props:{
			//左边控制
			leftControl: {
				default: '',
				type: String
			},
			growIndex:0,
			title:'',
			otherParams:{}
		},
		data() {
			return {
				nav: []
			}
		},
		methods:{
			life_nav(){
				return this.$axios.get('/api/Classify/assortment',{
					params:{
						column_id:this.$route.params.nav_id
					}
				}).then(res=>{
					//console.log(res)
					this.nav = res.data.data.system;
				})
			}
		},
		mounted(){
			this.life_nav();
		}
	}
</script>

