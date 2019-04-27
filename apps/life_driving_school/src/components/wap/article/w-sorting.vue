<template>
	<div class='bc-flex bc-pd-10rp sorting bc-flex-ai-c'>
		<p @click='default_sel' class='bc-mg-r-30rp bc-pd-lr-8rp bc-pd-tb-5rp bc-bg-white' :class='allSel.isRecommend?"bc-t-base":""'>
			默认
		</p>
		<div class='bc-bg-white bc-mg-r-30rp sort_bg'>
			<div class='bc-ps-r  ' @click.stop='pl_time'>
				<p>时间</p>
				<span  :class="['up','iconfont','iconxiangshang2',allSel.isTime===1?'bc-t-base':'']"></span>
				<span  :class="['down','iconfont','iconxiangxia2',allSel.isTime===2?'bc-t-base':'']"></span>
			</div>
		</div>
		<div class='bc-bg-white sort_bg'>
			<div class='bc-ps-r  ' @click.stop='scan'>
				<p>浏览量</p>
				<span :class="['up','iconfont','iconxiangshang2',allSel.isTime===1?'bc-t-base':'']" ></span>
				<span :class="['down','iconfont','iconxiangxia2',allSel.isTime===2?'bc-t-base':'']"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:{
			scroll_list:{
				type:Array,
				default:[]
			},
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
				},
        column_id: {
				  type: Number,
	        default: 6
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
			pl_time(){
				this.allSel.isTime = this.allSel.isTime === 1 ?  2 : 1;
				this.allSel.isRecommend = false;
				this.allSel.isScan = -1;
				this.get_sel()
			},
			scan(){
				this.allSel.isScan = this.allSel.isScan === 1 ?  2 : 1;
				this.allSel.isRecommend = false;
        this.allSel.isTime = -1;
        this.get_sel()
			},
			get_sel(){
				this.$emit('send_sel',this.allSel)
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '@css/index.scss';
	.sorting{
		border-bottom: 1px #eee solid;
		p{
			margin-top: 0;
			margin-bottom: 0;
		}
		.iconfont{
			font-size: rem(14);
		}
		.up{
			position: absolute;
			right: rem(-22);
			top: rem(-3);
		}
		.down{
			position: absolute;
			right: rem(-22);
			top: rem(4);
		}
		.sort_bg{
			padding: rem(5) rem(20) rem(5) rem(8);
		}
	}
</style>