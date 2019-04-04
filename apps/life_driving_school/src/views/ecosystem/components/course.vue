<template>
	<div class="expense-l-box">
		<div class="expense-icon">
			<div>
				<span><i class="iconfont icongeren"></i></span>
				<p>消费者</p>
			</div>
			<div>
				<span><i class="iconfont icondianping"></i></span>
				<p>点评天使</p>
			</div>
			<div>
				<span><i class="iconfont iconhuiyuan"></i></span>
				<p>vip会员</p>
			</div>
		</div>
		<div class="expense-list">
			<w-arrlist></w-arrlist>
			<!--<itemList></itemList>-->
		</div>

	</div>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import WArrlist from '@components/wap/article/w-arrlist'
	export default {
		name: "course",
		components: {
			'w-arrlist': WArrlist
		},
		data() {
			return {
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.expense-icon {
		display: flex;
		margin: 0 rem(15) rem(10);

		div {
			flex: 1;
			text-align: center;
			span{
				display: block;
				margin: 0 auto;
				width: rem(33);
				height: rem(33);
				line-height: rem(33);
				border: 1px solid #CA9F75;
				color: #CA9F75;
				align-items: center;
				text-align: center;
				border-radius: 100%;
			}
			p {
				color: #333;
				font-size: rem(12);
				margin-top: 7px;
			}
		}
	}
</style>
