<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'服务商办公室'}}"/>

		<div class="angel-header bc-flex bc-flex-ai-c">
			<div class="bc-pd-r-15rp bc-mg-l-15rp" v-if="serviceData">
				<img :src="serviceData.head_img" alt="" class="head-img">
			</div>
			<div class="bc-flex-3 bc-pd-b-15rp bc-pd-r-15rp" v-if="serviceData">
				<div class="bc-f-18rp bc-mg-t-15rp bc-f-b">
					服务商
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					账户余额：{{ serviceData.money || '0.00' }}元
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					入驻时间：{{ serviceData.create_time }}
				</div>
			</div>
			<div class="angel-sm">
				<a @click="btn_toast">服务商说明<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		
		<div class="angel-statistical">
			资本统计
		</div>
		<statistics-item v-if="serviceData" class="bc-bd-b-e5e bc-pd-t-10rp" :options="{
	    title:{
	    },
	    num: {name:'门店访问人数(人)',value:serviceData.view},
	    otherNum:[],
	    cartogram:true
		}"/>
		<statistics-item v-if="serviceData" class="bc-bd-b-e5e bc-pd-t-10rp" :options="{
	    title:{
	    },
	    num: {name:'服务销售额(元)',value: serviceData.total},
	    otherNum:[{
	      name:'今日新增',
	      num: serviceData.total_today
	    },{
	      name:'当月新增',
	      num: serviceData.total_month
	    }]
		}"/>
		<statistics-item v-if="serviceData" class="bc-bd-b-e5e bc-pd-t-10rp" :options="{
	    title:{
	    },
	    num: {name:'服务销售量',value: serviceData.nums},
	    otherNum:[{
	      name:'今日新增',
	      num: serviceData.nums_today
	    },{
	      name:'当月新增',
	      num: serviceData.nums_month
	    }]
		}"/>
		<statistics-item v-if="serviceData" class="bc-bd-b-e5e bc-pd-t-10rp" :options="{
	    title:{
	    },
	    num: {name:'服务使用量',value: serviceData.use },
	    otherNum:[{
	      name:'今日新增',
	      num: serviceData.use_today
	    },{
	      name:'当月新增',
	      num: serviceData.use_month
	    }]
		}"/>
		
		<StatisticsItem2 v-if="serviceData" :options="{
	    title:{
	      name:'活动数据统计',
	    },
	    otherNum:[{
	      name:'未付款',
	      num: serviceData.no_pay
	    },{
	      name:'未消费',
	      num: serviceData.not_use
	    },{
	      name:'即将到期',
	      num: serviceData.will_lost
	    },{
	      name:'已使用',
	      num: serviceData.use
	    }]
		}"/>
		
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	import StatisticsItem2 from '../components/statistics-item2';
	
	import { $toast } from "$use-in-vue/mint-ui/toast";
  export default {
    name: "product-angel",
    data() {
      return {
	      serviceData:''
      }
    },
    created() {
    	this.getData();
    },
    computed: {
    },
    methods: {
	    getData() {
		    this.$axios.get('/member/office_server/index').then((res) => {
			    const { data } = res;
			    this.serviceData = data;
		    });
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
		.head-img {
			width: rem(60);
			height: rem(60);
			border-radius: 50%;
			vertical-align: top;
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
</style>
