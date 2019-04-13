<template>
	<bv-home-view style="background:#F4F4F4;">
		<w-home-header :header="{
      title:{
        value:'生命导航',
        style:`font-weight: bold !important;font-size:1.33333rem;`
      },
      style:`background: rgba(255,246,238,1);border-bottom:none !important;`
		}" :type="2">
		</w-home-header>

		<div class="bc-g-bg-e5e">
			<!--tab 首页 资讯 产业研究-->
			<div class="bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp">
				<div class='bc-flex bc-pd-tb-5rp' >
					<a href="/" class="bc-flex-1 active">首页</a>
					<div class="bc-flex-2" v-for="(item, index) in nav" :key="index">
						<a class="bc-flex-1" @click="routerTo(item)"
						   v-if="item.name"
						>
							{{item.name}}
						</a>
					</div>
				</div>
			</div>

			<div class="bc-row bc-bg-e5e bc-ps-r huilianwang">
				<a class="bc-block" href="javascript:;">
					<img class="bc-w-100" :src="`${$config.path.static}/img/home/zhihuiwang.png`" alt="慧联网">
				</a>
				<router-link to="/sign">
					<img class="qiandao bc-ps-a" :src="`${$config.path.static}/img/home/qiandao.png`" alt="签到">
				</router-link>
			</div>

			<!--三大系统-->
			<div class="three-system" v-if="getData && getData.system">
				<div class="bc-v-m bc-pd-lr-10rp ">
					<div class="bc-pd-tb-10rp" style="border-bottom:1px solid #F9F3EC">
						<img class="bc-mg-r-3rp xiaochangshi" :src="`${$config.path.static}/img/home/jiankangchangshi.png`" alt="健康常识">
						<span class="bc-f-12rp" v-html="">健康小常识之宜早卧早起,保证一定的睡眠时间。</span>
					</div>
				</div>
				<div class="bc-t-c bc-mg-t-20rp">
					<img class="bc-inline-block three-system-title" :src="`${$config.path.static}/img/home/three_system.png`">
				</div>

				<div class="bc-t-c bc-mg-t-13rp">
					<router-link :to="$router.routerID.getPathID({
						id: getData.system[0].id,
						params:{
							grow_id: getData.system[0].id,
						}
					})">
						<img class="bc-inline-block chengzhang-system" :src="getData.system[0].src_img" alt="成长系统">
					</router-link>
				</div>
				<div class=" bc-t-c bc-mg-t-3rp">
					<router-link :to="$router.routerID.getPathID({
						id: getData.system[1].id,
						params:{
							id: getData.system[1].id
						}
					})">
						<img class="bc-inline-block bozhong-system" :src="getData.system[1].src_img" alt="播种系统">
					</router-link>
					<router-link :to="$router.routerID.getPathID({
						id: getData.system[2].id,
						params:{
							id: getData.system[2].id
						}
					})">
						<img class="bc-inline-block shouhuo-system" :src="getData.system[2].src_img" alt="收获系统">
					</router-link>
				</div>

			</div>

			<!--生命导航-->
			<div class="shengmingdaohang bc-t-c bc-mg-t-10rp bc-c-f" v-if="getData && getData.life">
				<div class="bc-mg-t-20rp">
					<img class="inline-block shengmingdaohang-title" :src="`${$config.path.static}/img/home/shengmingdaohang.png`">
				</div>
				<div class="bc-mg-t-17">
					<router-link v-for="item in getData.life" :to="$router.routerID.getPathID({
						id: item.id,
						params:{
							nav_id: item.id
						}
					})">
						<img class="inline-block shengmingdaohang-item" :src="item.src_img" :alt="item.name">
					</router-link>
				</div>
			</div>

			<!--生态圈-->
			<div class="shengtaiquan bc-mg-t-10rp bc-c-f" v-if="getData && getData.ecosphere">
				<div class="bc-mg-t-20rp bc-t-c">
						<img class="inline-block shengtaiquan-title" :src="`${$config.path.static}/img/home/shengtaiquan.png`">
				</div>

					<div class='scroll-x bc-pd-15rp bc-bg-white bc-t-c'>
						<bv-swiper-scroll :active-class-name="'scroll_active'">
							<template slot="scroll-items">
								<div  class=" bc-mg-r-5rp bc-inline-block bc-t-666" v-for="item in getData.ecosphere">
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

			</div>

			<!--推荐-->
			<div class="bc-mg-t-10rp tuijian bc-bg-white bc-c-f">
				<div class="bc-mg-t-17rp bc-t-c">
					<img class="inline-block tuijian-title" :src="`${$config.path.static}/img/home/tuijian.png`">
				</div>
				<bv-scroll :api="api" :disabled="load.state.disabled">
					<recommend-arrlist :list='load.data.lists'></recommend-arrlist>
					<template slot="load-down">
						<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
							数据加载中...
						</div>
						<div class="bc-t-c bc-pd-10rp" v-else>
							暂无数据...
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

  export default {
    name: "home",
    mixins: [scrollMixin()],
    data() {
      return {
        nav: [{
          name: '资讯',
          path: '/zixun',
	        id: 1
        }, {
          name: '产业研究',
          path: '/industry',
	        id: 2
        }],
        //绑定手机的状态
        showBindPhoneStatus: (() => {
          return router.currentRoute.fullPath === '/';
        })(),
	      getData: {}
      }
    },
	  mounted() {
      this.$axios.get('/api/index/index')
	      .then(res => {
					const {data} = res.data;
					this.getData = data;
	      })
	      .catch(err => {
					console.log(err);
	      })
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
      api() {
        return this.$axios.get('/api/index/index', {
          params: {
            page: this.load.params.page ++
          }
        }).then((res) => {
          const { data: resultData } = res.data;
          if (scrollNoHasListData.call(this, {
            resultData,
            listKey: 'list'
          })) {
            const state = scrollEndHook.call(this);
            this.load.state.disabled = state.disabled;
          } else {
            this.load.data.lists = this.load.data.lists.concat(resultData.list);
          }
        }).catch((error) => {
          console.log(error);
          return scrollEndHook.call(this);
        });
      },
    },
	  components: {
      "recommend-arrlist": recommendArrlist
	  }
  }
