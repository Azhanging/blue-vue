<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>

		<div class="books-top">
			<div class="books-top-btn">
				<a @click='$router.back()'>
					<i class="iconfont iconxiangzuo"></i>
				</a>
			</div>
			<div class="books-top-box">
				<div class="books-top-box-l">
					<img src="https://image.dtb315.com/327000.jpg?val=Thumb">
				</div>
				<div class="books-top-box-r">
					<div class="books-top-box-r-title">健康驾照</div>
					<div class="books-top-box-r-desc">
						<div>
							篇数<br>
							<strong>4</strong>
						</div>
						<div>
							文章<br>
							<strong>100</strong>
						</div>
						<div>
							阅读<br>
							<strong>168</strong>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="books-lists">
			<router-link :to="`${currentFullPath}/chapter`" class="books-list-item" v-for="i in 4" :key="i">
				<div class="books-list-item-l">
					<h3><span>第一篇</span>观念</h3>
					<p><span>9</span>个章节</p>
				</div>
				<div class="books-list-item-r">
					<i class="iconfont iconyou"></i>
				</div>
			</router-link>

		</div>

	</bv-home-view>
</template>

<script>
	import router from '@router';
	export default {
		name: "books",
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
		}
	}
</script>

<style scoped lang="scss">
	h3,p{margin: 0;padding: 0;}
.books-top{
	background: url("http://pc.lifest.dtb315.com/static/img/grow/grow4@2x.png") no-repeat;
	background-size: 100% 100%;
	color: #fff;
	position: relative;
	.books-top-btn{
		position: absolute;
		left: rem(15);
		top:rem(15);
		z-index: 9;
	}
	.books-top-box{
		padding: rem(44) rem(15) 0;
		.books-top-box-l{
			position: absolute;
			left: rem(15);
			width: rem(80);
			height: rem(115);
			overflow: hidden;
			box-shadow: 0 1px rem(3) #ccc;
			img{
				width: 100%;
				min-height: 100%;
				vertical-align: top;
			}
		}
		.books-top-box-r{
			margin-left: rem(110);
			.books-top-box-r-title{
				font-size: rem(18);
			}
			.books-top-box-r-desc{
				display: flex;
				padding: rem(12) 0;
				font-size: rem(14);
				text-align: center;
				div{
					margin-right: rem(35);
					strong{
						font-size: rem(16);
						margin-top: rem(4);
						display: block;
					}
				}
			}
		}
	}
}

.books-lists{
	overflow: hidden;
	margin-top: rem(45);
	.books-list-item{
		background: #fff;
		border-left: rem(10) solid #CA9F75;
		display: flex;
		margin-bottom: rem(15);
		padding-left: rem(20);
		padding-right: rem(15);
		align-items: center;
		color: #666;
		.books-list-item-l{
			flex: 1;
			padding: rem(10) 0;
			h3{
				font-size: rem(16);
				color: #333;
				span{margin-right: rem(15);}
			}
			p{
				font-size: rem(12);
				color: #999;
				margin-top: rem(8);
			}
		}
		.books-list-item-r{

		}
	}
}
</style>
