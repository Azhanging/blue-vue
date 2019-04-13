<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "评论消息"
            }
        }'

		>
		</w-home-header>

		<div class="message-list">
			<router-link class="list-item" to="">
				<div class="list-item-img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="list-item-desc">
					<div class="list-item-desc-top">
						<div class="list-item-desc-top-l"><span>某某</span> 回复了你</div>
						<div class="list-item-desc-top-r">互动提醒</div>
					</div>
					<div class="list-item-desc-time">
						2019-04-13 15:17
					</div>
				</div>
			</router-link>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "message-comment"
	}
</script>

<style scoped lang="scss">
.message-list{
	overflow: hidden;
	.list-item{
		display: block;
		display: flex;
		background: #fff;
		overflow: hidden;
		margin-top: rem(10);
		padding: rem(15);
		.list-item-img{
			width: rem(40);
			height: rem(40);
			border-radius: 100%;
			overflow: hidden;
			margin-right: rem(10);
			img{width: 100%;vertical-align: top;}
		}
		.list-item-desc{
			flex: 1;
			.list-item-desc-top{
				font-size: rem(14);
				color: #999;
				display: flex;
				.list-item-desc-top-l{
					flex: 1;
					font-size: rem(14);
					color: #666;
					span{color: #333;}
				}
				.list-item-desc-top-r{
					color: #999;
				}
			}
			.list-item-desc-time{
				color: #999;
				font-size: rem(12);
				margin-top: rem(4);
			}
		}
	}
}
</style>
