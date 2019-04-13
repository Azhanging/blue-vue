<template>
	<w-home-header :header='title'>
		<w-home-nav  :nav='nav' :otherParams='{nav_id:$route.params.nav_id}' :active-index='growIndex'></w-home-nav>
	</w-home-header>
</template>

<script>

	export default {
		props:{
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

