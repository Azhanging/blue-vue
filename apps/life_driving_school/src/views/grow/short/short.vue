<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		
		<growTab></growTab>
		
		<div class='scroll-x bc-bg-white'>
			<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
				<template slot="scroll-items">
					<a class="bc-pd-tb-9rp bc-mg-lr-10rp bc-inline-block bc-t-666"
					   :class='scrollIndex == 0 ? "scroll_active" : ""'
					   @click="select($route.params.classId,0)">推荐</a>
					<a href="javascript:;" v-for="(item,index) in pageData.class"
					   class="bc-pd-tb-9rp bc-mg-lr-10rp bc-inline-block bc-t-666"
					   :class='scrollIndex == index+1 ? "scroll_active" : ""'
					   @click="select(item.id,index+1)"
					>
						{{item.name}}
					</a>
				</template>
			</bv-swiper-scroll>
		</div>
		
		<w-sorting :allSel='allSel' @send_sel='receive_sel'></w-sorting>
		
		
		<div class='bc-pd-10rp bc-bg-white'>
			<bv-scroll :api="apiGetData" :disabled="load.state.disabled">
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
		</div>
		
	
	</bv-home-view>
	
	<!--<bv-home-view v-else='config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	import growTab from "@components/wap/grow/w-grow-tab";
	import WArrlist from '@components/wap/article/w-arrlist'
	import WSorting from '@components/wap/article/w-sorting';

	export default {
		name: "grow",
		mixins: [scrollMixin()],
		components:{
			growTab,
			'w-sorting': WSorting,
			WArrlist
		},
		data() {
			return {
				pageData:{},
				scroll_list: [],
				scrollIndex:0,
				allSel:{
					isRecommend: true,
					isTime: -1,
					isScan: -1
				},
				allSelCopy:{},
				//列表数据
				list_data: [1, 2, 3],
			}
		},
		methods:{
			selCourse(index){
				this.tabIdx = index
			},
			receive_sel(obj) {
				this.load.params.page = 1;
				this.load.data.lists = [];
				Object.assign(this.load.params,obj)
				this.apiGetData()
			},
			select(id, index) {
				this.scrollIndex = index;
				this.allSel = this.$utils.deepCopy(this.allSelCopy);
				this.load.data.lists = [];
				this.load.params = {
					page: 1,
					column_id: id,
					...this.allSel,
				};
				
				this.apiGetData()
			},
			apiGetData() {
				return this.$axios.get('/api/article/index', {
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
						if(resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
						this.scroll_list = resultData.class
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});
			},
			getScrollList(){
				return this.$axios.get('/api/article/index',{
					params:{
						column_id:this.$route.params.classId
					}
				}).then((res) => {
					this.pageData = res.data.data;

					this.load.params = {
						page: 1,
						column_id: this.$route.params.classId,
						...this.allSel,
					}
					
				
					this.load.state.disabled = false;
					this.load.state.hasMore = true;
					
					
				});
			},
			init(){
				this.getScrollList()
			}
		},
		mounted(){
			this.allSelCopy = this.$utils.deepCopy(this.allSel);
			
			this.load.params.page = 1;
			this.load.state.disabled = true;
			this.load.state.hasMore = false;
			
			this.init()
		}
	}
</script>

<style lang='scss' scoped>
	.t-888{
		color:#888
	}
	.wap {
		.scroll-x {
			border-bottom: 1px #eee solid;
			.scroll_active {
				color: $color-base !important;
				border-bottom: 2px $color-base solid;
				font-size: rem(16);
			}
		}
		.course{
			.item_course{
				margin-right: rem(10);
				&:last-child{
					margin-right: 0;
				}
				img{
					width: rem(40);
					height: rem(40);
				}
			}
			.default{
				background: url($base-url+'/img/grow/ccourse2.png')  no-repeat;
				background-size: 100% 100%;
				color:#666;
			}
			.active{
				color: #A7815C;
				background: url($base-url+'/img/grow/course.png')  no-repeat;
				background-size: 100% 100%;
				
			}
		}
		.courseList{
			border-bottom: 1px #e5e5e5 solid;
			img{
				width: rem(120);
				height: rem(80);
			}
		}
		.itemList{
			background-color: white;
			.left_img{
				width: rem(120);
				height: rem(80);
			}
			.action{
				color:#888;
				div{
					margin-right: rem(20);
					i{
						color:#C1A77D;
					}
				}
			}
		}
	}
</style>