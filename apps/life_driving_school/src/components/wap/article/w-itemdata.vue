<template>
	<div class='bc-flex'>
		<!--智慧导航-驾照课程列表显示 top-->
		<i class="driving-radio iconfont iconxuanzhong" v-if="itemList.license"></i>
		<!--智慧导航-驾照课程列表显示 end-->

		<img class='left_img' :src='itemList.src_img' alt=''>
		<div class='bc-flex-1 bc-mg-l-10rp bc-flex bc-flex-jc-sb bc-flex-d-c'>
			<div>
				<span class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-15rp'>{{itemList.name}}</span>
				<div class='t-888 bc-t-ellipsis bc-t-ellipsis-2  bc-f-12rp'>{{itemList.sub_content}}</div>
			</div>
			<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-t-10rp bc-t-999'>
				<div class='action bc-flex bc-f-12rp'>
					<i class='iconfont iconeye- bc-f-12rp'></i><span>&nbsp;{{itemList.click_num}}</span>
				</div>
				<div class='bc-f-12rp t-888'>
					<!--{{itemList.update_time | timeFilter("Y-M-D")}}-->
					{{itemList.create_time }}
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
			},
			ifAchieve:{
				type:String,
				default:false
			},
			id:{
				type:Number,
				default:-1
			}
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
	.bc-flex{
		position: relative;
		.driving-radio{
			position: absolute;
			left: rem(5);
			top: rem(3);
			color: #1abc9c;
		}
	}
</style>
