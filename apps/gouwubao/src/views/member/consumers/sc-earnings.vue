<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		<!--商城收益-->
		<bv-header :header="{title:{value:'收入明细'}}"/>
		
		<div class="bc-flex bc-bg-white">
			<div class="bc-flex-1 sc-set">
				<select>
					<option>全部商城</option>
					<option>黄金商城</option>
					<option>白金商城</option>
					<option>创客商城</option>
				</select>
			</div>
			<div class="bc-flex-1 sc-set">
				<select>
					<option>全部级别</option>
					<option>一级</option>
					<option>二级</option>
				</select>
			</div>
		</div>
		
		<div class="bc-flex bc-bg-white bc-mg-t-10rp bc-t-c bc-pd-10rp">
			<div class="bc-flex-1 bc-bd-r-e5e">
				<div class="bc-t-999 bc-f-12rp">交易笔数</div>
				<div class="bc-t-333 bc-f-16">0笔</div>
			</div>
			<div class="bc-flex-1">
				<div class="bc-t-999 bc-f-12rp">合计收入</div>
				<div class="bc-t-333 bc-f-16">540元</div>
			</div>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-10rp">
			<flow-title :options="{
	      name:'收益明细'
			}"/>
			<order-item :item="i" type="tb-earnings" v-for="(i,index) in 4" :key="index" class="bc-bd-b-e5e"/>
		</div>
		
	</bv-home-view>
</template>

<script>
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';
	export default {
		name: "sc-earnings",
		components: {
			OrderItem,
			FlowTitle
		},
		computed: {},
		data() {
			return {}
		},
		methods: {},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
	.sc-set{
		text-align: center;
		select{
			height: rem(40);
			background: url(#{$base-static-path + '/img/member/consumers/xiala.png' }) center right no-repeat;
			background-size: rem(10);
			border: 0;
			padding-right: rem(10);
		}
	}
</style>