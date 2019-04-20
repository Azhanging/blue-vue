<template>
	<div class='arrlist'>
		<div v-for='item in list' @click='detailClick(item.id)'  class='itemList bc-pd-10rp bc-bd-b-e5e' :key="item.id">
			<W-itemdata :itemList='item'  :ifAchieve="ifAchieve"></W-itemdata>
		</div>
	</div>
</template>

<script>
	import router from '@router';
	import WItemdata from './w-itemdata'
	import store from '@store';

	export default {
		props:{
			list:{
				type:Array,
				default:[]
			},
			ifAchieve:{
				type:String,
				default:''
			},
			roleNum:{
				type:Number,
				default:0
			}
		},
		components:{
			'W-itemdata': WItemdata
		},
		methods:{
			detailClick(article_id){
				//role22 1学员 2教练 3分校
				let userInfo_role = store.state.userInfo.role22;
				if(this.roleNum){
					if(userInfo_role == 1 && this.roleNum == 2){
						$toast({
							message: '暂无教练身份',
							duration: 10000
						});
						return;
					}
					if((userInfo_role == 2 || userInfo_role == 1) && this.roleNum == 3){
						$toast({
							message: '暂无分校身份',
							duration: 10000
						});
						return;
					}
				}
				this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${article_id}`})
			}
		}
	}
</script>

<style lang='scss' scoped>
	@import '@css/index.scss';
	.t-888{
		color:#888
	}
	.itemList {
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
</style>
