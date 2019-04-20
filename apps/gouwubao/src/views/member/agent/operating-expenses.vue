<!-- 运营经费 -->
<template>
	<bv-home-view :router-level="3" style="background-color: rgb(244,244,244);">
		<bv-header :header="{
	      title:{
	        value:'运营经费'
	      }
			}"/>

		<!-- 累计收益（通宝） -->
		<statistics-item v-if="pageData.operating_expenses" :options="{
	    title:{
	      name:'累计运营经费'
	    },
	    num: pageData.operating_expenses.total,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.operating_expenses.today_area_expenses
	    },{
	      name:'7天新增',
	      num: pageData.operating_expenses.seven_area_expenses
	    }],
	    bottomNum:{
	      name: '可提现总额：',
	      num: pageData.operating_expenses.operating_expenses,
	      url: `${$config.path.base}/servers/money/tixian?currency=2`,
	      urlName: '去提现'
	    }
		}"/>

		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'运营收入明细',
	      url:`operating-expenses-detail`,
	      urlName:'查看全部'
			}"/>
			<order-item type="operating" :item="item" v-for="(item,index) in pageData.list" :key="index" class="bc-bd-b-e5e"/>
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
    name: "operating-expenses",
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
        this.$axios.get('/member/AreaApply/addup_operating_expenses', {
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