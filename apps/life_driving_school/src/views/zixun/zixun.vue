<template>
	<!--资讯-->
	<bv-home-view class='wap' :router-level="2">

		<w-home-header :header="{
			title:{
				value: title
			}
		}" :type=0>
		</w-home-header>

		<div class="bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp">
			<div class='bc-flex bc-flex-ai-c '>
				<div class="bc-flex-1">
					<a href="/" class="bc-t-666">首页</a>
				</div>

				<div class="bc-flex-1" v-for="(item, index) in nav" :key="index">
					<a :class="[index !== 0 ? 'bc-t-666' : 'active','bc-pd-tb-9rp','bc-inline-block']" @click="routerTo(item) "
					   v-if="item.name"
					>
						{{item.name}}
					</a>
				</div>

				<div class="bc-flex-1">
					<a href="javascript:;" class="bc-t-666" @click="$toast('敬请期待！')">产业研究</a>
				</div>

			</div>
		</div>

		<!--banner轮播-->
		<div class="bc-bg-white banner" v-if="banners && banners.length > 0">
			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(item, index) in banners" :key="index">
						<div class="bc-row">
							<router-link :to="item.url">
								<img class="bc-w-100 banner-img" :src="item.src_img" alt="">
							</router-link>
						</div>
					</swiper-slide>
					<div class="swiper-pagination" id="pagination" slot="pagination"></div>
				</swiper>
			</bv-scroll>
		</div>

		<div class='scroll-x ' v-if="scroll_list && scroll_list.length > 6">
			<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
				<template slot="scroll-items">
					<a href="javascript:;" v-for="(item,index) in scroll_list" :key="index"
					   class=" bc-pd-lr-16rp bc-inline-block bc-t-666"
					   @click="select(item,index)"
					>
						<span class="nav-title bc-inline-block bc-pd-tb-10rp">{{item.name}}</span>
					</a>
				</template>
			</bv-swiper-scroll>
		</div>

		<div class='scroll-x ' v-else>
			<a href="javascript:;" v-for="(item, index) in scroll_list" :key="index"
			   class=" bc-pd-lr-16rp bc-inline-block bc-t-666"
			   @click="select(item, index)"
			   :class="{'scroll_active': scrollIndex === index}"
			>
				<span class="nav-title bc-inline-block bc-pd-tb-10rp">{{item.name}}</span>
			</a>
		</div>

		<w-sorting :allSel='allSel' @send_sel='receive_sel' style="background:rgba(244,244,244,1);"></w-sorting>

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

	</bv-home-view>

	<!--<bv-home-view v-else='config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->
</template>

