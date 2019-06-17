<template>
	<div>
		<div v-for="item in list" class="bc-bd-b-e5e bc-mg-t-15rp list-item-box" @click="to_detail(item.id)">
			<div class="bc-flex">
				<div class="list-item-img"><img :src="item.src_img"></div>
				<div class="bc-flex-1 bc-mg-l-15rp">
					<div class="bc-t-333 bc-f-16rp bc-t-ellipsis bc-t-ellipsis-2 list-name">
						{{ item.name }}
					</div>
					<div class="bc-t-666 bc-f-12rp bc-t-ellipsis bc-t-ellipsis-2 list-desc">
						{{ item.sub_content }}
					</div>
				</div>
			</div>
			<div class="bc-pd-tb-10rp bc-f-12rp bc-t-999">
				<span class="bc-mg-r-15rp">{{ item.create_time }}</span>
				<span><i class="iconfont iconeye- bc-f-12rp"></i> {{ item.click_num }}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import router from '@router';
	export default {
		name: "list-item",
		props:['list'],
		methods:{
			to_detail(c_id){
				this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${c_id}`})
			}
		}
	}
</script>

<style scoped lang="scss">
	.list-item-box{
		&:last-child{border-bottom: 0;}
		.list-item-img{
			width: rem(120);
			height: rem(80);
			overflow: hidden;
			img{width: 100%;height: 100%;}
		}
		.list-name{word-break:break-all;}
		.list-desc{word-break:break-all;}
	}
</style>