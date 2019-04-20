<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		
		<growTab :growIndex='1' :nav='college_list.system'></growTab>
		
		<div class='bc-bg-white'>
			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(slide, index) in banners" :key="index">
						<img :src='slide.src_img' style="width:100%">
					</swiper-slide>
					<div class="swiper-pagination" id="pagination" slot="pagination"></div>
				</swiper>
			</bv-scroll>
		</div>
		<!--<div v-if='banners.length > 0'>-->
			<!--<img width='100%' class='bc-block' :src="banners[0].src_img" alt=''>-->
		<!--</div>-->
		<div class='bc-f-11rp bc-bg-white notice bc-mg-b-10rp bc-pd-lr-15rp bc-v-m'>
			<i class='iconfont iconyinliang-di bc-t-base bc-f-18rp '></i>
			<span >{{resvideo.notice_content}}</span>
		</div>
		
		<!--数据循环  正在直播  -->
		<videoItem :videoList='resvideo.data_live' type='0'></videoItem>
		<!--直播预告-->
		<videoItem :videoList='resvideo.data_notice' type='1'></videoItem>

		<!--为您推荐-->
		<div class='scroll-x bc-bg-white bc-pd-15rp bc-mg-b-10rp'>
			<span class='bc-f-18rp'>为您推荐</span>
			<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
				<div  slot="scroll-items">
					<router-link :to="`${$router.currentRoute.fullPath}/room?id=${item.id}`" v-for="(item,index) in resvideo.data_recommend"
					     class=" bc-mg-r-10rp  bc-inline-block bc-t-c bc-pd-t-10rp scrollvideo"
					     @click="select(item,index)"
					>
						<div class='bc-ps-r'>
							<img :src='item.cover' alt=''>
							<div class='bc-ps-a replay'>
								<i class='iconfont iconhuifang1 bc-f-10rp'></i>
								<span class='bc-mg-l-3rp bc-f-10rp'>回放</span>
							</div>
						</div>
						<div class='bc-f-14rp t-hide bc-t-333 bc-t-hide' style='font-weight: 500'>{{item.title}}</div>
						<div class='bc-f-12rp bc-t-666 '>{{item.start_time*1000 | timeFilter("Y.M.D")}}</div>
					
					</router-link>
				</div>
			</bv-swiper-scroll>
		</div>
		
		<!--历史直播-->
		<videoItem :videoList='resvideo.data_history' type='2'></videoItem>
	
	
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	import growTab from "@components/wap/grow/w-grow-tab";
	import videoItem from "@components/wap/grow/w-video-item";

	export default {
		name: "video",
		components:{
			growTab,
			videoItem
		},
		data() {
			return {
				banners:[],
				resvideo:{},
				college_list:{},
				swiperOption: {
					pagination: {
						el: "#pagination"
					},
					loop: true,
					autoplay:true,
				},
				swiper: {},
				videoList:[],
				scroll_list:[],
			}
		},
		methods:{
			select(item, index) {

			},
			swiperUpdate() {
				this.swiper.update();
			},
			golist(id){
				// this.$router.push({path:'/special/column',query:{id:id}})
			},
			getData() {
				this.$axios.get('api/live_video/index').then((res) => {
					this.resvideo = res.data.data
				}).catch((error) => {
					console.log(error);
				});
			},
			getBanner(){
				this.$axios.get('/api/banner/index',{
					params: {
						column_id:16
					}
				}).then((res) => {
					this.banners = res.data.data.banner;
					console.log(this.banners)
				}).catch((error) => {
					console.log(error);
				});
			},
			getNav(){
				let paramsId = this.$route.params;
				this.$axios.get('/api/classify/assortment.html',{
					params:{
						column_id:paramsId.grow_id
					}
				}).then((res) => {
					this.college_list =  res.data.data;
					// console.log(this.college_list);
					// this.$router.push()
				});
			},
			init(){
				this.getData();
				this.getBanner();
				this.getNav()
			}
		},
		mounted(){
			this.init();
			this.$nextTick(() => {
				this.swiper = this.$refs['swiper'];
				this.swiperUpdate();
			});
		}
	}
</script>

<style lang='scss' scoped>
	.t-888{
		color:#888
	}
	.wap {
		.notice{
			line-height: rem(40);
		}
		.sec_tab{
			p{
				margin: 0;
				height: rem(40);
				line-height: rem(40);
			}
			.sec_active{
				color:$color-base;
				border-bottom: 2px $color-base solid;
			}
		}
		.scroll-x {
			.scrollvideo{
				width: rem(120);
				img{
					width: rem(120);
					height: rem(80);
				}
				.replay{
					color:#fff;
					top:50%;
					left:50%;
					background-color: rgba(0,0,0,.4);
					transform: translate(-50%,-50%);
					padding: rem(3) rem(8);
					border-radius: rem(12);
				}
			}
			
		}
		
	}
</style>