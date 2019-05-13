<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header>
			<div slot="set" @click="btn_set()">{{ setText }}<i class="icon icon-xiala"></i></div>
		</bv-header>
		
		<div class="set-back" v-if="setIfShow" @click="btn_set()"></div>
		<div class="set-win" v-if="setIfShow">
			<div class="set-box">
				<div class="set-item" @click="btn_setitem(item.name,item.id)" v-for="item in setitem">{{ item.name }}</div>
			</div>
		</div>
		
		<div class="bc-pd-20rp angel-stat" v-if="angelData">
			<div class="bc-f-18rp">产品数量(款)</div>
			<div class="bc-f-30rp">{{ angelData.count }}</div>
		</div>
		
		<div class="angel-table" v-if="angelData">
			<div class="table-th">
				<div>产品</div>
				<div>售价(元）</div>
				<div>类型</div>
				<div>奖励(元）</div>
			</div>
			
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<div class="bc-row bc-bg-white">
					<div class="table-td" v-for="(item,index) in load.data.lists">
						<div>
							<img :src="item.list_img">
						</div>
						<div>{{ item.price }}</div>
						<div>{{ item.goods_type_name }}</div>
						<div>
							<template v-if="item.fprice==0">
								{{ item.fprice }}
							</template>
							<template v-else>
								0~{{ item.fprice }}
							</template>
						</div>
					</div>
					
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
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	export default {
		name: "product-statistics",
		mixins: [scrollMixin()],
		data() {
			return {
				setitem:[],
				setIfShow:false,
				setText:'全部产品',
				angelData:'',
				areaType:'0'
			}
		},
		created() {
			this.getData();
		},
		computed: {
		},
		methods: {
			btn_set(){
				this.setIfShow = !this.setIfShow
			},
			btn_setitem(setTXT,type){
				this.setText = setTXT;
				this.setIfShow = false;
				
				this.load.state.disabled = true;
				
				this.$nextTick(()=>{
					this.load.data.lists=[]
					this.load.params.page=1
					this.load.state.disabled= false;
					this.load.state.hasMore= true;
					this.areaType = type
				});
				
			},
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/office_product_angel/details_products', {
					params: {
						p: page,
						type: this.areaType
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
			
			getData() {
				this.$axios.get('/member/office_product_angel/details_products').then((res) => {
					const { data } = res.data;
					this.angelData = data
					this.setitem = data.goods_list
					this.setitem.unshift({id: 0, name: "全部产品"})
				});
			}
		},
		components: {
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
	.angel-stat{
		text-align: center;
		background: #fff;
	}
	.angel-table{
		background: #fff;
		margin-top: rem(10);
		overflow: hidden;
		.table-th, .table-td{
			display: flex;
			align-items: center;
			text-align: center;
			div{
				flex: 1;
				max-width: 25%;
				img{
					width: rem(33);
				}
			}
		}
		.table-th{
			padding: rem(15) 0;
			border-bottom: 1px solid #e5e5e5;
		}
		.table-td{
			padding: rem(10) 0;
			color: #999;
		}
	}
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
