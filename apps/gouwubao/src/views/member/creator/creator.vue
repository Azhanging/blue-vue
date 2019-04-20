<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'创客'}}"/>

		<!-- 办公室头部 -->
		<office-header :member-info="pageData.memberInfo" type="creator" class="bc-mg-b-10rp"/>

		<!-- 统计 -->
		<statistics  :textType='"content_one"' />

		<!-- 我的会员 -->
		<statistics-item class="bc-bd-b-e5e" v-show="spreadStatus" :options="{
	    title:{
	      name:'我的会员（位）',
	      url:`${$config.path.base}/member/my_member/details_member`
	    },
	    num: pageData.myMemberNum,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayMemberNum
	    },{
	      name:'昨日新增',
	      num: pageData.yesterdayMemberNum
	    }]
		}"/>

		<!-- 我的会员 -->
		<statistics-item class="bc-bd-b-e5e" v-show="!spreadStatus" :options="{
	    title:{
	      name:'我的会员（位）',
	      url:`${$config.path.base}/member/my_member/details_member`
	    },
	    num: pageData.myMemberNum,
	    otherNum:[{
	      name:'今日新增VIP',
	      num: pageData.todayVipNum
	    },{
	      name:'今日新增创客',
	      num: pageData.todayCreatorNum
	    }]
		}"/>

		<!-- 我的VIP -->
		<statistics-item class="bc-bd-b-e5e" v-show="spreadStatus" :options="{
	    title:{
	      name:'我的VIP（位）',
	      url:`${$config.path.base}/member/my_member/details_member`
	    },
	    num: pageData.myVipNum,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayVipNum
	    },{
	      name:'昨日新增',
	      num: pageData.yesterdayVipNum
	    }]
		}"/>

		<!-- 我的创客（位） -->
		<statistics-item class="bc-bd-b-e5e" v-show="spreadStatus" :options="{
	    title:{
	      name:'我的创客（位）',
	      url:`${$config.path.base}/member/my_member/details_member`
	    },
	    num: pageData.myCreatorNum,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayCreatorNum
	    },{
	      name:'昨日新增',
	      num: pageData.yesterdayCreatorNum
	    }]
		}"/>

		<!--辅导收益 -->
		<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'辅导收益',
	      url:`/member/creator/coach-income`
	    },
	    num: pageData.coachEarnings,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayCoachEarnings
	    },{
	      name:'昨日新增',
	      num: pageData.yesterdayCoachEarnings
	    }]
		}"/>

		<!--商城收益 -->
		<statistics-item :options="{
	    title:{
	      name:'商城收益',
	      url:`/member/creator/shop-income`
	    },
	    num: pageData.storeEarnings,
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.todayStoreEarnings
	    },{
	      name:'昨日新增',
	      num: pageData.yesterdayStoreEarnings
	    }],
	    bottomNum:{
	      name: '待结算收益：',
	      num: pageData.waitSettle,
	      url: '/member/creator/wait-settle',
	      urlName: '点击查看'
	    }
		}"/>

		<div class="bc-t-c bc-bg-white bc-t-base bc-pd-10rp bc-f-12rp" @click="spread">
			<a>{{ spreadStatus ? '收起' : '展开' }} <i class="icon" :class="[spreadStatus? 'icon-slide-up':'icon-slide-down']"></i></a>
		</div>

		<!-- 运营支持 -->
		<operation class="bc-mg-t-10rp"/>

		<!-- 我的工具 -->
		<tools type="creator"/>

		<!--<div class="recommend">
			<div class="recommend-title">每日推荐</div>
			<div class="recommend-banner">
				<router-link to="">
					<img src="http://image.dtb315.com/5217013.jpg"/>
				</router-link>
				<router-link to="">
					<img src="http://image.dtb315.com/5217013.jpg"/>
				</router-link>
			</div>

			<div class="recommend-list">
				<div class="recommend-list-item" v-for="i in 3">
					<div class="recommend-list-item-l">
						<router-link to="">
							<img src="https://image.dtb315.com/1478964.jpg">
						</router-link>
					</div>
					<div class="recommend-list-item-r">
						<router-link to="">
							<div class="recommend-list-item-r-name">
								谷丰一木 软抽面巾纸 谷丰一木
								软抽面巾纸
							</div>
							<div class="recommend-list-item-r-tkf">
								推广赚4.69元
							</div>
						</router-link>
						<div class="recommend-list-item-r-gd">
							<div class="recommend-list-item-r-gdprice">¥544</div>
							<div class="recommend-list-item-r-gdbtn">
								<button>素材</button>
								<button class="share-btn">分享</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>-->

		<template slot="other">
			<bv-layer :show-status="showLayerStatus" class="bc-t-c">
				<div class="bc-row creator-layer bc-t-c">
					<div class="bc-row bc-mg-b-16rp">
						<img :src="`${staticPath}/creator-layer-icon.png`" alt="" style="width:3.93333rem;">
					</div>
					<div class="bc-row bc-f-16rp bc-f-b">
						恭喜您成为创客
					</div>
					<div class="bc-row">
						点通宝免费赠送您一年VIP身份
					</div>
					<div class="bc-row bc-mg-t-19rp">
						<a href="javascript:;" class="bc-btn bc-btn-base bc-bd-radius-10 bc-w-40" @click="showLayerStatus = false">
							确定
						</a>
					</div>
				</div>
			</bv-layer>
		</template>

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

  export default {
    name: "creator",
    data() {
      return {
        spreadStatus: false,
        pageData: {},
        showLayerStatus: false
      }
    },
    created() {
      this.getData();
    },
    computed: {
      staticPath() {
        return `${this.$config.path.static}/img/member/creator`
      }
    },
    methods: {
      spread() {
        this.spreadStatus = !this.spreadStatus;
      },
      getData() {
        this.$axios.get('/member/creator/index').then((res) => {
          const { data } = res.data;
          this.pageData = data;
          //弹窗使用状态
          this.showLayerStatus = (data.become_creator == 1);
        });
      }
    },
    components: {
      OfficeHeader,
      Statistics,
      StatisticsItem,
      Operation,
      Tools
    }
  }
</script>

<style scoped lang="scss">
	.creator-layer {
		background-color: white;
		border-radius: 4px;
		padding: rem(15);
	}
</style>
