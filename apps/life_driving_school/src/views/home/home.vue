<template>
	<bv-home-view style="background:#F4F4F4;">
		<w-home-header :header="{
      title:{
        value:'智慧导航',
        style:`font-weight: bold !important;font-size:1.33333rem;`
      },
      style:`background: url(${config.path.static}/img/home/header_bg_img.png) no-repeat  !important;background-position: center !important;
			background-size: 100% 100%  !important;border-bottom:none !important;`
		}" :type="2">
			<!--header_bg-img.png-->
		</w-home-header>


		<div class="bc-g-bg-e5e">
			<!--tab 首页 资讯 产业研究-->
			<div class="bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp">
				<div class='bc-flex bc-pd-tb-5rp'>
					<div class="bc-flex-1">
						<a href="/" class=" active">首页</a>
					</div>
					<div class="bc-flex-1" v-for="(item, index) in nav" :key="index">
						<a @click="routerTo(item)"
						   v-if="item.name"
						>
							{{item.name}}
						</a>
					</div>
					<div class="bc-flex-1">
						<a href="javascript:;" class="" @click="$toast('敬请期待！')">产业研究</a>
					</div>
				</div>
			</div>

			<div class="bc-row bc-ps-r huilianwang">
				<a class="bc-block" href="javascript:;">
					<img class="bc-w-100" :src="`${config.path.static}/img/home/zhihuiwang.png`" alt="慧联网">
				</a>
				<a href="javascript:;" @click="toSign">
					<img class="qiandao bc-ps-a" :src="`${config.path.static}/img/home/qiandao.png`" alt="签到">
				</a>
			</div>

			<!--健康常识-->
			<div class="bc-v-m jiankangchangshi">
				<div class="bc-pd-tb-10rp bc-bg-white bc-pd-lr-10rp" style="border-bottom:1px solid #F9F3EC">
					<img class="bc-mg-r-3rp xiaochangshi" :src="`${config.path.static}/img/home/jiankangchangshi.png`" alt="健康常识">
						<bv-swiper-scroll >
							<template slot="scroll-items">
							  <span class="bc-f-12rp changshi-content"  ref="changshiContent">
								  {{getData.notice_content}}
							  </span>
							</template>
						</bv-swiper-scroll>
				</div>
			</div>

			<!--三大系统-->

				<div class="bc-t-c bc-mg-t-20rp" v-if="getData && getData.system">
					<img class="bc-inline-block three-system-title" :src="`${config.path.static}/img/home/three_system.png`">
				</div>

				<div class="three-system-content  " v-if="getData && getData.system">
					<div class="bc-t-c">
						<router-link :to="$router.routerID.getPathID({
						id: getData.system[0].id,
						params:{
							grow_id: getData.system[0].id,
						}
					})">
							<img class="bc-inline-block chengzhang-system" :src="getData.system[0].src_img" alt="成长系统">
						</router-link>
					</div>
					<div class="bc-flex bc-t-c bc-mg-t-3rp">
						<a href="javascript:;" class="bc-flex-1" @click="toJifubao">
							<img class="bc-inline-block bozhong-system" :src="getData.system[1].src_img" alt="播种系统">
						</a>
						<a href="javascript:;" class="bc-flex-1" @click="$toast({message: '敬请期待！'})" >
							<img class="bc-inline-block shouhuo-system" :src="getData.system[2].src_img" alt="收获系统">
						</a>
					</div>
				</div>

			<!--智慧导航-->

				<div class="bc-mg-t-20rp">
					<img class="block bc-w-100" :src="`${config.path.static}/img/home/shengmingdaohang.png`">
				</div>
				<div class="shengmingdaohang-content bc-c-f bc-mg-b-15rp" v-if="getData && getData.life">
					<div class="bc-mg-t-10rp">
						<div class="bc-flex bc-t-flex  bc-flex-jc-sa">
							<router-link v-for="(item, index) in getData.life" :key="index" :to="$router.routerID.getPathID({
							id: item.id,
							params:{
								nav_id: item.id
							}
						})" v-if="index <= 2" >
								<img class="inline-block shengmingdaohang-item" :src="item.src_img" :alt="item.name" >
							</router-link>
						</div>
						<div class="bc-flex bc-t-flex  bc-flex-ai-c bc-flex-jc-c">
							<div class='content_second' style='box-sizing: border-box'>
								<router-link v-for="(item, index) in getData.life" :key="index" :to="$router.routerID.getPathID({
							id: item.id,
							params:{
								nav_id: item.id
							}
						})" v-if="index > 2">
									<img class="inline-block shengmingdaohang-item" :src="item.src_img" :alt="item.name" >
								</router-link>
							</div>
						</div>


					</div>
				</div>


			<!--生态圈-->
			<!--<div class="shengtaiquan bc-c-f" v-if="getData && getData.ecosphere">
				<div class='topImg'><img  :src="`${config.path.static}/img/home/shengtaiquan_title.png`"  alt=''></div>
				<div class='scroll-x  bc-t-c'>
					<bv-swiper-scroll :active-class-name="'scroll_active'" class='swiper-scroll'>
						<template slot="scroll-items">
							<div class=" bc-mg-r-5rp bc-inline-block bc-t-666">
								<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
									<div class='scroll_img bc-ps-r bc-t-c'>
										<a href="https://fuwu.dtb315.com/vegetarian">
											<img class="inline-block shengtaiquan-item" :src="`${config.path.static}/img/ecosystem/sushiditu.png`" alt="素食地图">
										</a>
									</div>
								</div>
							</div>
							<div class=" bc-mg-r-5rp bc-inline-block bc-t-666" v-for="item in getData.ecosphere">
								<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
									<div class='scroll_img bc-ps-r bc-t-c'>
										<router-link :to="$router.routerID.getPathID({
													id: item.id,
													params:{
														ecosystem_id: item.id
													}
												})">
											<img class="inline-block shengtaiquan-item" :src="item.src_img" :alt="item.name">
										</router-link>
									</div>
								</div>
							</div>
						</template>
					</bv-swiper-scroll>
				</div>
			</div>-->
			
			<!--生态圈--新-->
			<div class="shengtaiquan bc-c-f" v-if="getData && getData.ecosphere">
				<div class='topImg'><img  :src="`${config.path.static}/img/home/shengtaiquan_title.png`"  alt=''></div>
				<div class="stq-box">
					<div class="bc-bg-white bc-mg-b-10rp" v-for="item in getData.ecosphere">
						<div class="bc-pd-15rp bc-bd-b-e5e bc-t-c bc-t-333 bc-f-16rp bc-f-b">{{ item.name }}</div>
						<div class="bc-bd-b-e5e" v-for="oneLevel in item.one_level">
							<div class="bc-pd-10rp bc-flex">
								<div class="bc-flex-1 bc-t-333 bc-f-16rp bc-f-b">{{ oneLevel.name }}</div>
								<div><router-link :to="`/tow-nav/${oneLevel.id}`" class="bc-t-999 bc-f-12rp">更多<i class="iconfont iconyou"></i></router-link></div>
							</div>
							<div class="bc-pd-t-10rp bc-overflow-hide" v-if="oneLevel.two_level">
								<div class="bc-w-50 bc-fl-l" v-for="twoLevel in oneLevel.two_level">
									<router-link to="/ecosystem/44/tow-nav-detail/101" :to="`/tow-nav/${oneLevel.id}/tow-nav-detail/${twoLevel.id}`">
										<div class="bc-mg-lr-10rp bc-overflow-hide bc-mg-b-10rp">
											<div class="stq-list-img"><img :src="twoLevel.src_img"></div>
											<div class="stq-list-r">
												<div class="bc-f-14rp bc-t-333 bc-mg-t-5rp bc-f-b bc-overflow-hide list-name">{{ twoLevel.name }}</div>
												<div class="bc-f-12rp bc-t-999 bc-mg-t-3rp bc-t-ellipsis bc-t-ellipsis-2 list-sub">{{ twoLevel.sub_content }}</div>
											</div>
										</div>
									</router-link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
			<!--推荐-->
			<div class="bc-mg-t-10rp tuijian bc-bg-white bc-c-f">
				<img class="block bc-w-100 tuijian-title" :src="`${config.path.static}/img/home/tuijian.png`">
				<bv-scroll :api="api" :disabled="load.state.disabled">
					<recommend-arrlist :list='load.data.list'></recommend-arrlist>
					<template slot="load-down">
						<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
							数据加载中...
						</div>
						<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.list.length === 0">
							暂无数据
						</div>
						<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.list.length > 0">
							暂无更多数据...
						</div>
					</template>
				</bv-scroll>
			</div>
		</div>

		<template slot="other">
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>

	</bv-home-view>
