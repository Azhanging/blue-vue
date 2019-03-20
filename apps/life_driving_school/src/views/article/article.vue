<template>
	<bv-home-view v-if='$config.device.isWap' class='wap'>
		
		<div style='position: sticky;top: 0;left: 0' class='bc-bg-white'>
			
			<w-home-header :title='title' :type=2></w-home-header>
			
			<w-home-nav @router-to='_init' :active-index='activeIndex'></w-home-nav>
			
			<div class='scroll-x'>
				<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
					<template slot="scroll-items">
						<a href="javascript:;" v-for="(item,index) in scroll_list"
						   class="bc-mg-tb-15 bc-pd-lr-10 bc-inline-block bc-t-666"
						   @click="select(item,index)"
						>
							{{item.name}}
						</a>
					</template>
				</bv-swiper-scroll>
			</div>
			
			<sorting :allSel='allSel' @send_sel='receive_sel'></sorting>
		</div>
		
		<bv-scroll :api="api" :disabled="load.state.disabled">
			<list :list='load.data.lists'></list>
			<template slot="load-down">
				<div class="bc-t-c bc-pd-10" v-if="load.state.hasMore">
					数据加载中...
				</div>
				<div class="bc-t-c bc-pd-10" v-else>
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
	import sorting from '@components/wap/article/sorting'
	import list from '@components/wap/article/arrlist'
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';


	export default {
		name: "ze-xun",
		mixins: [scrollMixin()],
		components: {
			sorting,
			list
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
				//左右滑动
				scroll_list: [
					{
						name: '推荐s',
						id: 1
					}, {
						name: '资讯驾照',
						id: 2
					}, {
						name: '健康驾照',
						id: 3
					}, {
						name: '健康驾照',
						id: 1
					}, {
						name: '健康驾照',
						id: 1
					}, {
						name: '健康驾照',
						id: 1
					}, {
						name: '健康驾照',
						id: 1
					}, {
						name: '健康驾照',
						id: 1
					}, {
						name: '健康驾照',
						id: 1
					}
				],
				scrollIndex: 0,
				//列表数据
				list_data: [1, 2, 3],
				activeIndex: 0,
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
				const page = this.load.params.page++;
				return this.$axios.get('/home/home/getRecommendForYou', {
					params: {
						p: page,
						page: page
					}
				}).then((res) => {
					if (scrollNoHasListData.call(this, {
							result: res
						})) {
						return scrollEndHook.call(this);
					} else {
						this.load.data.lists = this.load.data.lists.concat(res.data);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});
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
				this.activeIndex = params.type == "zexun" ? 2 : 3;
				console.log(this.activeIndex)
			},
			setHeaderTitle(params) {
				this.urlType = params.type || "zexun";
				this.title = this.urlType == "zexun" ? "资讯" : "公开课";
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
	@import '@css/index.scss';
	
	.wap {
		.scroll-x {
			border-bottom: 1px #eee solid;
			.scroll_active {
				color: $color-base !important;
			}
			a {
				border-right: 1px #eee solid;
			}
		}
		
	}
</style>