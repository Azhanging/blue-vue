<template>
	<bv-home-view class='wap' :router-level='2' style='background-color: #f4f4f4;'>
		
		<!--<w-home-header :title='"成长系统"'>-->
			<!--&lt;!&ndash;<template slot='right-control'>&ndash;&gt;-->
				<!--&lt;!&ndash;<div class="bc-t-r">&ndash;&gt;-->
					<!--&lt;!&ndash;<i class='iconfont iconicon-test bc-t-base bc-f-20rp bc-mg-r-10rp'></i>&ndash;&gt;-->
					<!--&lt;!&ndash;<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp'  @click='$share'></i>&ndash;&gt;-->
				<!--&lt;!&ndash;</div>&ndash;&gt;-->
			<!--&lt;!&ndash;</template>&ndash;&gt;-->
			<!--<w-home-nav  :nav='nav' :active-index='0'></w-home-nav>-->
		<!--</w-home-header>-->
		<!---->
		<growTab :growIndex='0'></growTab>
		
		
		<div class='scroll-x bc-pd-15rp bc-bg-white bc-mg-b-10rp'>
			<bv-swiper-scroll :active-class-name="'scroll_active'">
				<template slot="scroll-items">
					<div href="javascript:;" v-for="(item,index) in scroll_list"
					   class=" bc-mg-r-15rp bc-inline-block bc-t-666"
					   @click="select(item,index)"
					>
						<div class='bc-flex bc-flex-d-c bc-flex-ai-c' @click="to_books">
							<div class='scroll_img bc-mg-b-10rp bc-ps-r bc-t-c'>
								<img :src='item.img' alt='' width='100%' height='100%' class=''>
								<div  class='bc-f-12rp bc-ps-a bc-w-100 bc-pd-tb-3rp bc-t-white scroll_read'>
									<template v-if='item.reads'>已阅{{item.reads}}</template>
									<template v-else>开始阅读</template>
								</div>
							</div>
							<span>{{item.name}}</span>
						</div>
						
					</div>
				</template>
			</bv-swiper-scroll>
		</div>
		
		<!--成长课程-->
		<div class='bc-bg-white'>
			<img :src='$config.path.static + "/img/grow/grow.png"' class='bc-pd-t-10rp' alt='' width='100%'>
			<div class='bc-flex  bc-pd-tb-10rp bc-pd-lr-15rp course '>
				<div v-for='(item,index) in course'  :class='index == tabIdx?"active":"default"'
				     class='item_course bc-flex bc-flex-1 bc-flex-d-c bc-flex-ai-c bc-pd-10rp'
				     @click='selCourse(index)'
				     
				>
					<img class='bc-mg-b-5rp' :src='$config.path.static + "/img/grow/"+(index+1)+".png"' alt=''>
					<span>{{item}}</span>
				</div>
			</div>
			
			<div class='bc-pd-10rp'>
				<bv-scroll :api="api" :disabled="load.state.disabled">
					<!--数据循环-->
					<div class='bc-flex courseList bc-pd-tb-10rp' v-for='item in courseList'>
						<img class='bc-mg-r-10rp' src='https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t' alt=''>
						<div class='bc-flex-1 bc-flex bc-flex-d-c bc-flex-jc-sb'>
							<span class='bc-f-16rp bc-t-ellipsis bc-t-ellipsis-2'>精选标题精选标题精选标题精选标题精选标题精选标题</span>
							<div class='bc-flex bc-flex-jc-sb bc-t-999'>
								<div class='bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>&nbsp;
									<span>222</span>
								</div>
								<span class=' bc-f-12rp'>{{1548946491687 | timeFilter}}</span>
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
			
		</div>


	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->
	

</template>

<script>
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	import growTab from "../components/grow_tab"
	import router from '@router';
	export default {
		name: "grow",
		mixins: [scrollMixin()],
		components:{
			growTab
		},
		data() {
			return {
				//成长课程
				course:['学员','教练','分校'],
				tabIdx:0,
				courseList:[1,2,3,4,5,6],
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
				nav: [
					{
						nav_name: '上大夫学院',
						path: '/grow'
					},{
						nav_name: '视频直播',
						path: '/grow'
					},{
						nav_name: '精选短课',
						path: '/short'
					},{
						nav_name: '专区',
						path: '/zhuanqu'
					}],
				//列表数据
				list_data: [1, 2, 3],
			}
		},
		methods:{
			selCourse(index){
				this.tabIdx = index
			},
			api(){
			
			},
			to_books(){
				this.$router.push({'path': `${router.currentRoute.fullPath}/books`})
			}
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
				.scroll_read{
					bottom: 0;
					left: 0;
					background-color: rgba(0,0,0,.4);
				}
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