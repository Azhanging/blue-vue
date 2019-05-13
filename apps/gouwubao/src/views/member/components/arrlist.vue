<template>
	<div class='arrlist'>
		<div v-for='item in dataArr' class='itemList bc-pd-10rp bc-bd-b-e5e'>
			<a :href="item.url">
				<div class='bc-flex'>
					<img class='left_img' :src='item.list_img' alt=''>
					<div class='bc-flex-1 bc-mg-l-10rp bc-flex bc-flex-jc-sb bc-flex-d-c'>
						<div>
							<span class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-15rp'>{{ item.name }}</span>
							<div class='bc-t-666 bc-t-ellipsis bc-t-ellipsis-2  bc-f-12rp'>
								{{ item.sub_content }}
							</div>
						</div>
						<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-t-10rp bc-t-999'>
							<div class='bc-flex-1'></div>
							<div class='bc-f-12rp bc-t-888'>
							<span class="bc-mg-r-15rp">
								<i class='icon icon-check-line bc-f-12rp'></i><span>&nbsp;{{ item.click_num }}</span>
							</span>
								{{ item.create_time }}
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script>
	import router from '@router';
	export default {
		name: "arrlist",
		props:['dataArr'],
		components: {},
		computed: {},
		data() {
			return {}
		},
		methods: {
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.left_img{
		width: rem(120);
		height: rem(80);
	}
</style>