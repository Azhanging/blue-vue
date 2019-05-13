<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'消费商办公室'}}"/>

		<div class="angel-header bc-flex">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp">
				<img src="https://image.dtb315.com/328890.jpg?val=Thumb" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-30rp bc-f-b">
					用户昵称
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					注册日期：2015-08-31
				</div>
			</div>
			<div class="angel-sm bc-mg-t-44rp bc-mg-b-44rp">
				<router-link to="">消费商说明<i class="icon icon-right"></i></router-link>
			</div>
		</div>
		
		
		<div class="angel-statistical">
			资产管理
		</div>
		<statistics-item :options="{
	    title:{
	      name:'直邀会员',
	      url:`/member/consumers/invitation-vip`
	    },
	    num: {name:'通宝',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
		
		<div class="angel-statistical">
			资本统计
		</div>
		<statistics-item :options="{
	    title:{
	      name:'福利收益',
	      url:`/member/consumers/earnings`
	    },
	    num: {name:'积分',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
		<statistics-item :options="{
	    title:{
	    },
	    num: {name:'种子',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
		<statistics-item :options="{
	    title:{
	    },
	    num: {name:'公益基金',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
		<div class="view-more">
			<router-link to="/member/consumers/history">查看历史数据&gt;&gt;</router-link>
		</div>
		
		<div class="angel-statistical">
			购物宝商城产品
		</div>
		<statistics-item class="bc-pd-t-10rp" :options="{
	    title:{
	    },
	    num: {name:'产品总数',value:1,prompt:true},
	    otherNum:[{
	      name:'3A类',
	      num: 2
	    },{
	      name:'A类',
	      num: 3
	    },{
	      name:'B类',
	      num: 2
	    },{
	      name:'C类',
	      num: 3
	    }]
		}"/>
		
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
  export default {
    name: "consumers",
    data() {
      return {
	      memberInfo:''
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
			    /*const { data } = res.data;
			    this.memberInfo = data.memberInfo;*/
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
		background: #F1DFB6 url($base-static-path + '/img/member/creator/header-bg.png') right bottom no-repeat;
		background-size: auto 100%;
		position: relative;
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
		padding: rem(15) rem(20);
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
		a{
			color: #A86F2F;
		}
	}
</style>
