<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		
		<growTab :growIndex='3'>
			<template slot='second_tab'>
				<div  class='bc-flex bc-flex-jc-sa sec_tab bc-bd-b-e5e'>
					<p v-for='(item,index) in second_tab' @click='secTab(index)' :class='index == tab_idx?"sec_active":""'>
						{{item}}
					</p>
				</div>
			</template>
		</growTab>
		
	
	
	
	
	
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
				this.$router.push({path:'/special/column',query:{id:id}})
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