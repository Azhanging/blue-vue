<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'消费商办公室'}}"/>

		<div class="angel-header bc-flex bc-flex-ai-c" v-if="consumersData">
			<div class="bc-pd-r-15rp bc-mg-l-15rp">
				<img :src="consumersData.memberImg" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-f-b">
					{{ consumersData.nickname }}
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					注册日期：{{ consumersData.register }}
				</div>
			</div>
			<div class="angel-sm bc-mg-t-44rp bc-mg-b-44rp">
				<a @click="btn_toast">消费商说明<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		
		<div class="angel-statistical">
			资产管理
		</div>
		<!--/*`/member/consumers/invitation-vip`*/-->
		<statistics-item v-if="consumersData" :options="{
	    title:{
	      name:'直邀会员',
	      url: `${config.path.base}/member/my_member/details_member?type=1`,
	      urlName:'查询明细>'
	    },
	    num: {value:consumersData.xf.all},
	    otherNum:[{
	      name:'今日新增',
	      num: consumersData.xf.today
	    },{
	      name:'当月新增',
	      num: consumersData.xf.month
	    }]
		}"/>
		
		<div class="angel-statistical">
			资本统计
		</div>
		<template v-if="consumersData">
			<statistics-item :options="{
	    title:{
	      name:'福利收益',
	      url:`/member/consumers/earnings`,
	      urlName:'查询明细>'
	    },
	    num: {name:'积分',value:consumersData.lpjf},
	    otherNum:[{
	      name:'今日新增',
	      num: consumersData.today_lpjf
	    },{
	      name:'当月新增',
	      num: consumersData.month_lpjf
	    }]
		}"/>
			<statistics-item :options="{
	    title:{
	    },
	    num: {name:'种子',value:consumersData.fljf},
	    otherNum:[{
	      name:'今日新增',
	      num: consumersData.today_fljf
	    },{
	      name:'当月新增',
	      num: consumersData.month_fljf
	    }]
		}"/>
			<statistics-item :options="{
	    title:{
	    },
	    num: {name:'公益基金',value:consumersData.seed},
	    otherNum:[{
	      name:'今日新增',
	      num: consumersData.today_seed
	    },{
	      name:'当月新增',
	      num: consumersData.month_seed
	    }]
		}"/>
		</template>
		<div class="view-more">
			<router-link to="/member/consumers/history">查看历史数据&gt;&gt;</router-link>
		</div>
		
		<div class="angel-statistical">
			购物宝商城产品
		</div>
		<statistics-item v-if="consumersData" class="bc-pd-t-10rp" :options="{
	    title:{
	    },
	    num: {name:'产品总数',value:consumersData.count,prompt:true},
	    otherNum:[{
	      name:'3A类',
	      num: `${consumersData.product['3a']}`
	    },{
	      name:'A类',
	      num: consumersData.product.a
	    },{
	      name:'B类',
	      num: consumersData.product.b
	    },{
	      name:'C类',
	      num: consumersData.product.c
	    }]
		}"/>
		
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	
	import { $toast } from "$use-in-vue/mint-ui/toast";
  export default {
    name: "consumers",
    data() {
      return {
	      consumersData:''
      }
    },
    created() {
    	this.getData();
    },
    computed: {
    },
    methods: {
	    getData() {
		    this.$axios.get('/member/office_prosumer/index').then((res) => {
			    const { data } = res;
			    this.consumersData = data;
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
	    StatisticsItem
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
	.view-more{
		padding: rem(10);
		text-align: center;
		background: #fff;
		font-size: rem(12);
		a{
			color: #DCB46E;
		}
	}
</style>
