<template>
	<bv-home-view class='wap' :router-level='2' style='background-color: #f4f4f4;'>
		
		<growTab :growIndex='3'>
			<template slot='second_tab'>
				<div  class='bc-flex bc-flex-jc-sa sec_tab bc-bd-b-e5e'>
					<p v-for='(item,index) in second_tab' @click='secTab(index)' :class='index == tab_idx?"sec_active":""'>
						{{item}}
					</p>
				</div>
			</template>
		</growTab>
		
		<!--列表-->
		<div class='bc-pd-15rp bc-mg-b-10rp bc-bg-white' v-for='type in typelist'>
			<div class='bc-flex bc-flex-jc-sb bc-mg-b-7rp'>
				<span class='bc-f-18rp'>国学</span>
				<div class='bc-f-12rp bc-t-333' @click='golist(type.id)'>全部&nbsp;12<i class='iconfont '></i></div>
			</div>
			<div class='scroll-x'>
				<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
					<div  slot="scroll-items">
						<div v-for="(item,index) in type.scroll_list"
						   class=" bc-mg-r-10rp  bc-inline-block"
						   @click="select(item,index)"
						>
							<img src='http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg' alt=''>
							<div class='bc-f-16rp bc-mg-t-7rp'>月色摇曳疏影</div>
							<div class='bc-f-12rp bc-t-999 bc-mg-t-7rp'>12篇</div>
						</div>
					</div>
				</bv-swiper-scroll>
			</div>
		</div>
		
		
		
		
		
	
	
	
	
	
	</bv-home-view>
	
	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	import growTab from "../components/grow_tab";

	export default {
		name: "special",
		components:{
			growTab,
		},
		data() {
			return {
				second_tab:['文章','视频','音频','图集'],
				tab_idx:0,
				typelist:[
					{
						id:12,
						scroll_list:[1,2,3,65,5,5,8,85]
					},
					{
						id:13,
						scroll_list:[1,2,3,65,5,5,8,85]
					},
					{scroll_list:[1,2,3,65,5,5,8,85]},
					{scroll_list:[1,2,3,65,5,5,8,85]}
				]
			}
		},
		methods:{
			secTab(index){
				this.tab_idx = index
			},
			select(item, index) {
			
			},
			golist(id){
				this.$router.push({path:'/zhuanqu/column',query:{id:id}})
			},
			getData() {
				var data = {
					tab_idx: this.tab_idx,
					
				}
				console.log(data)
			},
		
		},
		mounted(){
			this.getData()
		}
	}
</script>

<style lang='scss' scoped>
	.t-888{
		color:#888
	}
	.wap {
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
				width: rem(125);
				height: rem(125);
				box-shadow:0px 2px 4px 0px rgba(0, 0, 0, 0.2)
			}
			
		}
	}
</style>