<!-- 辅导收益 -->
<template>
	<bv-home-view :router-level="3" style="background-color: rgb(244,244,244);">
		<bv-header :header="{
	      title:{
	        value:'辅导收益'
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
	      num: pageData.todayGrandTotal
	    }]
		}"/>

		<!-- 辅导VIP收益 -->
		<statistics-item class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'辅导VIP收益'
	    },
	    num: pageData.grandVip,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayGrandVip
	    },{
	      name:'7天新增',
	      num: pageData.sevenDayGrandVip
	    }]
		}"/>

		<!-- 辅导创客收益 -->
		<statistics-item class="bc-bd-t-e5e" :options="{
	    title:{
	      name:'辅导创客收益'
	    },
	    num: pageData.grandCreator,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayGrandCreator
	    },{
	      name:'7天新增',
	      num: pageData.sevenDayCreator
	    }]
		}"/>

		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'辅导收益明细',
	      url:'/member/creator/coach-income-detail',
	      urlName:'查看全部'
			}"/>
			<order-item :item="item" type="coach" v-for="(item,index) in pageData.list" :key="index" class="bc-bd-b-e5e"/>
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
    name: "coach-income",
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
        this.$axios.get('/member/creator/coach_earnings').then((res) => {
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