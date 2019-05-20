<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header :header="{title:{value:`${roletitle}办公室`}}"/>
		
		<div class="angel-header bc-flex bc-flex-ai-c" v-if="schoolData">
			<div class="bc-pd-r-15rp bc-mg-l-15rp">
				<img :src="schoolData.memberImg" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-f-b" v-if="role17 > 0 && allows4 != -1">
					公益分校
				</div>
				<div class="bc-f-18rp bc-f-b" v-else-if="allows4 != -1">
					公益组织
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					入驻时间：{{ schoolData.create_time }}
				</div>
			</div>
			<div class="angel-sm bc-mg-tb-44rp">
				<a @click="btn_toast">
					<template v-if="role17 > 0 && allows4 != -1">公益分校</template><template  v-else-if="allows4 != -1">公益组织</template>说明
					<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		<StatisticsItem2 v-if="schoolData" :options="{
	    title:{
	      name:'活动数据统计',
	    },
	    otherNum:[{
	      name:'开展活动',
	      num: `${schoolData.activity_count || 0 }次`
	    },{
	      name:'参与人数',
	      num: `${schoolData.apply_count || 0 }人`
	    },{
	      name:'报名率',
	      num: `${schoolData.activity_apply_procent || 0 }%`
	    },{
	      name:'签到率',
	      num: `${schoolData.activity_vote_procent || 0 }%`
	    }]
		}"/>
		
		<div class="bc-bg-white" v-if="role17 > 0 && allows4 != -1">
			<a href="https://sdf531.kuaizhan.com/92/25/p5274804900168a">
				<div class="bc-pd-10rp bc-flex bc-bd-b-e5e">
					<div class="bc-flex-1 bc-pd-l-10rp item-color bc-f-b">生命驾校系统课程</div>
					<div><i class="icon icon-right bc-t-999"></i></div>
				</div>
			</a>
			<router-link to="/member/branch-school/material">
				<div class="bc-pd-10rp bc-flex bc-bd-b-e5e">
					<div class="bc-flex-1 bc-pd-l-10rp item-color bc-f-b">生命驾校物料下载</div>
					<div><i class="icon icon-right bc-t-999"></i></div>
				</div>
			</router-link>
			<router-link to="/member/branch-school/apply-for">
				<div class="bc-pd-10rp bc-flex bc-bd-b-e5e">
					<div class="bc-flex-1 bc-pd-l-10rp item-color bc-f-b">申请大型活动</div>
					<div><i class="icon icon-right bc-t-999"></i></div>
				</div>
			</router-link>
			<router-link to="/member/branch-school/release-course">
				<div class="bc-pd-10rp bc-flex bc-bd-b-e5e">
					<div class="bc-flex-1 bc-pd-l-10rp item-color bc-f-b">发布课程活动</div>
					<div><i class="icon icon-right bc-t-999"></i></div>
				</div>
			</router-link>
			<a href="https://sdf531.kuaizhan.com/48/73/p481335405f2b3b">
				<div class="bc-pd-10rp bc-flex bc-bd-b-e5e">
					<div class="bc-flex-1 bc-pd-l-10rp item-color bc-f-b">分校每日必做五件事</div>
					<div><i class="icon icon-right bc-t-999"></i></div>
				</div>
			</a>
		</div>
		
	
	</bv-home-view>
</template>

<script>
	import StatisticsItem2 from '../components/statistics-item2';
	
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "branch-school",
		props: ['member-info','type'],
		data() {
			return {
				schoolData:''
			}
		},
		created() {
			this.getData();
		},
		computed: {
			role17(){
				return this.$store.state.userInfo.role17;
			},
			allows4(){
				return this.$store.state.userInfo.allows.indexOf('4');
			},
			roletitle(){
				if(this.role17 > 0 && this.allows4 != -1){
					return '公益分校'
				}else {
					return '公益组织'
				}
			}
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_commonweal/index').then((res) => {
					const { data } = res.data;
					this.schoolData = data;
				});
			},
			btn_toast(){
				$toast({
					message: '敬请期待',
					duration: 3000
				});
			}
		},
		components: {
			StatisticsItem2
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
			vertical-align: top;
		}
		.angel-sm{
			background: #000;
			border-top-left-radius: rem(15);
			border-bottom-left-radius: rem(15);
			overflow: hidden;
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
	.item-color{
		color: #333;
		font-size: rem(15);
	}
</style>

