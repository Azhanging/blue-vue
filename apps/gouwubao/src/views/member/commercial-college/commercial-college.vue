<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header :header="{title:{value:'上大夫商学院办公室'}}"/>
		
		<div class="angel-header bc-flex bc-pd-b-15rp">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp" v-if="collegeData">
				<img :src="collegeData.memberInfo.info.logo_img" alt="" class="head-img">
			</div>
			<div class="bc-flex-3" v-if="collegeData">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-30rp bc-f-b">
					{{ collegeData.memberInfo.info.service_area_name }}
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					入驻日期：{{ collegeData.memberInfo.info.colse_st }}
				</div>
			</div>
		</div>
		
		
		<div class="angel-statistical">
			资本统计
		</div>
		<statistics-item v-if="collegeData" :options="{
	    title:{
	      name:'商学院收益统计',
	    },
	    num: {value: `${collegeData.memberInfo.count || 0}`},
	    otherNum:[{
	      name:'今日新增',
	      num: collegeData.memberInfo.tdcount
	    },{
	      name:'当月新增',
	      num: collegeData.memberInfo.monthcount
	    }]
		}"/>
		
		<div class="angel-statistical">
			资产管理
		</div>
		<div class="bc-bg-white bc-bd-b-e5e bc-pd-lr-20rp bc-pd-tb-10rp">
			<div class="bc-flex">
				<div class="bc-flex-1 bc-t-333 bc-f-16rp">当前服务区域</div>
				<div><router-link to="/member/commercial-college/returns-detailed" class="bc-t-999 bc-f-12rp">查询明细 &gt;</router-link></div>
			</div>
			<div class="bc-f-14rp bc-t-333" v-if="collegeData">
				<div class="bc-mg-t-5rp bc-t-999">省级区域数量:<span class="bc-t-333">共{{ collegeData.memberInfo.area_count }}个</span></div>
				<div class="bc-mg-t-5rp bc-t-999">省级区域名称:<span class="bc-t-333">{{ collegeData.memberInfo.area_names }}</span></div>
			</div>
		</div>
		
		<statistics-item class="bc-pd-t-10rp bc-bd-b-e5e" v-if="collegeData" v-for="(item,index) in collegeData.nowareaData" :options="{
	    title:{},
	    num: {name:`${item.name}累计收益`,value: `${item.count || '0.00' }` },
	    otherNum:[{
	      name:'今日新增',
	      num: `${item.tdcount || '0.00' }`
	    },{
	      name:'当月新增',
	      num: `${item.monthcount || '0.00' }`
	    }]
		}"/>
		
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	export default {
		name: "commercial-college",
		data() {
			return {
				collegeData:''
			}
		},
		created() {
			this.getData();
		},
		computed: {
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_business_school/index').then((res) => {
					const { data } = res.data;
					this.collegeData = data;
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
		padding: rem(15) rem(15);
		border-bottom: 1px solid #e5e5e5;
		margin-top: rem(10);
		font-size: rem(16);
		color: #333;
		font-weight: bold;
	}
</style>
