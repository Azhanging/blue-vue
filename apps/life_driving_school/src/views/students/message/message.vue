<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "我的消息"
            }
        }'

		>
		</w-home-header>

		<div class="message-box">
			<div class="message-item">
				<div class="message-item-img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="message-item-r">
					<div class="message-item-r-top">
						<div class="message-item-r-top-l">评论</div>
						<div class="message-item-r-top-r">1天前</div>
					</div>
					<div class="message-item-r-hf">
						<span>菩提花开</span> 回复了您
					</div>
				</div>
			</div>

			<div class="message-item">
				<div class="message-item-img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="message-item-r">
					<div class="message-item-r-top">
						<div class="message-item-r-top-l">点赞</div>
						<div class="message-item-r-top-r">2019-03-26</div>
					</div>
					<div class="message-item-r-hf">
						<span>菩提花开</span> 赞了你的评论
					</div>
				</div>
			</div>

			<div class="message-item">
				<div class="message-item-img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="message-item-r">
					<div class="message-item-r-top">
						<div class="message-item-r-top-l">站内信</div>
						<div class="message-item-r-top-r">2019-03-26</div>
					</div>
					<div class="message-item-r-hf">
						尊敬的生命驾校教练你好尊敬的生命驾校教练你
						好尊敬的生命驾校教练你好尊敬的生命驾校教练
						你好尊敬的生命驾校教练你好。
					</div>
				</div>
			</div>

			<div class="message-item">
				<div class="message-item-img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="message-item-r">
					<div class="message-item-r-top">
						<div class="message-item-r-top-l">更新公告</div>
						<div class="message-item-r-top-r">2019-03-26</div>
					</div>
					<div class="message-item-r-hf">
						尊敬的生命驾校教练你好尊敬的生命驾校教练你
						好尊敬的生命驾校教练你好尊敬的生命驾校教练
						你好尊敬的生命驾校教练你好。
					</div>
				</div>
			</div>

		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "message"
	}
</script>

<style scoped lang="scss">
.message-box{
	background: #fff;
	.message-item{
		padding: 0 rem(15);
		display: flex;
		.message-item-img{
			width: rem(40);
			height: rem(40);
			border-radius: 100%;
			overflow: hidden;
			margin-right: rem(10);
			margin-top: rem(15);
			img{width: 100%;vertical-align: top;}
		}
		.message-item-r{
			flex: 1;
			border-bottom: 1px solid #e5e5e5;
			padding: rem(15) 0;
			.message-item-r-top{
				font-size: rem(14);
				color: #999;
				display: flex;
				.message-item-r-top-l{
					flex: 1;
				}
				.message-item-r-top-r{
					margin-left: rem(20);
				}
			}
			.message-item-r-hf{
				font-size: rem(14);
				color: #666;
				margin-top: rem(5);
				span{
					color: #46505A;
					margin-right: rem(10);
				}
			}
		}
	}
}
</style>
