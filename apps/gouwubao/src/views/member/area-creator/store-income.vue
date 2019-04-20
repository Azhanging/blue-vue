<!-- 辅导收益 -->
<template>
	<bv-home-view :router-level="3" style="background-color: rgb(244,244,244);">
		<bv-header :header="{
	      title:{
	        value:'商城收益'
	      }
			}"/>
		
		<!-- 累计收益（通宝） -->
		<statistics-item :options="{
	    title:{
	      name:'累计收益（通宝）'
	    },
	    num: pageData.totalNum,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.totalNumServenday
	    },{
	      name:'7天新增',
	      num: pageData.totalNumToday
	    }]
		}"/>
		
		<!-- 累计订单量 -->
		<statistics-item class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'累计订单量'
	    },
	    num: pageData.orderNum,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.orderNumToday,
	    },{
	      name:'7天新增',
	      num: pageData.orderNumServenday
	    }]
		}"/>
		
		<!-- 累计销售额 -->
		<statistics-item class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'累计销售额'
	    },
	    num: pageData.salesVolume,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.salesVolumeToday
	    },{
	      name:'7天新增',
	      num: pageData.salesVolumeServen
	    }]
		}"/>
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp" v-if='pageData.flowing'>
			<flow-title :options="{
	      name:'商城收益明细',
	      url:'/member/area-creator/store-income-detail',
	      urlName:'查看全部'
			}"/>
			<order-item type="order"  :item="item" v-for="(item,index) in pageData.flowing" :key="index" class="bc-bd-b-e5e"/>
		</div>
	
	</bv-home-view>
</template>

<script>

	//统计的item
	import StatisticsItem from '../components/statistics-item';
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';

	export default {
		name: "shop-income",
		data() {
			return {
				pageData: {}
			};
		},
		components: {
			StatisticsItem,
			OrderItem,
			FlowTitle
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_president/store_income').then((res) => {
					this.pageData = res.data.data;
				});
			}
		},
		created() {
			this.getData();
		}
	}
</script>