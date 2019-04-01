<template>
	<div class='arrlist'>
		
		<div v-for='item in list' @click='detailClick' class='itemList bc-pd-10rp bc-bd-b-e5e'>
			<W-itemdata :itemList='item'></W-itemdata>
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
			detailClick(){
				this.$router.push({'path':`${router.currentRoute.fullPath}/detail`})
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