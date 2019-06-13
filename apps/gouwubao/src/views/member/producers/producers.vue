<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'生产商办公室'}}"/>

		<div class="angel-header bc-flex bc-flex-ai-c" v-if="producerData">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp">
				<img :src="producerData.head_img" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-15rp bc-f-b">
					生产商
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					通宝余额：{{ producerData.available || 0 }}元
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					碳积分余额：{{ producerData.carbon || 0 }}元
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					德宝余额：{{ producerData.debao || 0 }}
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					入驻时间：{{ producerData.create_time || '0000.00.00' }}
				</div>
			</div>
			<div class="angel-sm bc-mg-t-10rp">
				<a @click="btn_toast">生产商说明<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		<div class="angel-statistical item-stattit">
			订单管理
			<a @click="to_order()" class="bc-fl-r bc-t-999 bc-f-12rp item-more">更多&gt;</a>
		</div>
		<StatisticsItem2 v-if="producerData" class="item-box" :options="{
	    otherNum:[{
	      name:'待付款',
	      num: producerData.dfk
	    },{
	      name:'已发货',
	      num: producerData.dqr
	    },{
	      name:'待发货',
	      num: producerData.dfh
	    },{
	      name:'退款中',
	      num: producerData.th
	    }]
		}"/>
		
		
		<div class="angel-statistical">
			产品销售统计<router-link to="/member/producers/returns-detailed" class="bc-fl-r bc-t-999 bc-f-12rp item-more">查询明细&gt;</router-link>
		</div>
		<statistics-item v-if="producerData" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'销售量',
	    },
	    num: {value:producerData.sales_all.num},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.sales.num
	    },{
	      name:'当月新增',
	      num: producerData.sales_month.num
	    }]
		}"/>
		<statistics-item v-if="producerData" :options="{
	    title:{
	      name:'销售额',
	    },
	    num: {value:producerData.sales_all.money_count},
	    otherNum:[{
	      name:'今日新增',
	      num: `${producerData.sales.money_count}`
	    },{
	      name:'当月新增',
	      num: `${producerData.sales_month.money_count}`
	    }]
		}"/>
		
		<div class="angel-statistical">
			产品管理
		</div>
		<statistics-item v-if="producerData" class="bc-pd-t-15rp" :options="{
	    title:{
	    },
	    num: {zsName:'总数',value:producerData.goodCount},
	    otherNum:[{
	      name:'销售中',
	      num: producerData.xsz
	    },{
	      name:'待审核',
	      num: producerData.dsh
	    },{
	      name:'已售罄',
	      num: producerData.ysq
	    },{
	      name:'已下架',
	      num: producerData.yxj
	    }]
		}"/>
		
		<div class="angel-statistical">
			产品评论统计<a @click="to_comment()" class="bc-fl-r bc-t-999 bc-f-12rp item-more">查询明细&gt;</a>
		</div>
		<template v-if="producerData">
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'首评'
	    },
	    num: {value:producerData.shouping},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.dangri_shouping
	    },{
	      name:'当月新增',
	      num: producerData.month_shouping
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'追评'
	    },
	    num: {value:producerData.zhuiping},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.dangri_zhuiping
	    },{
	      name:'当月新增',
	      num: producerData.month_zhuiping
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'有图'
	    },
	    num: {value:producerData.youtu},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.dangri_youtu
	    },{
	      name:'当月新增',
	      num: producerData.month_youtu
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'负面评论'
	    },
	    num: {value:producerData.fumian},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.dangri_fumian
	    },{
	      name:'当月新增',
	      num: producerData.month_fumian
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'商户回复'
	    },
	    num: {value:producerData.huifu},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.dangri_huifu
	    },{
	      name:'当月新增',
	      num: producerData.month_huifu
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'待回复'
	    },
	    num: {value:producerData.daihuifu},
	    otherNum:[{
	      name:'今日新增',
	      num: producerData.dangri_daihuifu
	    },{
	      name:'当月新增',
	      num: producerData.month_daihuifu
	    }]
		}"/>
		</template>
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	import StatisticsItem2 from '../components/statistics-item2';
	import ProgramUrl from '@config/program-url'
	import { $toast } from "$use-in-vue/mint-ui/toast";
  export default {
    name: "producers",
    data() {
      return {
	      producerData:''
      }
    },
    created() {
    	this.getData();
    },
    computed: {
    },
    methods: {
	    getData() {
		    this.$axios.get('/member/office_producer/index').then((res) => {
			    const { data } = res;
			    this.producerData = data;
		    });
	    },
	    to_order(){
	    	location.href = `${ProgramUrl['gou-wu-bao']}/seller/order/index.html`
	    },
	    to_comment(){
		    location.href = `${ProgramUrl['gou-wu-bao']}/member/office_producer/comment_manage.html`
	    },
	    btn_toast(){
		    $toast({
			    message: '敬请期待',
			    duration: 3000
		    });
	    }
    },
    components: {
	    StatisticsItem,
	    StatisticsItem2
    }
  }
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
	.angel-header {
		background: #F1DFB6 url($base-static-path + '/img/member/public/bgstop-bg.jpg') right bottom no-repeat;
		background-size: auto 100%;
		position: relative;
		padding-bottom: rem(15);
		.head-img {
			width: rem(60);
			height: rem(60);
			border-radius: 50%;
		}
		.angel-sm{
			background: #000;
			border-top-left-radius: rem(15);
			border-bottom-left-radius: rem(15);
			overflow: hidden;
			position: absolute;
			right: 0;
			a{
				height: rem(28);
				line-height: rem(28);
				padding: 0 rem(10);
				color: #fff;
			}
		}
		.angel-co{
			color: #A86F2F;
		}
	}
	.angel-statistical{
		background: #fff;
		padding: rem(15) rem(15);
		border-bottom: 1px solid #e5e5e5;
		margin-top: rem(10);
		font-size: rem(16);
		color: #333;
		font-weight: bold;
	}
	.item-stattit{
		border-bottom: 0;
	}
	.item-box{
		margin-top: 0;
		padding-top: rem(10);
	}
	.item-more{
		font-weight: normal;
		margin-top: rem(5);
	}
</style>
