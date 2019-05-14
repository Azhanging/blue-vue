<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		<bv-header :header="{title:{value:'通宝收益'}}"/>
		<div class="earnings-box bc-t-333 bc-pd-15rp bc-mg-tb-10rp" v-if="TbData">
			<div class="bc-f-16rp">累计收益（通宝)</div>
			<div class="bc-f-30rp">{{ TbData.month_shouyi }}</div>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'收益明细'
			}"/>
			
			
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<order-item :item="item" type="tb-earnings" v-for="(item,index) in load.data.lists" :key="index" class="bc-bd-b-e5e"/>
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
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';
	
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	export default {
		name: "tb-earnings",
		components: {
			OrderItem,
			FlowTitle
		},
		mixins: [scrollMixin()],
		computed: {},
		data() {
			return {
				TbData:''
			}
		},
		methods: {
			getTb(){
				this.$axios.get('/member/OfficeProsumer/details_tongbao').then((res) => {
					const { data } = res.data;
					this.TbData = data;
				});
			},
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/OfficeProsumer/details_tongbao', {
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
			}
		},
		mounted() {
			this.getTb()
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
	.earnings-box{
		text-align: center;
		background: #fff;
	}
</style>