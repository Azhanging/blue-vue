<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		<bv-header :header="{title:{value:'收益明细'}}"/>
		
		<div class="bc-mg-t-10rp" v-if="earningsData">
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(种子)',
	    },
	    num: {value:`${earningsData.fljf_count}`},
	    otherNum:[{
	      name:'今日新增',
	      num: `${earningsData.fljf_today || 0 }`
	    },{
	      name:'当月新增',
	      num: `${earningsData.fljf_month || 0 }`
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(碳积分)',
	    },
	    num: {value:`${earningsData.carbon_count || 0}`},
	    otherNum:[{
	      name:'今日新增',
	      num: `${earningsData.carbon_today || 0 }`
	    },{
	      name:'当月新增',
	      num: `${earningsData.carbon_month || 0 }`
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(公益基金）',
	    },
	    num: {value:`${earningsData.seed_count}`},
	    otherNum:[{
	      name:'今日新增',
	      num: `${earningsData.seed_today || 0 }`
	    },{
	      name:'当月新增',
	      num: `${earningsData.seed_month || 0 }`
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(积分)',
	      icon:true
	    },
	    num: {value:`${earningsData.lpjf_count}`},
	    otherNum:[{
	      name:'今日新增',
	      num: `${earningsData.lpjf_today || 0}`
	    },{
	      name:'当月新增',
	      num: `${earningsData.lpjf_month || 0 }`
	    }]
		}"/>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'收入明细'
			}"/>
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<order-item :item="item" type="consumers" v-for="(item,index) in load.data.list" :key="index" class="bc-bd-b-e5e"/>
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
	import StatisticsItem from '../components/statistics-item';
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';
	
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	export default {
		name: "earnings",
		components: {
			StatisticsItem,
			OrderItem,
			FlowTitle
		},
		mixins: [scrollMixin()],
		computed: {},
		data() {
			return {
				earningsData:''
			}
		},
		methods: {
			getEarnings(){
				this.$axios.get('/member/office_prosumer/details_fuli').then((res) => {
					const { data } = res;
					this.earningsData = data;
				});
			},
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/office_prosumer/details_fuli', {
					params: {
						p: page
					}
				}).then((res) => {
					const { data: resultData } = res;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if (resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.list = this.load.data.list.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});
			}
		},
		mounted() {
			this.getEarnings();
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
</style>