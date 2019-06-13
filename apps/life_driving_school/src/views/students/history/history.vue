<template>
	<bv-home-view class='wap' :router-level='2'>
		<w-home-header :header='{
            title:{
                value: "浏览历史"
            }
        }'
		>
			<div slot="right-control" v-if="load.data.list.length>0">
				<div class="bc-t-r bc-t-base bc-mg-r-10rp" @click="btn_handle">
					{{ if_btntxt }}
				</div>
			</div>
		</w-home-header>

		<div class="collection-main">
			<div class="collection-list" :class="if_translate?'if_translate':''" v-if="load.data.list">
				<bv-scroll :api="api" :disabled="load.state.disabled">
					<div class="collection-item" v-for="(item,index) in load.data.list">
							<div class="collection-item-radio">
								<input type="checkbox" :id="'check'+index" :value="item.id" v-model='checkList'>
								<label :for="'check'+index"></label>
							</div>
						<router-link :to="`/students/history/detail/${item.id}`">
							<div class="collection-item-box">
								<div class="bc-media pd-t-15 bc-row bc-c-f">
									<div class="bc-media-left">
										<img class="tuijian-article-img" :src="item.src_img" v-if="">
									</div>
									<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
										<div class=" bc-f-16rp bc-t-333 bc-f-b">{{ item.name }}</div>
										<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
											{{ item.sub_name }}
										</div>
									</div>
								</div>
								<div class="collection-but">
									<div class="collection-but-l">{{ item.column_name }}</div>
									<div class="collection-but-span">
										<span><i class="iconfont iconeye-"></i> {{ item.click_num }}</span>
										<span>{{ item.time }}</span>
									</div>
								</div>
							</div>
						</router-link>
					</div>
					<template slot="load-down">
						<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
							数据加载中...
						</div>
						<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.list.length === 0">
							<div class="collection-no">
								<img :src="`${config.path.static}/img/students/students-sc@2x.png`">
								<p>暂未浏览任何内容</p>
							</div>
						</div>
						<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.list.length > 0">
							暂无更多数据...
						</div>
					</template>
				</bv-scroll>
			</div>

			

			<div class="collection-fixed" v-if="if_translate">
				<label class="collection-fixed-all" for="checked-all" @click='checkedAll'>
					<input type="checkbox" id="checked-all" v-model='checked'>
					{{checked_all}}
				</label>
				<button class="collection-fixed-delete" @click="delect_data()">删除（{{ checkList.length }}）</button>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	//import WArrlist from '@components/wap/article/w-arrlist'
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "history",
		mixins: [scrollMixin()],
		components:{
			//WArrlist
		},
		data() {
			return {
				if_translate:false,
				if_btntxt: '编辑',
				checked_all: '全选',
				checked: false, //全选框
				checkList: []
			}
		},
		watch: {
			'checkList': {
				handler: function(val, oldVal) {
					if (val.length === this.load.data.list.length) {
						this.checked = true;
					} else {
						this.checked = false;
					}
				},
				deep: true
			}
		},
		methods: {
			checkedAll(){
				if(this.checked){//取消
					this.checked_all = '全选'
					this.checkList = []
				}else {//全选
					this.checked_all = '取消'
					this.checkList = []
					this.load.data.list.forEach((item,index)=>{
						this.checkList.push(item.id);
					})
				}
			},
			btn_handle() {
				if(this.if_btntxt=='编辑'){
					this.if_btntxt='取消';
					this.if_translate=true;
				}else{
					this.if_btntxt='编辑';
					this.if_translate=false;
				}
			},
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/Member_Index/histors', {
					params: {
						page: this.load.params.page++
					}
				}).then((res) => {
					console.log(res)
					const { data: resultData } = res;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if(resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.list = this.load.data.list.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});

			},

			delect_data(){
				//console.log(JSON.stringify(this.checkList))
				this.$axios.post('/api/Member_Index/histors_delete',{
					id:JSON.stringify(this.checkList)
				}).then(res => {
					if(this.checkList.length == 0){
						$toast({
							message: '至少选择一个',
							duration: 3000
						},);
						return
					}else {
						if(res.code == 200){
							$toast({
								message: '删除成功',
								duration: 3000
							},);
							setTimeout(()=>{
								location.reload();
							},3000)
						}
					}
					
				})
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.bc-flex{
		position: relative;
	}
	.tuijian-article-img{
		width: rem(120);
		height: rem(80);
	}
	.collection-main{
		overflow: hidden;
		margin-bottom: rem(40);
	}
	.collection-list{
		background: #fff;
		padding: 0 rem(15);
		transition: 1s;
		.collection-item{
			align-items: center;
			position: relative;
		}
		.collection-item-radio{
			position: absolute;
			left: rem(-35);
			top:0;
			bottom: 0;
			display: flex;
			align-items: center;
			input{
				position: absolute;
				width: rem(20);
				height: rem(20);
				visibility: hidden;
			}
			input+label {
				background: url($base-url+'/img/students/iconweixuanzhongyuanquan.png') no-repeat;
				background-size: 100%;
				width: rem(20);
				height: rem(20);
			}
			input:checked+label {background: url($base-url+'/img/students/iconxuanzhong1.png') no-repeat;background-size: 100%;}
		}
		.collection-item-box{
			flex: 1;
			border-bottom: 1px solid #e5e5e5;
			padding-top: rem(15);
		}
		&.if_translate{
			transform: translate(rem(35));
		}

		.collection-but{
			padding: rem(10) 0;
			display: flex;
			font-size: rem(12);
			color: #CA9F75;
			.collection-but-l{
				flex: 1;
			}
			.collection-but-span{
				text-align: right;
				color: #999;
				i{font-size: rem(12);}
				span{
					margin-left: rem(15);
				}
			}
		}
	}
	.collection-no{
		text-align: center;
		font-size: 14px;
		color: #C4B8AE;
		padding-top: rem(150);
		img{
			width: 60%;
		}
	}
	.collection-fixed{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #CA9F75;
		padding: 0 rem(10);
		height: rem(40);
		color: #fff;
		overflow: hidden;
		.collection-fixed-all{
			line-height: rem(40);
			input{
				opacity: 0;
				position: absolute;
			}
		}
		.collection-fixed-delete{
			line-height: rem(40);
			float: right;
		}
	}
</style>
