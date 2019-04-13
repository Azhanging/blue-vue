<template>
	<bv-home-view class='wap' :router-level='2'>
		<w-home-header :header='{
            title:{
                value: "浏览历史"
            }
        }'
		>
			<div slot="right-control">
				<div class="bc-t-r bc-t-base bc-mg-r-10rp" @click="btn_handle">
					{{ if_btntxt }}
				</div>
			</div>
		</w-home-header>

		<div class="collection-main">
			<div class="collection-list" :class="if_translate?'if_translate':''">
				<bv-scroll :api="api" :disabled="load.state.disabled">
					<div class="collection-item" v-for="(item,index) in load.data.lists">
						<div class="collection-item-radio">
							<input type="checkbox" :id="'check'+index" :value="item.value" v-model="checkData">
							<label :for="'check'+index"></label>
						</div>
						<div class="collection-item-box">
							<div class="bc-media pd-t-15 bc-row bc-c-f">
								<div class="bc-media-left">
									<img class="tuijian-article-img" src="https://image.dtb315.com?src_img=/Uploads/image/2016-09-13/57d754e3c0a71.jpg&val=Thumb" v-if="">
								</div>
								<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
									<div class=" bc-f-16rp bc-t-333 bc-f-b">开篇语 阻击摧残生命的五大“杀手”</div>
									<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
										文章内容前面部分文章内容前面部分文
										章内容前面部分文章内容前面部分文...
									</div>
								</div>
							</div>
							<div class="collection-but">
								<div class="collection-but-l">成长系统-上大夫学院</div>
								<div class="collection-but-span">
									<span><i class="iconfont iconeye-"></i> 584</span>
									<span>2019-03-26</span>
								</div>
							</div>
						</div>

					</div>
					<template slot="load-down">
						<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
							数据加载中...
						</div>
						<div class="bc-t-c bc-pd-10rp" v-else>
							<div class="collection-no">
								<img src="http://pc.lifest.dtb315.cn/static/img/students/students-sc@2x.png">
								<p>暂未浏览任何内容</p>
							</div>
						</div>
					</template>
				</bv-scroll>
			</div>





			<div class="collection-fixed" v-if="if_translate">
				<label class="collection-fixed-all" id="checked-all" @click="checkAll($event)">
					<input type="checkbox" name="checked-all">
					{{checked_all}}
				</label>
				<button class="collection-fixed-delete">删除（2）</button>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	//import WArrlist from '@components/wap/article/w-arrlist'
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
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
				list: [{ // 后台请求过来的数据
					name: '选项1',
					value: 'apple'
				},{
					name: '选项2',
					value: 'banana'
				},{
					name: '选项3',
					value: 'orange'
				}],
				ball:[
					{},{},
				],
				checkData: []
			}
		},
		watch: { // 监视双向绑定的数据数组
			checkData: { // 监视双向绑定的数组变化
				handler(){
					if(this.checkData.length == this.list.length){
						document.querySelector('#checked-all').checked = true;
					}else {
						document.querySelector('#checked-all').checked = false;
					}
				},
				deep: true
			}
		},
		methods: {
			btn_handle() {
				if(this.if_btntxt=='编辑'){
					this.if_btntxt='取消';
					this.if_translate=true;
				}else{
					this.if_btntxt='编辑';
					this.if_translate=false;
				}
			},
			checkAll(e){ // 点击全选事件
				if(e.target.checked){
					this.list.forEach((el,i)=>{
						// 数组里没有这一个value才push，防止重复push
						if(this.checkData.indexOf(el.value) == '-1'){
							this.checkData.push(el.value);
						}
						this.checked_all = '取消'
					});
				}else { // 全不选选则清空绑定的数组
					this.checkData = [];
					this.checked_all = '全选'
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
					const { data: resultData } = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						const {disabled} = scrollEndHook.call(this);
						this.load.state.disabled = disabled
					} else {
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});

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
				background: url(http://pc.lifest.dtb315.cn/static/img/students/iconweixuanzhongyuanquan.png) no-repeat;
				background-size: 100%;
				width: rem(20);
				height: rem(20);
			}
			input:checked+label {background: url(http://pc.lifest.dtb315.cn/static/img/students/iconxuanzhong1.png) no-repeat;background-size: 100%;}
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