<script>
	import WSorting from '@components/wap/article/w-sorting'
  import WArrlist from '@components/wap/article/w-arrlist'
  import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';

  export default {
    name: "zixun",
    mixins: [scrollMixin()],
    components: {
      'w-sorting': WSorting,
      'w-arrlist': WArrlist
    },
    data() {
      return {
        banners: [], // banner图
        swiperOption: {
          pagination: {
            el: "#pagination"
          },
          loop: true,
          autoplay: true,
        },
        swiper: {},
        urlType: -1, //1资讯 2公开课
        title: "生命驾校",
        allSelCopy: {},
        allSel: {
          isRecommend: true, // 默认
          isTime: -1,
          isScan: -1,
          column_id: 1
        },
        nav: [
          {
            name: '资讯',
            path: '/article/zixun',
            id: 1,
            params: {
              type: "zixun"
            }
          }
          // , {
          //   name: '产业研究',
          //   path: '/industry',
          //   id: 2
          // }
          ],
        //左右滑动
        scroll_list: [],
        scrollIndex: 0,
        //列表数据
        list_data: [1, 2, 3],
        activeIndex: 1
      }
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
      swiperUpdate() {
        this.swiper.update();
      },
      _init(opts = {}) {
        const { params } = opts;
        this.setNavActive(params);
        this.setHeaderTitle(params);
        //初始化选中项
        this.allSel = this.$utils.deepCopy(this.allSelCopy);
        //获取数据
        this.load.params = {
          page: this.load.params.page,
          column_id: this.allSel.column_id
        };
      },
      select(item, index) {
        this.scrollIndex = index;
        this.allSel = this.$utils.deepCopy(this.allSelCopy);
        this.allSel.column_id = item.id;
        this.load.params.page = 1;
        this.load.params.column_id = item.id;
        this.load.data.lists = [];
        this.api();
      },
      api() {
        return this.$axios.get('/api/article/index', {
          params: this.load.params
        }).then((res) => {
          const { data: resultData } = res.data;
          if (scrollNoHasListData.call(this, {
            resultData,
            listKey: 'list'
          })) {
            if (this.scroll_list && this.scroll_list.length === 0 ) {
              this.load.data.lists = resultData.list;
              this.scroll_list = resultData.class;
              this.scroll_list.unshift({ id: 1, name: '推荐' });
            }
            scrollEndHook.call(this);
          } else {
            ++this.load.params.page;
            this.load.data.lists = this.load.data.lists.concat(resultData.list);
            this.scroll_list = resultData.class;
            this.scroll_list.unshift({ id: 1, name: '推荐' });
            if (resultData.list.length < 10) scrollEndHook.call(this);
          }
        }).catch((error) => {
          console.log(error);
          return scrollEndHook.call(this);
        });
      },

      /*		selectZone(msg) {
						this.allSel = this.$utils.deepCopy(this.allSelCopy);
						let { id } = msg
					},*/
      receive_sel(allSel) {
        // 根据点击时间或者浏览量判断所传参数
        this.load.state.disabled = true;
        this.$nextTick(() => {
          this.load.params.page = 1;
          this.load.state.disabled = false;
          this.load.state.hasMore = true;
          this.load.data.lists = [];
          if (allSel.isRecommend) {
            this.load.params = {
              page: this.load.params.page,
              column_id: allSel.column_id,
            }
          } else {
            if (allSel.isTime !== -1) {
              this.load.params = {
                page: this.load.params.page,
                column_id: allSel.column_id,
                isTime: allSel.isTime
              }
            } else if (allSel.isScan !== -1) {
              this.load.params = {
                page: this.load.params.page,
                column_id: allSel.column_id,
                isScan: allSel.isScan
              }
            }
          }
        });
      },
      setNavActive(params) {
        // this.activeIndex = params.type === "zixun" ?  1: 2;
        // console.log(this.activeIndex)
      },
      setHeaderTitle(params) {
        // this.urlType = params.type || "zixun";
        // this.title = this.urlType === "zixun" ? "生命驾校" : "公开课";
      }
    },
    beforeRouteUpdate(to, from, next) {
      this._init({
        params: to.params
      });
      next()
    },
    mounted() {
      const currentRoute = this.$router.currentRoute;
      this.allSelCopy = this.$utils.deepCopy(this.allSel);
      this._init({
        params: currentRoute.params
      });

      // banner图
      this.$axios.get('/api/banner/index?column_id=1')
        .then(res => {
          const { data } = res.data;
          this.banners = data.banner;
          this.$nextTick(() => {
            this.swiper = this.$refs['swiper'];
            this.swiperUpdate();
          });
        })
        .catch(err => {
          console.log(err);
        });

    }
  }
</script>

<style lang='scss' scoped>

	.swiper-pagination > .swiper-pagination-bullet-active {
		width: rem(12)
	}

	.wap {
		.home-nav {
			border-bottom: 1px #eee solid;

			.active {
				color: $color-base;
				border-bottom: 2px $color-base solid;
			}
		}

		.banner {
			.banner-img {
				height: rem(150);
			}
		}

		.scroll-x {
			.scroll_active {
				color: $color-base !important;

				.nav-title {
					border-bottom: 2px solid $color-base;
				}
			}
		}
	}
</style>
