<template>
	<div class="expense-l-box">
		<div v-if="dataicon.length>0">
			<!--消费-->
			<div class="expense-icon" v-if="$route.params.ecosystem_id==dataicon[0].id">
				<div @click="btn_ifshowWin(0)">
					<img :src="`${config.path.static}/img/ecosystem/dpts.png`">
					<p>点评天使</p>
				</div>
				<div @click="btn_ifshowWin(1)">
					<img :src="`${config.path.static}/img/ecosystem/VIP.png`">
					<p>vip会员</p>
				</div>
			</div>
			<!--投资-->
			<div class="expense-icon" v-if="$route.params.ecosystem_id==dataicon[1].id">
				<div @click="btn_ifshowWin(2)">
					<img :src="`${config.path.static}/img/ecosystem/dpts.png`">
					<p>校董</p>
				</div>
				<div @click="btn_ifshowWin(3)">
					<img :src="`${config.path.static}/img/ecosystem/xmjz.png`">
					<p>项目金主</p>
				</div>
			</div>
			<!--创业-->
			<div class="expense-icon" v-if="$route.params.ecosystem_id==dataicon[2].id">
				<div @click="btn_ifshowWin(4)">
					<img :src="`${config.path.static}/img/ecosystem/ck.png`">
					<p>创客</p>
				</div>
			</div>
			<!--企业-->
			<div class="expense-icon" v-if="$route.params.ecosystem_id==dataicon[3].id">
				<div @click="btn_ifshowWin(5)">
					<img :src="`${config.path.static}/img/ecosystem/scs.png`">
					<p>生产商</p>
				</div>
				<div @click="btn_ifshowWin(6)">
					<img :src="`${config.path.static}/img/ecosystem/fws.png`">
					<p>服务商</p>
				</div>
				<div @click="btn_ifshowWin(7)">
					<img :src="`${config.path.static}/img/ecosystem/qds.png`">
					<p>渠道商</p>
				</div>
				<div @click="btn_ifshowWin(8)">
					<img :src="`${config.path.static}/img/ecosystem/cpts.png`">
					<p>产品天使</p>
				</div>
			</div>
	
		</div>

		<div class="expense-list">
			<bv-scroll :api="api" :disabled="load.state.disabled">

				<w-arrlist :list='load.data.lists'></w-arrlist>
				
				<template slot="load-down">
					<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
						数据加载中...
					</div>
					<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.lists.length === 0">
						暂无数据
					</div>
					<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.lists.length > 0">
						暂无更多数据...
					</div>
				</template>
			</bv-scroll>
			<!--<itemList></itemList>-->
		</div>

		<div class="expense-mask" v-if="winShow"></div>
		<div class="expense-win" v-if="winShow">
			<div class="expense-win-box">
				<div id="expense-win-close" @click="btn_hideWin">
					<i class="iconfont iconguanbi"></i>
				</div>
				{{ winShowDataOdd }}
			</div>
			<div class="expense-win-more">
				<router-link to="">了解更多</router-link>
			</div>
		</div>

	</div>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import WArrlist from '@components/wap/article/w-arrlist'
	export default {
		name: "course",
		mixins: [scrollMixin()],
		props:{
			this_id:0,
		},
		components: {
			'w-arrlist': WArrlist
		},
		data() {
			return {
				winShow:false,
				dataicon:'',
				winShowData:[
					/*
					点评天使
					vip会员
					校董
					项目金主
					创客
					厂家
					服务商
					渠道商
					产品天使
					*/
					{name:'点评天使',content:'免费注册即成为会员，会员在点通宝商城购物，即成为点评天使。点评天使消费后，即获得消费最高等额的积分，积分可用于在积分商城享受抵现金购物，点通宝不用淘件件都是宝，为您的布施点个赞吧。'},
					{name:'Vip会员',content:'会员缴纳193元/年会费后成为Vip会员，立享限量专属好礼：即赠送1000积分，“积分”均可用于积分商城抵扣现金使用。开放VIP商城购物特权，独享甄选专区好品，立即拥抱稀缺、新奇、优质、实惠、限量特供好产品，还有机会参与商城特别抽奖活动。'},
					{name:'校董',content:'点通宝平台的 LP有限合伙人，一份存款，就是一份选择；一份储蓄，就是一份智慧；一份投资， 就是一份慈善，我们要让储金，造就您一份伟大而又实际的事业！有共建平台、共享收益'},
					{name:'项目金主',content:'良好的生态环境是人类生存与健康的基础。大地期盼着绿色，河流期盼着绿色，水鸟期盼着绿色，花草期盼着绿色；让“绿色环保”打败“白色污染”，实现万物梦想！让我们为健康人类 和谐社会 关爱生命 呵护地球的使命贡献一份力量'},
					{name:'创客',content:'大众创业,万众创新，让创客不再只是创客，让创业不再只是创业，点通宝创客是全新的“创意、创新、创业”的三创模式；是集全社会力量开的一个大超市；是一个公共组织：大健康，大集体，大分工，大合作，大市场、大平台，大收益。为您的创业带来划时代的意义。'},
					{name:'生产商',content:'解决当下每个人想要实现的大健康梦，联合全世界有使命感、有责任感的生产者,共建“大健康绿色有机生产联盟”，免费提供良心产品的高速销售通路，为企业雪中送炭，让消费者和生产者真正联姻。'},
					{name:'服务商',content:'暂无简介'},
					{name:'渠道商',content:'暂无简介'},
					{name:'产品天使',content:'联合全世界有觉悟、有爱心的消费者,共建“大健康低碳绿色消费联盟”，如果您接触到绿色、低碳、环保、货真价实的好产品请推荐平台，让消费者不仅买到正确的，还要买到真的东西。'},
				],
				winShowDataOdd:''
			}
		},
		methods: {
			btn_ifshowWin(i){
				this.winShowDataOdd = this.winShowData[i].content;
				this.winShow = !this.window;
			},
			btn_hideWin() {
				this.winShow = false
			},

			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/Classify/column_article', {
					params: {
						column_id:this.this_id,
						page: this.load.params.page++
					}
				}).then((res) => {
					//console.log(res)
					const {data: resultData} = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if(resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});
			},

			show_icon(){
				this.$axios.get('/api/index/index')
					.then(res => {
						this.dataicon=res.data.data.ecosphere
					})
					.catch(err => {
						console.log(err);
					})
			}

		},
		mounted() {
			this.show_icon()
		}
	}
