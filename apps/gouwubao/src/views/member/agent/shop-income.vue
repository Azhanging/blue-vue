<!-- 辅导收益 -->
<template>
	<bv-home-view :router-level="3" style="background-color: rgb(244,244,244);">
		<bv-header :header="{
	      title:{
	        value:'商城收益'
	      }
			}"/>

		<!-- 累计收益（通宝） -->
		<statistics-item v-if="pageData.revenue" :options="{
	    title:{
	      name:'累计收益（通宝）'
	    },
	    num: pageData.revenue.total,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.revenue.today_add_num
	    },{
	      name:'7天新增',
	      num: pageData.revenue.seven_add_num
	    }],
	    bottomNum:{
	      name: '可提现总额：',
	      num: pageData.available,
	      url: `${$config.path.base}/servers/money/tixian?currency=1 `,
	      urlName: '去提现'
	    }
		}"/>

		<!-- 累计订单量 -->
		<statistics-item v-if="pageData.order_sales" class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'累计订单量'
	    },
	    num: pageData.order_sales.order_total,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.order_sales.today_order_add_num
	    },{
	      name:'7天新增',
	      num: pageData.order_sales.seven_order_add_num
	    }]
		}"/>

		<!-- 累计销售额 -->
		<statistics-item v-if="pageData.order_sales" class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'累计销售额'
	    },
	    num: pageData.order_sales.sales_total,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.order_sales.today_sales_add_num
	    },{
	      name:'7天新增',
	      num: pageData.order_sales.seven_sales_add_num
	    }]
		}"/>

		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'商城收入明细',
	      url:`shop-income-detail`,
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
        this.$axios.get('/member/AreaApply/mall_revenue_count', {
          params: this.$route.params
        }).then((res) => {
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