</script>

<style scoped lang="scss">

	.huilianwang {
		.qiandao {
				left: rem(5);
				bottom: rem(5);
				width: rem(69);
				height: rem(39);
		}
	}

	.home-nav {
		background: rgba(255, 246, 238, 1);
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

	.three-system {
		min-height: rem(300);
		background: url($base-url + '/img/home/three_system_bg.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;
		.xiaochangshi {
			width: rem(69);
			height: rem(22);
		}
		.three-system-title {
			width: rem(120);
			height: rem(30);
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
	}

	.shengmingdaohang {
		min-height: rem(230);
		background: url($base-url + '/img/home/shengmingdaohang_bg.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;
		.shengmingdaohang-title {
			width: rem(120);
			height: rem(30);
		}
		.shengmingdaohang-item {
			width: rem(118);
			height: rem(78);
		}
	}

	.shengtaiquan {
		min-height: 185px;
		background: url($base-url + '/img/home/shengtaiquan_bg.png') no-repeat;
		background-position: center;
		background-size: 100% 100%;
		.shengtaiquan-title {
			width: rem(120);
			height: rem(30);
		}
		.scroll-x {
			border-bottom: 1px #eee solid;
			.scroll_img{
				width: rem(108);
				height: rem(108);
			}
		}

			.shengtaiquan-item {
				width: rem(108);
				height: rem(108);
			}

	}

	.tuijian {
		.tuijian-title {
			width: rem(155);
			height: rem(51);
		}
	}
.bc-inline-block{vertical-align: top;}
</style>
