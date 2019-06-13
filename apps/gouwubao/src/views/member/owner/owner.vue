<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header :header="{title:{value:'项目金主办公室'}}"/>
		
		<div class="angel-header bc-flex bc-pd-b-15rp bc-pd-t-15rp bc-flex-ai-c" v-if="lenderData">
			<div class="bc-pd-r-15rp bc-mg-l-15rp">
				<img :src="lenderData.list.memberInfo.head_img" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-f-b">
					项目金主
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					消费金额：{{ lenderData.list.memberInfo.total }}元
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					消费时间：{{ lenderData.list.memberInfo.create_time }}
				</div>
			</div>
			<div class="angel-sm">
				<a @click="btn_toast">项目金主说明<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		<div class="bc-mg-tb-10rp bc-bg-white">
			<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp">
				<div class="bc-f-b bc-flex-1">我参与的项目</div>
				<div><a @click="to_xmpath()" class="bc-t-999 bc-f-12rp">更多项目&gt;</a></div>
			</div>
			
			<template v-if="lenderData">
				<div class="bc-flex bc-pd-lr-15rp bc-pd-b-10rp" v-for="(item,index) in lenderData.list.project_list">
					<div><img class="bcitem-img" :src="item.project_img_wap"></div>
					<div class="bc-flex-1 bc-mg-l-10rp">
						<div class="bc-t-333 bc-f-14rp bc-mg-t-10rp bc-f-b">{{ item.project_name }}</div>
						<div class="bc-t-666 bc-flex bc-f-12rp bc-mg-t-10rp">
							<div class="bc-flex-1">上线时间: {{ item.start_time }}</div>
							<div>完成{{ item.percent }}%</div>
						</div>
						<div class="xm-progress">
							<progress max="100" :value="item.percent"></progress>
						</div>
						<div class="bc-mg-t-10rp xm-btn"><a @click="to_xmlistpath(item.id)">查看项目福利&gt;</a></div>
					</div>
				</div>
			</template>
			
			
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-b-10rp bc-pd-b-10rp bc-bd-b-e5e">
			<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp">
				<div class="bc-f-b bc-flex-1">平台最新动态</div>
				<div><router-link to="/member/owner/recent-news" class="bc-t-999 bc-f-12rp">查看全部&gt;</router-link></div>
			</div>
			<div class="bc-row bc-pd-l-10rp bc-pd-r-10rp" v-if="lenderData">
				<div  v-for="(item,index) in lenderData.zixun_list">
					<a :href="item.url">
						<div class="bc-flex bc-pd-5rp bc-f-12rp bc-t-666">
							<div class="bc-flex-2 xm-ovhide">
								{{ item.name }}
							</div>
							<div class="bc-flex-1 bc-t-r">{{ item.create_time }}</div>
						</div>
					</a>
				</div>
			</div>
		</div>
	
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	import programUrl from '@config/program-url';
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "owner",
		data() {
			return {
				lenderData:''
			}
		},
		created() {
			this.getData();
		},
		computed: {
		
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_lender/index').then((res) => {
					const { data } = res;
					this.lenderData = data;
				});
			},
			to_xmpath(){
				location.href = `${programUrl['cai-fu-bao']}`;
			},
			to_xmlistpath(id){
				location.href = `${programUrl['cai-fu-bao']}/project/details.html?id=${id}`;
			},
			btn_toast(){
				$toast({
					message: '敬请期待',
					duration: 3000
				});
			}
		},
		components: {
			StatisticsItem
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
	.angel-header {
		background: #F1DFB6 url($base-static-path + '/img/member/public/bgstop-bg.jpg') right bottom no-repeat;
		background-size: auto 100%;
		position: relative;
		.head-img {
			width: rem(60);
			height: rem(60);
			border-radius: 50%;
		}
		.angel-sm{
			background: #000;
			border-top-left-radius: rem(15);
			border-bottom-left-radius: rem(15);
			overflow: hidden;
			position: absolute;
			right: 0;
			a{
				height: rem(28);
				line-height: rem(28);
				padding: 0 rem(10);
				color: #fff;
			}
		}
		.angel-co{
			color: #A86F2F;
		}
	}
	.angel-statistical{
		background: #fff;
		padding: rem(15) rem(15);
		border-bottom: 1px solid #e5e5e5;
		margin-top: rem(10);
		font-size: rem(16);
		color: #333;
		font-weight: bold;
	}
	.xm-ovhide{
		white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
	}
	.bcitem-img{
		width: rem(110);
		height: rem(110);
	}
	.xm-progress progress{
		width: 100%;
		height: rem(10);
		border: 0;
		color: #fff;
		background:#fff;
		border-radius: rem(10);
	}
	/* 表示总长度背景色 */
	progress::-webkit-progress-bar{
		background-color: #ebebeb;
		border-radius: rem(5);
	}
	/* 表示已完成进度背景色 */
	progress::-webkit-progress-value{
		background: #DCB46E;
		border-radius: rem(5);
	}
	.xm-btn a{
		background: #DCB46E;
		padding: rem(7) rem(10);
		border-radius: rem(15);
		color: #fff;
		font-size: rem(12);
	}
</style>