</script>

<style scoped lang="scss">
	.expense-mask{
		background: rgba(000,000,000,.5);
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		z-index: 201;
	}
	.expense-win{
		position: fixed;
		left: 50%;
		top:35%;
		width: 80%;
		margin-left: -40%;
		z-index: 202;
		background: #fff;
		border-radius: rem(10);
		overflow: hidden;
		.expense-win-box{
			position: relative;
			padding: rem(20) rem(15);
			color: #666;
			#expense-win-close{
				position: absolute;
				right: rem(3);
				top:rem(3);
			}
		}
		.expense-win-more{
			a{
				display: block;
				background: #CA9F75;
				color: #fff;
				font-size: rem(14);
				padding: rem(12);
				text-align: center;
			}
		}
	}

	.expense-icon {
		display: flex;
		margin: 0 rem(15) rem(10);

		div {
			flex: 1;
			text-align: center;
			img{width: rem(30)}
			span{
				display: block;
				margin: 0 auto;
				width: rem(33);
				height: rem(33);
				line-height: rem(33);
				border: 1px solid #CA9F75;
				color: #CA9F75;
				align-items: center;
				text-align: center;
				border-radius: 100%;
			}
			p {
				color: #333;
				font-size: rem(12);
				margin-top: 7px;
			}
		}
	}
</style>
