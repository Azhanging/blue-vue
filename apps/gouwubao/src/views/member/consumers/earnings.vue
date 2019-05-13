<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		<bv-header :header="{title:{value:'收益明细'}}"/>
		
		<div class="bc-mg-t-10rp">
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(种子)',
	    },
	    num: {name:'通宝',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(碳积分)',
	    },
	    num: {name:'通宝',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(公益基金）',
	    },
	    num: {name:'通宝',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
			<statistics-item class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'累计收益(积分)',
	      icon:true
	    },
	    num: {name:'通宝',value:1},
	    otherNum:[{
	      name:'今日新增',
	      num: 2
	    },{
	      name:'当月新增',
	      num: 3
	    }]
		}"/>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'收入明细'
			}"/>
			<order-item :item="i" type="consumers" v-for="(i,index) in 4" :key="index" class="bc-bd-b-e5e"/>
		</div>
		
		
		
	</bv-home-view>
</template>

<script>
	import StatisticsItem from '../components/statistics-item';
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';
	export default {
		name: "earnings",
		components: {
			StatisticsItem,
			OrderItem,
			FlowTitle
		},
		computed: {},
		data() {
			return {}
		},
		methods: {},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
</style>