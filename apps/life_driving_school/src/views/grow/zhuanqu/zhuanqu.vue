<template>
	<bv-home-view class='wap' :router-level='2' style='background-color: #f4f4f4;'>

		<growTab :growIndex='3'>
			<template slot='second_tab'>
				<div  class='bc-flex bc-flex-jc-sa sec-tab bc-bd-b-e5e'>
					<p v-for='(item,index) in second_tab' @click='secTab(index,item.id)' :class='index == tab_idx?"sec-active":""'>
						{{item.name}}
					</p>
				</div>
			</template>
		</growTab>

		<!--列表-->
		<div v-if="zqDataid>0">
			<div class='bc-pd-15rp bc-mg-b-10rp bc-bg-white' v-for='type in typelist'>
				<div class='bc-flex bc-flex-jc-sb bc-mg-b-7rp'>
					<span class='bc-f-18rp'>{{ type.name }}</span>
					<router-link :to="`${currentFullPath}/column/${type.id}`" class='bc-f-12rp bc-t-333'>全部&nbsp;<i class='iconfont iconyou'></i></router-link>
				</div>
				<div class='scroll-x'>
					<bv-swiper-scroll :active-class-name="'scroll_active'" :current-index="scrollIndex">
						<div  slot="scroll-items">
							<div v-for="(item,index) in type.class"
							     class=" bc-mg-r-10rp  bc-inline-block"
							     @click="select(item,index)"
							>
								<router-link :to="`${currentFullPath}/column/${type.id}/album/${item.id}`">
									<img :src='item.src_img' alt=''>
									<div class='bc-f-16rp bc-mg-t-7rp bc-t-666'>{{ item.name }}</div>
									<div class='bc-f-12rp bc-t-999 bc-mg-t-7rp'>{{ item.count }}篇</div>
								</router-link>
							</div>
						</div>
					</bv-swiper-scroll>
				</div>
			</div>
		</div>

	</bv-home-view>

	<!--<bv-home-view v-else='config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>
	import growTab from "@components/wap/grow/w-grow-tab";
	import router from '@router';
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
				],
				zqDataid:''
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods:{
			secTab(index,itemid){
				this.tab_idx = index
				this.zqDataid=itemid
				this.zhuangqu()
			},
			select(item, index) {

			},
			zhuanqu_nav(){//专区下分类
				this.$axios.get('/api/classify/assortment', {
					params: {
						column_id: this.$route.params.grow_id,
						id:this.$route.params.classId,
					}
				}).then((res) => {
					//console.log(res.data.data.system_class)
					this.second_tab = res.data.data.system_class
					this.zqDataid = res.data.data.system_class[0].id
					this.zhuangqu();
				});
			},
			zhuangqu(){//专区数据
				this.$axios.get('/api/classify/article_special', {
					params: {
						column_id: this.zqDataid
					}
				}).then((res) => {
					//console.log(res.data.data)
					this.typelist = res.data.data
				});
			}

		},
		mounted(){
			this.zhuanqu_nav()
		}
	}
</script>

<style lang='scss' scoped>
	.t-888{
		color:#888
	}
	.wap {
		.sec-tab{
			p{
				margin: 0;
				height: rem(40);
				line-height: rem(40);
			}
			.sec-active{
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
