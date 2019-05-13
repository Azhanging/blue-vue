<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		<bv-header :header="{title:{value:'通宝收益'}}"/>
		<div class="earnings-box bc-t-333 bc-pd-15rp bc-mg-tb-10rp">
			<div class="bc-f-16rp">累计收益（通宝)</div>
			<div class="bc-f-30rp">8000.00</div>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
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
		name: "tb-earnings",
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
	.earnings-box{
		text-align: center;
		background: #fff;
	}
</style>