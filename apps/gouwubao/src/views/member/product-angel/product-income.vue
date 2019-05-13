<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header :header="{title:{value:'收入明细'}}"/>
		
		<!-- 累计收益（通宝） -->
		<statistics-item v-if="sy_Data" class="bc-mg-t-10rp" :options="{
	    title:{
	      name:'累计收益（通宝）'
	    },
	    num: {value: sy_Data.tbincome_count },
	    otherNum:[{
	      name:'今日新增',
	      num: sy_Data.tbincome_today_count
	    },{
	      name:'当月新增',
	      num: sy_Data.tbincome_month_count
	    }]
		}"/>
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'收益明细'
			}"/>
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<div class="bc-row bc-bg-white">
					<order-item :item="item" type="tb-earnings" v-for="(item,index) in load.data.lists" :key="index" class="bc-bd-b-e5e"/>
				</div>
				<template slot="load-down">
					<div class="bc-t-c bc-pd-10" v-if="load.state.hasMore">
						数据加载中...
					</div>
					<div class="bc-t-c bc-pd-10" v-else>
						暂无数据...
					</div>
				</template>
			</bv-scroll>
			
		</div>
		
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	export default {
		name: "product-angel",
		mixins: [scrollMixin()],
		data() {
			return {
				sy_Data:''
			}
		},
		created() {
			this.getData();
		},
		computed: {
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_product_angel/details_earnings').then((res) => {
					const { data } = res.data;
					this.sy_Data = data
				});
			},
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/office_product_angel/details_earnings', {
					params: {
						p: page
					}
				}).then((res) => {
					const { data: resultData } = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if (resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});
			},
		},
		components: {
			StatisticsItem,
			OrderItem,
			FlowTitle
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
</style>