</template>

<script>
	import router from '@router';
  import recommendArrlist from './recommend/recommend-arrlist';
  import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
  import { login } from '$assets/js/login';
  import programUrl from '@config/program-url';


  export default {
    name: "home",
    mixins: [scrollMixin()],
    data() {
      return {
        nav: [{
          name: '资讯',
          path: '/zixun',
          id: 1
        }
          // , {
          //   name: '产业研究',
          //   path: '/industry',
          //   id: 2
          // }
        ],
        //绑定手机的状态
        showBindPhoneStatus: (() => {
          return router.currentRoute.fullPath === '/';
        })(),
        getData: {},
      }
    },
    mounted() {
      this.$axios.get('/api/index/index')
        .then(res => {
          const { data } = res;
          this.getData = data;
	        // 健康常识滚动
	        this.$nextTick(()=> {
            let contentOffsetWidth = this.$refs['changshiContent'].offsetWidth;
            let contentLeft = 0;
            if (contentOffsetWidth > 270) {
              this.timer = setInterval(() => {
                contentLeft -= 0.2;
                if (Math.abs(contentLeft) >= (contentOffsetWidth - 210)) {
                  contentLeft = 0;
                }
                this.$refs['changshiContent'].style.left = contentLeft + 'px';
              }, 1)
            }

	        });

        })
        .catch(err => {
          console.log(err);
        });
    },
    methods: {
      routerTo(item) {
        const { id } = item;
        this.$router.push(this.$router.routerID.getPathID({
          id: id, // 和后台id 对应
          params: {
            id: id // 对应router里面的id
          }
        }));
      },
      closeBindPhone() {
        this.showBindPhoneStatus = false;
      },
      toSign() {
        if (!this.$store.getters.isLogin) {
          login();
        } else {
          const { phone } = this.userInfo;
          if (!phone) {
            this.showBindPhoneStatus = true;
          } else {
            this.$router.push('/sign');
          }
        }
      },
      api() {
        return this.$axios.get('/api/index/index', {
          params: {
            page: this.load.params.page++
          }
        }).then((res) => {
          const { data: resultData } = res;
          if (scrollNoHasListData.call(this, {
            resultData,
            listKey: 'list'
          })) {
            scrollEndHook.call(this);
          } else {
            if (resultData.list.length < 10) scrollEndHook.call(this);
            this.load.data.list = this.load.data.list.concat(resultData.list);
          }
        }).catch((error) => {
          console.log(error);
          return scrollEndHook.call(this);
        });
      },
      toJifubao() {
				location.href = programUrl['ji-fu-bao'];
      }
    },
    components: {
      "recommend-arrlist": recommendArrlist
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
	  destroyed() {
      clearInterval(this.timer);
	  }
  }
</script>

<style scoped lang="scss">
	.huilianwang {
		font-size: 0;
		.qiandao {
			left: rem(5);
			bottom: rem(5);
			width: rem(69);
			height: rem(39);
		}
	}

	.home-nav {
		background: url($base-url + '/img/home/header_bg_img.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;

		a {
			color: #CA9F75;
			font-size: rem(16);
			font-weight: bold;
			color: rgba(202, 159, 117, 1);
			padding: 6px 15px;
			display: inline-block;
			width: 70%;
		}

		.active {
			color: #fff;
			background: url($base-url + '/img/home/shouye_bg.png') no-repeat;
			background-position: center;
			background-size: 100% 100%;

		}
	}

	.xiaochangshi {
		width: rem(69);
		height: rem(22);
	}

		.three-system-content {
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
			position: relative;
			margin: rem(-10) auto 0 auto;
			width: 95%;
			height: rem(200);
			background: url($base-url + '/img/home/three_system_bg.png') no-repeat;
			background-position: center;
			background-size: 100% 100%;
		}

		.three-system-title {
			width: 100%;
		}

		.chengzhang-system {
			width: rem(196);
			height: rem(88);
		}

		.bozhong-system {
			width: rem(170);
			height: rem(77);
		}

		.shouhuo-system {
			width: rem(170);
			height: rem(77);
		}
		.shengmingdaohang-content {
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
			position: relative;
			margin: rem(-15) auto rem(20) auto;
			width: 95%;
			height: rem(175);
			background: url($base-url + '/img/home/shengmingdaohang_bg.png') no-repeat;
			background-position: center;
			background-size: 100% 100%;
			.content_second{
				display: flex;
				justify-content: space-around;
				width: 100%;
				padding:0 rem(80)
			}
		}

		.shengmingdaohang-item {
			width: rem(118);
			height: rem(78);
		}


	.shengtaiquan {
		/*height: rem(180);*/
		
		background-position: center;
		background-size: 100% 100%;
		.topImg{
			font-size: 0;
			img{
				width: 100%;
			}
		}
		

		.scroll-x {
			height: rem(110);
			margin-bottom: rem(10);
			background: url($base-url + '/img/home/shengtaiquan_bgs.png') no-repeat;
			background-size: 100% 100%;
			box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
			.swiper-scroll{
				position: relative;
				top: rem(-15);
				padding: 0 rem(15);
				.scroll_img {
					width: rem(108);
					height: rem(108);
				}
			}
			
		}
		.stq-box{
			position: relative;
			top: rem(-10);
			padding: 0 rem(10);
			margin-bottom: rem(-20);
			.stq-list-img{
				width: rem(65);
				height: rem(65);
				overflow: hidden;
				float: left;
				img{width: 100%;}
			}
			.stq-list-r{
				margin-left: rem(70);
			}
			.list-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
			.list-sub{word-wrap:break-word}
		}
		
		.shengtaiquan-item {
			width: rem(108);
			height: rem(108);
		}

	}

	.bc-inline-block {
		vertical-align: top;
	}

	.jiankangchangshi {
		box-shadow:0px 3px 10px 0px rgba(0, 0, 0, 0.1);
		.bv-swiper-scroll-container {
			display: inline-block!important;
			width: 78%;
			height: rem(25);
			.changshi-content {
				position: absolute;
				left: 0;
				top: rem(5);
				z-index: 50;
			}
		}
	}
</style>
