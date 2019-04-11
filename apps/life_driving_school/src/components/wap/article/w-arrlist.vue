<template>
	<div class='arrlist'>
		<div v-for='item in list' @click='detailClick(item.id)' class='itemList bc-pd-10rp bc-bd-b-e5e' :key="item.id">
			<W-itemdata :itemList='item' :ifAchieve="ifAchieve"></W-itemdata>
		</div>
		
	</div>
</template>

<script>
	import router from '@router';
	import WItemdata from './w-itemdata'
	export default {
		props:{
			list:{
				type:Array,
				default:[1,2,3]
			},
			ifAchieve:{
				type:String,
				default:''
			}
		},
		data() {
			return {
			
			}
		},
		components:{
			'W-itemdata': WItemdata
		},
		methods:{
			detailClick(article_id){
				this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${article_id}`})
			}
		},
		mounted() {
			this.list = [1,2,3]
			console.log(this.list)
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