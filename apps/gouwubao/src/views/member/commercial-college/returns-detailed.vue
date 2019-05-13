<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<bv-header>
			<div slot="set" @click="btn_set()">{{ setText }}<i class="icon icon-xiala"></i></div>
		</bv-header>
		<div class="set-back" v-if="setIfShow"></div>
		<div class="set-win" v-if="setIfShow">
			<div class="set-box">
				<div class="set-item" @click="btn_setitem(item.name,item.id)" v-for="item in setitem">{{ item.name }}</div>
			</div>
		</div>
		
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'收益明细'
			}"/>
			
			
			
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<div class="bc-row bc-bg-white">
					<order-item :item="item" type="college" v-for="(item,index) in load.data.lists" :key="index" class="bc-bd-b-e5e"/>
					<!--<order-item type="coach" :item="item" v-for="(item,index) in load.data.lists" :key="index" class="bc-bd-b-e5e"/>-->
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
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	export default {
		name: "returns-detailed",
		mixins: [scrollMixin()],
		components: {
			OrderItem,
			FlowTitle
		},
		computed: {},
		data() {
			return {
				setitem:[],
				setIfShow:false,
				setText:'全部区域',
				det_Data:'',
				area:0
			}
		},
		methods: {
			btn_set(){
				this.setIfShow = !this.setIfShow
			},
			btn_setitem(setTXT,area){
				this.setText = setTXT;
				this.setIfShow = false;
				
				this.load.state.disabled = true;
				
				this.$nextTick(()=>{
					this.load.data.lists=[]
					this.load.params.page=1
					this.load.state.disabled= false;
					this.load.state.hasMore= true;
					this.area = area
				});
			},
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/office_business_school/college_income', {
					params: {
						p: page,
						area: this.area
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
			
			get_det_Data(){
				this.$axios.get('/member/office_business_school/college_income').then((res) => {
					const { data } = res.data;
					this.setitem = data.area_list;
					let arr = {id: "0", name: "全部区域"};
					this.setitem.unshift(arr);
				});
			}
		},
		mounted() {
			this.get_det_Data();
		}
	}
</script>

<style scoped lang="scss">
	.set-back{
		background: rgba(000,000,000,.5);
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top:0;
		width: 100%;
		height: 100%;
		z-index: 190;
	}
	.set-win{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top:rem(46);
		width: 100%;
		height: 100%;
		z-index: 191;
		.set-box{
			background: #fff;
			.set-item{
				color: #333;
				font-size: rem(14);
				padding: rem(15);
				border-bottom: 1px solid #e5e5e5;
				text-align: center;
			}
		}
	}
</style>