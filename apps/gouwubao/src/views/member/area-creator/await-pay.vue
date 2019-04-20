<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3' style='background: #f4f4f4'>
		
		<bv-header :header="{title:{value:'待结算收益'}}"/>
		
		<div class='bc-pd-15 bc-bg-white bc-mg-tb-10'>
			<div class='bc-t-c  bc-f-16rp'>累计收益（通宝）</div>
			<div class='bc-t-c  bc-f-24rp'>{{pageData.count || 0}}</div>
		</div>
		
		<!--待结算收益-->
		<!--<div class='bc-bg-white bc-mg-t-10rp'>-->
			<!--<div class='bc-pd-lr-10'>-->
				<!--<div class="bc-flex bc-flex-jc-sb bc-flex-ai-c bc-pd-tb-10">-->
					<!--<span class="bc-f-14rp bc-bd-l-base bc-bd-w-3 bc-pd-l-5">待结算收益</span>-->
					<!--&lt;!&ndash;<a class="bc-t-666 bc-f-12rp" href="{:U('store_income_detail')}">查看更多<span class="inline-block bd-666 bc-arrow bc-arrow-xsmall bc-arrow-r"></span></a>&ndash;&gt;-->
				<!--</div>-->
				<!--&lt;!&ndash;数据循环5条&ndash;&gt;-->
				<!--<OrderItem :item="item" v-for="(item,index) in pageData.list" type="order" :key="index"/>-->

			<!--</div>-->
		<!--</div>-->
		<!---->
		<div class="bc-row bc-bg-white bc-mg-t-15rp" v-if='pageData.list'>
			<flow-title :options="{
	      name:'商城收益明细',
	      // url:'/member/area-creator/store-income-detail',
	      // urlName:'查看全部'
			}"/>
			<OrderItem :item="item"    v-for="(item,index) in pageData.list" type="wait" :key="index"/>
	
		</div>
	
	
	</bv-home-view>
</template>

<script>
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';

	
	export default {
		name: "creator",
		data() {
			return {
				pageData: {},
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_president/getFlowing').then((res) => {
					this.pageData = res.data.data
				});
			}
		},
		components: {
			OrderItem,
			FlowTitle
		}
	}
</script>

<style scoped lang="scss">

</style>
