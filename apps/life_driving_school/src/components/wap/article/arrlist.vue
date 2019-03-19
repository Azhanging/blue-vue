<template>
	<div class='arrlist'>
		<div v-for='item in list' class='bc-mg-b-10' @click='detailClick'>
			<div class='content bc-pd-10 bc-bg-white bc-flex'>
				<img class='left_img bc-mg-r-10' src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
				<div class='right'>
					<span>文字</span>
					<span>ff 文字ddd</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			list:[],
			
		},
		data() {
			return {
			
			}
		},
		methods:{
			detailClick(){
				console.log('ddd');
				this.$router.push({'path':'/article/zexun/detail'})
			}

		},
		mounted() {

		}
	}
</script>

<style lang='scss' scoped>
	@import '@css/index.scss';
	
	.arrlist{
		background-color: #f5f5f5;
			.content{
				.left_img{
					width: rem(144);
					height: rem(96);
					
				}
			}
		
		
	}
</style>