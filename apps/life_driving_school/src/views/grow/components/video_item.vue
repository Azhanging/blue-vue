<template>
	<div class='bc-pd-lr-15rp bc-pd-t-15rp bc-mg-b-10rp bc-bg-white list'>
		<span class='bc-f-18rp'>正在直播</span>
		<!--数据循环-->
		<div v-for='item in videoList' @click='watch'>
			<div class='bc-flex bc-pd-tb-10rp bc-ps-r'>
				<img  class='bc-mg-r-15rp' src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
				<div class='right bc-flex bc-flex-d-c bc-flex-jc-sb'>
					<div>
						<div class='title bc-t-ellipsis bc-t-ellipsis-2 bc-f-16rp'>表额头</div>
						<span class='bc-f-12rp bc-t-666'>视频|		{{1548946491687 | timeFilter("Y-M-D h:min")}}</span>
					</div>
					<div class='bc-f-12rp bc-t-666'>
						<i class='iconfont iconrenci bc-f-10rp bc-t-666'></i>
						<span class='bc-mg-l-3rp bc-inline-block'>23230人观看</span>
					</div>
				</div>
				<!--直播-->
				<!--<div class='bc-ps-a remark'>-->
				<!--<span class='point'></span>-->
				<!--<span class='bc-mg-l-3rp bc-f-10rp'>直播</span>-->
				<!--</div>-->
				<!--预告-->
				<!--<div class='bc-ps-a remark'>-->
				<!--<i class='iconfont iconyugao bc-f-10rp'></i>-->
				<!--<span class='bc-mg-l-3rp bc-f-10rp'>预告</span>-->
				<!--</div>-->
				<!--回放-->
				<div class='bc-ps-a remark'>
					<i class='iconfont iconhuifang1 bc-f-10rp'></i>
					<span class='bc-mg-l-3rp bc-f-10rp'>回放</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props:{
			videoList:{
				default:[],
				type:Array
			}
		},
		data() {
			return {
			
			}
		},
		methods:{
			watch(){
				this.$router.push({path:'/grow/video/room'})
			}
		},
		mounted(){
		}
	}
</script>

<style lang='scss' scoped>
	.list{
		img{
			width: rem(120);
			height: rem(80);
		}
		.right{
			.title{
				font-weight: 500;
			}
		}
		.remark{
			top:rem(15);
			left:rem(5);
			background-color: rgba(0,0,0,.4);
			font-size: rem(9);
			padding: rem(3);
			color:#fff;
			.point{
				width: rem(6);
				height: rem(6);
				border-radius: 50%;
				display: inline-block;
				background-color: #FE6270;
			}
		}
	}
</style>

