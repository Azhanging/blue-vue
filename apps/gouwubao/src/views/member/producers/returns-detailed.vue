<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<bv-header :header="{title:{value:'查询明细'}}"/>
		<div class="bc-row bc-bg-white" v-if="detData">
			<div class="bc-pd-tb-15rp bc-mg-lr-15rp bc-flex bc-bd-b-e5e bc-f-16rp">
				<div class="bc-flex-1 bc-t-333">
					当日销售量
				</div>
				<div class="itemsp-color">{{ detData.sales.num || 0 }}件</div>
			</div>
			<div class="bc-pd-tb-15rp bc-mg-lr-15rp bc-flex bc-f-16rp">
				<div class="bc-flex-1 bc-t-333">
					当日销售额
				</div>
				<div class="itemsp-color">{{ detData.sales.money_count || 0 }}元</div>
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
					const { data } = res;
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
	.bc-bg-f4f{background: #f4f4f4;}
.itemsp-color{
	color: #DCB46E;
}
</style>