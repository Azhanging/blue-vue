<template>
	<!--资讯-->
	<bv-home-view class='wap'>

		<w-home-header :header="{
			title:{
				value: title
			}
		}" :type=0>
		</w-home-header>

		<div class="bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp">
			<div class='bc-flex bc-flex-ai-c '>
				<a href="/" class="bc-flex-1 ">首页</a>
				<div class="bc-flex-2" v-for="(item, index) in nav" :key="index">
					<a class="bc-flex-1" :class="[0 !== index ? 'bc-t-666' : 'active','bc-pd-tb-9rp','bc-inline-block']" @click="routerTo(item) "
					   v-if="item.name"
					>
						{{item.name}}
					</a>
				</div>
			</div>
		</div>
		<!--轮播-->
		<div class="bc-row">
			<img class="bc-w-100" :src="`${$config.path.static}/img/zixun/banner.png`" alt="">
		</div>

		<div class='scroll-x '>
			<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
				<template slot="scroll-items">
					<a href="javascript:;" v-for="(item,index) in scroll_list"
					   class=" bc-pd-lr-16rp bc-inline-block bc-t-666"
					   @click="select(item,index)"
					>
						<span class="nav-title bc-inline-block bc-pd-tb-10rp">{{item.name}}</span>
					</a>
				</template>
			</bv-swiper-scroll>
		</div>

		<w-sorting :allSel='allSel' @send_sel='receive_sel' style="background:rgba(244,244,244,1);"></w-sorting>

		<bv-scroll :api="api" :disabled="load.state.disabled">
			<w-arrlist :list='load.data.lists'></w-arrlist>
			<template slot="load-down">
				<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
					数据加载中...
				</div>
				<div class="bc-t-c bc-pd-10rp" v-else>
					暂无数据...
				</div>
			</template>
		</bv-scroll>


	</bv-home-view>

	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
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
          }, {
            name: '产业研究',
            path: '/industry',
            id: 2
          }],
        //左右滑动
        scroll_list: [
          {
            name: '推荐',
            id: 1
          }, {
            name: '财富',
            id: 2
          }, {
            name: '健康',
            id: 3
          }, {
            name: '婚姻',
            id: 4
          }, {
            name: '育子',
            id: 5
          }, {
            name: '心灵',
            id: 6
          }
        ],
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
      _init(opts = {}) {
        const { params } = opts;
        this.setNavActive(params);
        this.setHeaderTitle(params);
        //初始化选中项
        this.allSel = this.$utils.deepCopy(this.allSelCopy);
        this.scrollIndex = 0;
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
        this.api();
      },
      api() {
        return this.$axios.get('/api/article', {
          params: this.load.params
        }).then((res) => {
          const { data: resultData } = res.data;
          if (scrollNoHasListData.call(this, {
              resultData,
              listKey: 'list'
            })) {
            const state = scrollEndHook.call(this);
            this.load.state.disabled = state.disabled;
          } else {
            ++this.load.params.page;
            this.load.data.lists = this.load.data.lists.concat(resultData.list);
            resultData.class.unshift({id: 1,name: '推荐'});
            this.scroll_list = resultData.class;
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
        this.$nextTick(()=>{
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

    }
  }
</script>

<style lang='scss' scoped>
	.wap {
		.home-nav {
			border-bottom: 1px #eee solid;
			.active {
				color: $color-base;
				border-bottom: 2px $color-base solid;
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
