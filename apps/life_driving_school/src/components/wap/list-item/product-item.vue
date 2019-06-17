<template>
	<div>
		<div class="product-ul" v-if="goods">
			<div class="product-li" :class="bgwhite ? 'bc-bg-white':'bc-bg-f4f'" v-for="item in goods">
				<a @click="to_goods(item.id)">
					<div class="product-li-img">
						<img :src="item.list_img">
					</div>
					<div class="bc-f-14rp bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 product-li-name">
						{{ item.name }}
					</div>
					<div class="product-li-price">
						{{ item.price }}
					</div>
				</a>
			</div>
		</div>
		
	</div>
</template>

<script>
	import programUrl from '@config/program-url'
	export default {
		name: "product-item",
		props:['bgwhite','types','goods'],
		methods:{
			to_goods(id){
				location.href = programUrl['gou-wu-bao']+`/home/goods/info?id=${id}`
			}
		}
	}
</script>

<style scoped lang="scss">
	.product-ul{
		padding: 0 rem(10);
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		margin-top: rem(10);
		.product-li{
			flex: 1;
			min-width: 40%;
			margin-bottom: rem(10);
			max-width: 48.6%;
			&:nth-of-type(2n+1){
				margin-right: rem(5);
			}
			&:nth-of-type(2n){
				margin-left: rem(5);
			}
			.product-li-img{
				height: rem(175);
				overflow: hidden;
				img{width: 100%;min-height: 100%;}
			}
			.product-li-name{
				margin: rem(10);
				height: rem(40);
				line-height: rem(20);
			}
			.product-li-price{
				color: #CC3C41;
				font-size: rem(14);
				padding: 0 rem(10) rem(15);
			}
		}
	}
</style>