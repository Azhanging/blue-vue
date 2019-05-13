<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header :header="{title:{value:'公益分校办公室'}}"/>
		
		<div class="angel-header bc-flex" v-if="schoolData">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp">
				<img :src="schoolData.memberImg" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-30rp bc-f-b">
					公益分校
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					入驻时间：{{ schoolData.create_time }}
				</div>
			</div>
			<div class="angel-sm bc-mg-t-44rp bc-mg-b-44rp">
				<router-link to="">
					公益分校说明
					<i class="icon icon-right"></i></router-link>
			</div>
		</div>
		
		<StatisticsItem2 v-if="schoolData" :options="{
	    title:{
	      name:'活动数据统计',
	    },
	    otherNum:[{
	      name:'开展活动',
	      num: `${schoolData.activity_count}次`
	    },{
	      name:'参与人数',
	      num: `${schoolData.apply_count}人`
	    },{
	      name:'报名率',
	      num: `${schoolData.activity_apply_procent}%`
	    },{
	      name:'签到率',
	      num: `${schoolData.activity_vote_procent}%`
	    }]
		}"/>
		
		<div class="bc-bg-white">
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
	export default {
		name: "branch-school",
		data() {
			return {
				schoolData:''
			}
		},
		created() {
			this.getData();
		},
		computed: {
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_commonweal/index').then((res) => {
					const { data } = res.data;
					this.schoolData = data;
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
		padding: rem(15) rem(20);
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

