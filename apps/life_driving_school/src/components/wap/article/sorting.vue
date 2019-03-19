<template>
	<div class='bc-flex bc-pd-10 sorting'>
		<span @click='default_sel' :class='allSel.isRecommend?"bc-t-base bc-mg-r-30":"bc-mg-r-30"'>默认</span>
		<div class='bc-ps-r bc-mg-r-40'>
			时间
			<span :class='allSel.isTime==1?"bc-t-base up iconfont iconxiangshang":"iconfont up iconxiangshang"' @click='pl_time(1)'></span>
			<span :class='allSel.isTime==2?"bc-t-base down iconfont iconxiangxia":"iconfont down iconxiangxia"' @click='pl_time(2)'></span>
		
		</div>
		<div class='bc-ps-r  bc-mg-r-40'>
			浏览
			<span :class='allSel.isScan==1?"bc-t-base up iconfont iconxiangshang":"iconfont up iconxiangshang"' @click='scan(1)'></span>
			<span :class='allSel.isScan==2?"bc-t-base down iconfont iconxiangxia":"iconfont down iconxiangxia"' @click='scan(2)'></span>
		
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			scroll_list:[],
			// 选中结果
			allSel:{
				//推荐
				isRecommend:{
					type:Boolean,
					default:true
				},
				// 时间：-1没选 1上 2下
				isTime:{
					type:Number,
					default:-1
				},
				// 浏览：-1没选 1上 2下
				isScan:{
					type:Number,
					default:-1
				}
			}
		},
		data() {
			return {
				scrollIndex: 0,
			}
		},
		methods:{
			default_sel(){
				this.allSel.isRecommend = true;
				this.allSel.isTime = this.allSel.isScan = -1;
				this.get_sel()

			},
			pl_time(action_num){
				console.log(action_num)
				this.allSel.isRecommend = false;
				this.allSel.isTime = action_num;
				this.get_sel()
			},
			scan(action_num){
				this.allSel.isRecommend = false;
				this.allSel.isScan = action_num;
				this.get_sel()
			},
			get_sel(){
				this.$emit('send_sel',this.allSel)
			}

		},
		mounted() {

		}
	}
</script>

<style lang='scss' scoped>
	@import '@css/index.scss';
	
	.sorting{
		border-bottom: 1px #eee solid;
		.iconfont{
			font-size: rem(12);
		}
		.up{
			position: absolute;
			right: rem(-16);
			top: rem(-2);
		}
		.down{
			position: absolute;

			right: rem(-16);
			top: rem(7);
		}
	}
</style>