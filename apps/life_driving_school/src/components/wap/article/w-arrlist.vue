<template>
	<div class='arrlist'>
		<div v-for='item in list' class='bc-mg-b-10rp bc-bg-white bc-pd-10rp' @click='detailClick'>
			 <w-itemdata :itemList='item'></w-itemdata>
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
				default:[]
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
		}
	}
</script>

<style lang='scss' scoped>
	@import '@css/index.scss';
	.t-888{
		color:#888
	}
	
	.arrlist{
		background-color: #f5f5f5;
		.right_img{
			width: rem(144);
			height: rem(96);
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