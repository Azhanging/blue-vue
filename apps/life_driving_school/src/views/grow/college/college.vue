<template>
	<bv-home-view class='wap' :router-level='2' style='background-color: #f4f4f4;'>

		<growTab :nav='pageTab.system' @collegeList='get_course' :leftControl="`/`"></growTab>


		<div class='scroll-x bc-pd-15rp bc-bg-white bc-mg-b-10rp'>
			<bv-swiper-scroll :active-class-name="'scroll_active'">
				<template slot="scroll-items">
					<router-link :to="`${$router.currentRoute.fullPath}/books/${item.id}`" v-for="(item,index) in scroll_list" :key="item.id"
					             class=" bc-mg-r-15rp bc-inline-block bc-t-666">
						<div class='bc-flex bc-flex-d-c bc-flex-ai-c'>
							<div class='scroll_img bc-mg-b-10rp bc-ps-r bc-t-c'>
								<img :src="item.src_img" alt='' width='100%' height='100%' class=''>
								<div  class='bc-f-12rp bc-ps-a bc-w-100 bc-pd-tb-3rp bc-t-white scroll_read'>
									<template v-if='item.percent'>已阅{{item.percent}}%</template>
									<template v-else>开始阅读</template>
								</div>
							</div>
							<span class="scroll_name">{{item.name}}</span>
						</div>

					</router-link>
				</template>
			</bv-swiper-scroll>
		</div>

		<!--成长课程-->
		<div class='bc-bg-white'>
			<img :src='config.path.static + "/img/grow/grow.png"' class='bc-pd-t-10rp' alt='' width='100%'>
			<div class='bc-flex  bc-pd-tb-10rp bc-pd-lr-15rp course '>
				<div v-for='(item,index) in course'  :class='index == tabIdx?"active":"default"'
				     class='item_course bc-flex bc-flex-1 bc-flex-d-c bc-flex-ai-c bc-pd-10rp'
				     @click='selCourse(item,index)'

				>
					<img class='bc-mg-b-5rp' :src='config.path.static + "/img/grow/"+(index+1)+".png"' alt=''>
					<span>{{item.name}}</span>
				</div>
			</div>

			<div class='bc-pd-10rp'>
				<bv-scroll :api="getCourerList" :disabled="load.state.disabled">
					<!--数据循环-->
					<template v-if='load.data.lists.length > 0'>
						<w-arrlist :list='load.data.lists' :roleNum='roleNum'></w-arrlist>
					</template>
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
	import WArrlist from '@components/wap/article/w-arrlist';
	import { $toast } from "$use-in-vue/mint-ui/toast";
	import store from '@store';


	export default {
		name: "grow",
		mixins: [scrollMixin()],
		components:{
			growTab,
			WArrlist
		},
		data() {
			return {
				pageTab:{},
				course:[],
				tabIdx:0,
				scroll_list: [],
				roleNum:1,//默认学员
			}
		},
		watch:{
			$route(to,from){
				//文章返回重新获取阅读进度
				if(to.path == '/grow/12/college/15'){
					this.books();
				}
			}
		},
		methods:{
			get_course(data){
				//页面进来拿到数据course后的执行代码
				this.course = data;

				this.load.params = {
					page: this.load.params.page,
					column_id: this.course[0].id
				};

				this.load.state.disabled = false;
				this.load.state.hasMore = true;
			},
			selCourse(item,index){
				this.tabIdx = index
				this.roleNum = item.role22;

				// if(roleNum == 1 && id != 21){
				// 		$toast({
				// 			message: '暂无教练身份',
				// 			duration: 10000
				// 		})
				// }

				//数据变更
				this.load.params = {
					page: 1,
					column_id: item.id
				};
				this.load.data.lists = [];
				this.getCourerList();
			},
			getCourerList() {
				return this.$axios.get('api/classify/column_article', {
					params: this.load.params
				}).then((res) => {
					const { data: resultData } = res.data;
					if (scrollNoHasListData.call(this, {
							resultData,
							listKey: 'list'
						})) {
						scrollEndHook.call(this);
					} else {
						++this.load.params.page;
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});

			},
			books() {
				return this.$axios.get('/api/book/getList',{
				}).then((res) => {
					this.scroll_list = res.data.data;
				});
			},
		},

		mounted(){
			this.load.params.page = 1;
			this.load.state.disabled = true;
			this.load.state.hasMore = false;

			this.books();
		}

	}
</script>

<style lang='scss' scoped>
	.wap {
		.scroll-x {
			border-bottom: 1px #eee solid;
			.scroll_img{
				width: rem(80);
				height: rem(114);
				img{vertical-align: top;}
				.scroll_read{
					bottom: 0;
					left: 0;
					background-color: rgba(0,0,0,.4);
				}
			}
			.scroll_name{
				width: rem(80);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
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
	}
</style>
