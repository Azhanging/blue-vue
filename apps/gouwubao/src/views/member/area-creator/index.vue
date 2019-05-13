<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2' v-if='resData'>
		
		<bv-header :header="{title:{value:resData.level + '办公室'}}"/>
		
		<!--办公室个人信息,样式1-->
		<officePersonal :personalData='resData' :type='1'></officePersonal>
		
		<!-- 统计 -->
		<statistics :textType='"content_two"' />
		
		<!-- 渠道会员 -->
		<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'渠道会员（位）',
	      url:`${config.path.base}/member/office_president/details_member.html`
	    },
	    num: {value:resData.ChannelMemberCount},
	    otherNum:[{
	      name:'今日新增',
	      num: resData.ChannelMemberCountToday
	    },{
	      name:'昨日新增',
	      num: resData.ChannelMemberCountYestoday
	    }]
		}"/>
		
		
		<!--商城收益 -->
		<statistics-item :options="{
	    title:{
	      name:'商城收益',
	      url:`/member/area-creator/store-income`
	    },
	    num: {value:resData.ShopTb},
	    otherNum:[{
	      name:'今日新增',
	      num: resData.ShopTbToday
	    },{
	      name:'昨日新增',
	      num: resData.ShopTbYestoday
	    }],
	    bottomNum:{
	      name: '待结算收益：',
	      num: resData.advanceCollection,
	      url: '/member/area-creator/await-pay',
	      urlName: '点击查看'
	    }
		}"/>
		
		<div class='bc-t-c bc-mg-t-20 bc-pd-b-15 bc-bd-b-e5e' >
			<router-link to='/member/area-creator/history-data' style='color: #C4962E;'>查看历史数据>></router-link>
		</div>
		
		
		<!--<div class="bc-t-c bc-bg-white bc-t-base bc-pd-10rp bc-f-12rp" @click="spread">-->
			<!--<a>{{ spreadStatus ? '收起' : '展开' }} <i class="icon" :class="[spreadStatus? 'icon-slide-up':'icon-slide-down']"></i></a>-->
		<!--</div>-->
		
	<div class='bc-pd-lr-10' v-if='resData.product'>
		<div class='bc-pd-tb-15 bc-bd-b-e5e'>
			<div class='bc-flex bc-flex-jc-sb bc-flex-ai-c'>
				<span class='bc-f-15rp'>购物宝商品产品</span><span class='bc-t-999 bc-f-12rp'>总计：{{resData.count || 0}}款</span>
			</div>
			<div class='bc-t-999'><span>说明</span>3A属标签，不列入产品总数统计<span></span></div>
		</div>
		
		<div class='bc-pd-tb-15'>
			<div class='bc-flex bc-flex-jc-sb bc-mg-b-10'><span class='bc-f-14rp'>3A类</span><span class='bc-t-999'>{{resData.product['3a'] || 0}}款</span></div>
			<div class='bc-flex bc-flex-jc-sb bc-mg-b-10'><span class='bc-f-14rp'>A类</span><span class='bc-t-999'>{{resData.product.a || 0}}款</span></div>
			<div class='bc-flex bc-flex-jc-sb bc-mg-b-10'><span class='bc-f-14rp'>B类</span><span class='bc-t-999'>{{resData.product.b || 0}}款</span></div>
			<div class='bc-flex bc-flex-jc-sb bc-mg-b-10'><span class='bc-f-14rp'>C类</span><span class='bc-t-999'>{{resData.product.c || 0}}款</span></div>
		</div>
	</div>

	
	</bv-home-view>
</template>

<script>
	//办公室头部
	import OfficeHeader from '../components/office-header';
	//统计
	import Statistics from '../components/statistics';
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	//营业支持
	import Operation from '../components/operation';
	//我的工具
	import Tools from '../components/tools';
	// 办公室头部个人信息
	import officePersonal from '../components/office-personal-header';



	export default {
		name: "creator",
		data() {
			return {
				resData:{}
			}
		},
		mounted(){
			this.getData()
		},
		// computed: {
		// 	staticPath() {
		// 		return `${this.config.path.static}/img/member/creator`
		// 	}
		// },
		methods: {
			getData() {
				this.$axios.get('/member/office_president/phone_index').then((res) => {
					this.resData = res.data.data
				});
			}
		},
		components: {
			OfficeHeader,
			Statistics,
			StatisticsItem,
			Operation,
			Tools,
			officePersonal
		}
	}
</script>

<style scoped lang="scss">
	.creator-layer {
		background-color: white;
		border-radius: 4px;
		padding: rem(15);
	}
	
	.t-C4962E{
		color:#C4962E
	}
	.fweight{
		font-weight: 500;
	}
	.selfMsg{
		background: url(#{$base-static-path + "/img/member/area-creator/bg.png"}) no-repeat 0 0 / 100% 100%;
	}
	
	
	// 进度条
	.percent-bar{
		position: relative;
		.percent-bar-bg{
			height: 10px;
			border-radius: 20px;
		}
		.percent-bar-val{
			height: 10px;
			border-radius: 20px;
			position: absolute;
			left: 0px;
			top: 0px;
		}
	}
</style>
