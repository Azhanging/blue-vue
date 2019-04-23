<template>
	<w-home-header :header='header'>

		<w-home-nav  :nav='nav' :defaultParams_key='"classId"' :otherParams='{grow_id:$route.params.grow_id}' :active-index='growIndex'>

		</w-home-nav>
		<slot name='second_tab'></slot>
	</w-home-header>

</template>

<script>

	export default {
		props:{
			growIndex:0,
			otherParams:{},

		},
		data() {
			return {
				activeIndex:0,
				header: {
					title:{
						value:'成长系统'
					}
				},
				nav: []

			}
		},
		methods:{
			getNav(){
				let paramsId = this.$route.params;
				this.$axios.get('/api/classify/assortment',{
					params:{
						column_id:paramsId.grow_id
					}
				}).then((res) => {
					this.nav =  res.data.data.system;
					this.$emit('collegeList',res.data.data.course)
					// this.$router.push()
				});
			}
		},
		mounted(){
			this.getNav()
		}
	}
</script>


<style scoped lang="scss">

	.active {
		color: $color-base;
		border-bottom: 2px $color-base solid;
	}



</style>

