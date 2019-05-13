<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<bv-header :header="{title:{value:'查询明细'}}"/>
		<div class="bc-row" v-if="detData">
			<div class="bc-pd-15rp bc-flex bc-bd-b-e5e bc-f-16rp">
				<div class="bc-flex-1 bc-t-333">
					当日销售量
				</div>
				<div class="itemsp-color">{{ detData.num || 0 }}件</div>
			</div>
			<div class="bc-pd-15rp bc-flex">
				<div class="bc-flex-1 bc-t-333">
					当日销售额
				</div>
				<div class="itemsp-color">{{ detData.money_count || 0 }}元</div>
			</div>
		</div>
	</bv-home-view>
</template>

<script>
	export default {
		name: "returns-detailed",
		components: {},
		computed: {},
		data() {
			return {
				detData:''
			}
		},
		methods: {
			getDetData() {
				this.$axios.get('/member/office_producer/details_sell').then((res) => {
					const { data } = res.data;
					this.detData = data;
				});
			},
		},
		mounted() {
			this.getDetData();
		}
	}
</script>

<style scoped lang="scss">
.itemsp-color{
	color: #DCB46E;
}
</style>