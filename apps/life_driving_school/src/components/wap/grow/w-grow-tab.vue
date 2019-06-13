<template>
	<w-home-header :header='header' :leftControl="leftControl">

		<w-home-nav  :nav='nav' :defaultParams_key='"classId"' :otherParams='{grow_id:$route.params.grow_id}' :active-index='$route.params.classId'>

		</w-home-nav>
		<slot name='second_tab'></slot>
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
					this.nav =  res.data.system;
					this.$emit('collegeList',res.data.course)
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

