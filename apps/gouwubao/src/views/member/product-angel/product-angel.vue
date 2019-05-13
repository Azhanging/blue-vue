<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'产品天使办公室'}}"/>

		<div class="angel-header bc-flex">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp">
				<img v-if="angelData" :src="angelData.memberInfo.memberImg" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-30rp bc-f-b">
					产品天使
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co" v-if="angelData">
					产品数量：{{ angelData.goods.goods_count }}款
				</div>
			</div>
			<div class="angel-sm bc-mg-t-44rp bc-mg-b-44rp">
				<router-link to="">产品天使说明<i class="icon icon-right"></i></router-link>
			</div>
		</div>
		
		
		<div class="angel-statistical">
			资本统计
		</div>
		<statistics-item v-if="angelData" :options="{
	    title:{
	      name:'产品收益统计',
	      url:`/member/product-angel/product-income`
	    },
	    num: {name:'通宝',value: angelData.tbincome_count },
	    otherNum:[{
	      name:'今日新增',
	      num: angelData.tbincome_today_count
	    },{
	      name:'当月新增',
	      num: angelData.tbincome_month_count
	    }]
		}"/>
		
		<div class="angel-statistical">
			资产管理
		</div>
		<statistics-item v-if="angelData" :options="{
	    title:{
	      name:'产品推荐统计',
	      url:`/member/product-angel/product-statistics`
	    },
	    num: {name:'推广产品总数',value: angelData.goods.goods_count},
	    otherNum:[{
	      name:'A类产品',
	      num: angelData.goods.goods_list.A
	    },{
	      name:'B类产品',
	      num: angelData.goods.goods_list.D
	    }]
		}"/>

	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
  export default {
    name: "product-angel",
    data() {
      return {
	      angelData:'',
      }
    },
    created() {
    	this.getData();
    },
    computed: {
    },
    methods: {
	    getData() {
		    this.$axios.get('/member/office_product_angel/index').then((res) => {
			    const { data } = res.data;
			    this.angelData = data
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
</style>
