<template>
	<div class='bc-flex'>
		<img class='left_img' src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
		<div class='bc-flex-1 bc-mg-l-10rp'>
			<div>
				<span class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-f-15rp'>文字文字文字文字文字文字文字文字文字文字</span>
				<div class='t-888 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-t-8 bc-f-12rp'>ff 文字ddd ff 文字dddff 文字dddff 文字dddff 文字ddd</div>
			</div>
			<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-t-10rp bc-t-999'>
				<div class='action bc-flex bc-f-12rp'>
					<i class='iconfont iconeye- bc-f-12rp'></i><span>&nbsp;2536</span>
				</div>
				<div class='bc-f-12rp t-888'>
					{{1548946491687 | timeFilter("Y-M-D")}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '@router'
	export default {
		props:{
			itemList:{
				type:Object,
				default:{}
			}
		},
		data() {
			return {

			}
		},
		methods:{
			share(){
				if(this.$config.device.isApp){
					this.$share()
				}else{
					this.$router.push({'path':`${router.currentRoute.fullPath}/detail`})
				}
			}
		},
		mounted() {
		}
	}
</script>

<style lang='scss' scoped>

	.t-888{
		color:#888
	}

	.left_img{
		width: rem(120);
		height: rem(80);
	}
	.action{
		color:#888;
		div{
			margin-right: rem(20);
			i{
				color:#C1A77D;
			}
		}
		
	}
	
</style>