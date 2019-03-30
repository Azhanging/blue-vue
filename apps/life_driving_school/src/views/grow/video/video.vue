<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		
		<growTab :growIndex='1'></growTab>
		
		<div class='bc-bg-white'>
			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(slide, index) in banners" :key="index">
						<div style="height:100px;">{{ slide }}</div>
					</swiper-slide>
					<div class="swiper-pagination" id="pagination" slot="pagination"></div>
				</swiper>
			</bv-scroll>
		</div>
		
		<img width='100%' class='bc-block' src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
		<div class='bc-f-11rp bc-bg-white notice bc-mg-b-10rp bc-pd-lr-15rp bc-v-m'>
			<i class='iconfont iconyinliang-di bc-t-base bc-f-18rp '></i>
			<span >公告：直播时间为{{1548946491687 | timeFilter("Y.M.D")}}</span>
		</div>
		
		<!--数据循环  正在直播 直播预告 历史直播-->
		<videoItem :videoList='videoList'></videoItem>
	
		<!--为您推荐-->
		<div class='scroll-x bc-bg-white bc-pd-15rp bc-mg-b-10rp'>
			<span class='bc-f-18rp'>为您推荐</span>
			<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
				<div  slot="scroll-items">
					<div v-for="(item,index) in scroll_list"
					     class=" bc-mg-r-10rp  bc-inline-block bc-t-c bc-pd-t-10rp"
					     @click="select(item,index)"
					>
						<div class='bc-ps-r'>
							<img src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
							<div class='bc-ps-a replay'>
								<i class='iconfont iconhuifang1 bc-f-10rp'></i>
								<span class='bc-mg-l-3rp bc-f-10rp'>回放</span>
							</div>
						</div>
						<div class='bc-f-14rp ' style='font-weight: 500'>月色摇曳疏影</div>
						<div class='bc-f-12rp bc-t-666 '>{{1548946491687 | timeFilter("Y.M.D")}}</div>
					
					</div>
				</div>
			</bv-swiper-scroll>
		</div>
	
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	import growTab from "../components/grow_tab";
	import videoItem from "../components/video_item";

	export default {
		name: "video",
		components:{
			growTab,
			videoItem
		},
		data() {
			return {
				banners: [1, 2, 3, 4],
				swiperOption: {
					pagination: {
						el: "#pagination"
					},
					loop: true
				},
				swiper: {},
				videoList:[
				1,2
				],
				scroll_list:[1,2,3,4,5,6,8,7]
			}
		},
		methods:{
			secTab(index){
				this.tab_idx = index
			},
			select(item, index) {

			},
			swiperUpdate() {
				this.swiper.update();
			},
			golist(id){
				// this.$router.push({path:'/special/column',query:{id:id}})
			},
			getData() {
				var data = {
					tab_idx: this.tab_idx,

				}
				console.log(data)
			},

		},
		mounted(){
			this.getData();
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
</style>