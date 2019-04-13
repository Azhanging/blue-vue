<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "站内信"
            }
        }'

		>
		</w-home-header>
		<div class="message-list-on">
			<router-link class="liston-item" to="">
				<div class="item-name">
					标题标题标题标题标题标题标题标题
				</div>
				<div class="item-content">
					内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
				</div>
				<div class="item-time">
					2019-04-13 15:32
				</div>
			</router-link>
		</div>
	</bv-home-view>
</template>

<script>
	export default {
		name: "message-station"
	}
</script>

<style scoped lang="scss">
	.message-list-on{
		overflow: hidden;
		.liston-item{
			background: #fff;
			display: block;
			margin-top: rem(10);
			overflow: hidden;
			padding: rem(10) rem(15);
			font-size: rem(12);
			.item-name{
				color: #333;
				font-size: rem(14);
			}
			.item-content{color: #666;margin: rem(5) 0}
			.item-time{color: #666;}
		}
	}
</style>
