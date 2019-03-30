<template>
	<div class="expense_l_box">
		<div class="expense_icon">
			<div>
				<i class="iconfont"></i>
				<p>消费者</p>
			</div>
			<div>
				<i class="iconfont"></i>
				<p>点评天使</p>
			</div>
			<div>
				<i class="iconfont"></i>
				<p>vip会员</p>
			</div>
		</div>
		<div class="expense_list">
			<itemList v-for="item in list" :itemL="item"></itemList>
		</div>
	</div>
</template>

<script>
	import router from '@router';
	import itemList from '../../components/list';

	export default {
		name: "course",
		components: {
			itemList
		},
		data() {
			return {
				list: [1, 2, 3]
			}
		},
		methods: {}
	}
</script>

<style scoped lang="scss">
	.expense_icon {
		display: flex;
		margin: 0 15px 20px;

		div {
			flex: 1;
			text-align: center;

			p {
				color: #333;
				font-size: 12px;
				margin-top: 7px;
			}
		}
	}
</style>