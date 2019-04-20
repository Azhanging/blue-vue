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
	    num: pageData.grandTotal,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayGrandTotal
	    },{
	      name:'7天新增',
	      num: pageData.sevenDayGrandTotal
	    }]
		}"/>

		<!-- 累计订单量 -->
		<statistics-item class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'累计订单量'
	    },
	    num: pageData.orderTotal,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayOrderTotal
	    },{
	      name:'7天新增',
	      num: pageData.sevenDayOrderTotal
	    }]
		}"/>

		<!-- 累计销售额 -->
		<statistics-item class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'累计销售额'
	    },
	    num: pageData.saleroomTotal,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todaySaleroomTotal
	    },{
	      name:'7天新增',
	      num: pageData.sevenSaleroomTotal
	    }]
		}"/>

		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'商城收益明细',
	      url:'/member/creator/shop-income-detail',
	      urlName:'查看全部'
			}"/>
			<order-item type="order" :item="item" v-for="(item,index) in pageData.list" :key="index" class="bc-bd-b-e5e"/>
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
        this.$axios.get('/member/creator/store_earnings').then((res) => {
          const { data } = res.data;
          this.pageData = data;
        });
      }
    },
    created() {
      this.getData();
    }
  }
</script>