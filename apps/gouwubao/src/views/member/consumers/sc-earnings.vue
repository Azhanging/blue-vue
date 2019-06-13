<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		<!--商城收益-->
		<bv-header :header="{title:{value:'收入明细'}}"/>
		
		<div class="bc-flex bc-bg-white">
			<div class="bc-flex-1 sc-set">
				<select @change="scCanshuT()" v-model="type">
					<option value="0">全部商城</option>
					<option :value="item.type" v-for="(item,index) in scScreen">{{ item.name }}</option>
				</select>
			</div>
			<div class="bc-flex-1 sc-set">
				<select @change="scCanshuL()" v-model="level">
					<option value="0">全部级别</option>
					<option :value="item.level" v-for="(item,index) in scScreenLevel">{{ item.name }}</option>
				</select>
			</div>
		</div>
		
		<div class="bc-flex bc-bg-white bc-mg-t-10rp bc-t-c bc-pd-10rp" v-if="scData">
			<div class="bc-flex-1 bc-bd-r-e5e">
				<div class="bc-t-999 bc-f-12rp">交易笔数</div>
				<div class="bc-t-333 bc-f-16">{{ scData.count || 0 }}笔</div>
			</div>
			<div class="bc-flex-1">
				<div class="bc-t-999 bc-f-12rp">合计收入</div>
				<div class="bc-t-333 bc-f-16">{{ scData.money || '0.00' }}元</div>
			</div>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-10rp">
			<flow-title :options="{
	      name:'收益明细'
			}"/>
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<order-item :item="item" type="sc-earnings" v-for="(item,index) in load.data.list" :key="index" class="bc-bd-b-e5e"/>
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
		name: "sc-earnings",
		components: {
			OrderItem,
			FlowTitle
		},
		mixins: [scrollMixin()],
		computed: {},
		data() {
			return {
				scData:'',
				scScreen:[
					{type:1,name:'黄金商城'},
					{type:2,name:'白金商城'},
					{type:3,name:'创客商城'},
				],
				scScreenLevel:[
					{level:1,name:'一级'},
					{level:2,name:'二级'},
				],
				type:0,
				level:0,
			}
		},
		methods: {
			scCanshuT(){//商城
				this.load.state.disabled = true;
				this.$nextTick(()=>{
					this.load.data.list=[]
					this.load.params.page=1
					this.load.state.disabled= false;
					this.load.state.hasMore= true;
				});
			},
			scCanshuL(){//级别
				this.load.state.disabled = true;
				this.$nextTick(()=>{
					this.load.data.list=[]
					this.load.params.page=1
					this.load.state.disabled= false;
					this.load.state.hasMore= true;
				});
			},
			getSc(){
				this.$axios.get('/member/OfficeProsumer/details_store').then((res) => {
					const { data } = res;
					this.scData = data;
				});
			},
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/OfficeProsumer/details_store', {
					params: {
						p: page,
						type: this.type,
						level: this.level
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
			this.getSc();
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
	.sc-set{
		text-align: center;
		select{
			height: rem(40);
			background: url(#{$base-static-path + '/img/member/consumers/xiala.png' }) center right no-repeat;
			background-size: rem(10);
			border: 0;
			padding-right: rem(10);
		}
	}
</style>