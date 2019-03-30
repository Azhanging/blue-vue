<template>
	<!--资讯-->
	<bv-home-view class='wap'>
		
		<w-home-header :header="{
			title:{
				value: title
			}
		}" :type=0></w-home-header>

		<w-home-nav  :nav='nav' @router-to='_init' :active-index='activeIndex'></w-home-nav>

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
		name: "ze-xun",
		mixins: [scrollMixin()],
		components: {
			'w-sorting': WSorting,
			'w-arrlist': WArrlist
		},
		data() {
			return {
				urlType: -1, //1资讯 2公开课
				title: "",
				allSelCopy: {},
				allSel: {
					isRecommend: true,
					isTime: -1,
					isScan: -1
				},
				nav: [
					{
						nav_name: '首页',
						path: '/'
					},{
						nav_name: '资讯',
						path: '/article/zixun',
						params: {
							type: "zixun"
						}
					}, {
						nav_name: '产业研究',
						path: '/industry'
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
						id: 1
					}, {
						name: '育子',
						id: 1
					}, {
						name: '心灵',
						id: 1
					}
				],
				scrollIndex: 0,
				//列表数据
				list_data: [1, 2, 3],
				activeIndex: 1,
			}
		},
		methods: {
			_init(opts = {}) {
				const { params } = opts;
				this.setNavActive(params);
				this.setHeaderTitle(params);
				//初始化选中项
				this.allSel = this.$utils.deepCopy(this.allSelCopy);
				this.scrollIndex = 0;
				//获取数据
				this.apiGetData()
			},
			api() {
				// const page = this.load.params.page++;
				// return this.$axios.get('/home/home/getRecommendForYou', {
				// 	params: {
				// 		p: page,
				// 		page: page
				// 	}
				// }).then((res) => {
				// 	if (scrollNoHasListData.call(this, {
				// 			result: res
				// 		})) {
				// 		return scrollEndHook.call(this);
				// 	} else {
				// 		this.load.data.lists = this.load.data.lists.concat(res.data);
				// 	}
				// }).catch(() => {
				// 	return scrollEndHook.call(this);
				// });

				this.load.data.lists = [1,2,3]
			},
			apiGetData() {
				var data = {
					nav: this.activeIndex,
					scroll: this.scrollIndex,
					...this.allSel,
				}
				console.log(data)
			},

			select(item, index) {
				this.scrollIndex = index;
				this.allSel = this.$utils.deepCopy(this.allSelCopy);

				this.apiGetData();
			},
			/*		selectZone(msg) {
						this.allSel = this.$utils.deepCopy(this.allSelCopy);
						let { id } = msg
					},*/
			receive_sel(obj) {
				console.log(obj)
			},
			setNavActive(params) {
				this.activeIndex = params.type === "zixun" ?  1: 2;
				console.log(this.activeIndex)
			},
			setHeaderTitle(params) {
				this.urlType = params.type || "zixun";
				this.title = this.urlType === "zixun" ? "生命驾校" : "公开课";
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