<template>
	<bv-home-view class='wap' :router-level='2' style='background-color: #f4f4f4;'>
		
		<growTab :growIndex='2'></growTab>
		<!--<w-home-nav  :nav='nav' :active-index='2'></w-home-nav>-->
		
		
		<div class='scroll-x bc-bg-white'>
			<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
				<template slot="scroll-items">
					<a href="javascript:;" v-for="(item,index) in scroll_list"
					   class="bc-pd-tb-15rp bc-mg-lr-10rp bc-inline-block bc-t-666"
					   @click="select(item,index)"
					>
						{{item.name}}
					</a>
				</template>
			</bv-swiper-scroll>
		</div>
		
		<w-sorting :allSel='allSel' @send_sel='receive_sel'></w-sorting>
		
		
		<div class='bc-pd-10rp bc-bg-white'>
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<div v-for='item in load.data.lists' class='itemList bc-pd-10rp bc-bd-b-e5e'>
					<div class='bc-flex'>
						<img class='left_img' src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
						<div class='bc-flex-1 bc-mg-l-10rp'>
							<div>
								<span class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-f-15rp'>文字文字文字文字文字文字文字文字文字文字</span>
								<div class='t-888 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-t-8 bc-f-12rp'>ff 文字ddd ff 文字dddff 文字dddff 文字dddff 文字ddd</div>
							</div>
							<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-t-10rp bc-t-999'>
								<div class='action bc-flex bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i><span>&nbsp;2536</span>
								</div>
								<div class='bc-f-12rp t-888'>
									{{1548946491687 | timeFilter("Y-M-D")}}
								</div>
							</div>
						</div>
					</div>
					
				</div>
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
	
		
	
	
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	import growTab from "../components/grow_tab";
	import WSorting from '@components/wap/article/w-sorting';

	export default {
		name: "grow",
		mixins: [scrollMixin()],
		components:{
			growTab,
			'w-sorting': WSorting
		},
		data() {
			return {
				scroll_list: [
					{
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'50%',
						name: '财富驾照',
						id: 1
					}, {
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'',
						name: '财富驾照',
						id: 2
					}, {
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'50%',
						name: '财富驾照',
						id: 3
					}, {
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'50%',
						name: '财富驾照',
						id: 1
					}, {
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'50%',
						name: '财富驾照',
						id: 1
					}, {
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'50%',
						name: '财富驾照',
						id: 1
					}, {
						img:'https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t',
						reads:'50%',
						name: '财富驾照',
						id: 1
					}
				],
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
				console.log(obj)
			},
			select(item, index) {
				this.scrollIndex = index;
				this.allSel = this.$utils.deepCopy(this.allSelCopy);

				this.apiGetData();
			},
			apiGetData() {
				var data = {
					scroll: this.scrollIndex,
					...this.allSel,
				}
				console.log(data)
			},
			api(){
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
			}
		},
		mounted(){
			this.allSelCopy = this.$utils.deepCopy(this.allSel);
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