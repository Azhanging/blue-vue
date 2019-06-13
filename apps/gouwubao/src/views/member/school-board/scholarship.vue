<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<bv-header :header="{title:{value:'查询明细'}}"/>
		<div class="bc-pd-lr-15rp bc-pd-t-20rp scholarship" v-if="mxData">
			<div class="scholarship-box">
				<div class="scholarship-box-tit">校董奖学金总额(元)</div>
				<div class="scholarship-box-prc">￥{{ mxData.money || '0.00' }}</div>
			</div>
		</div>
		
		
		<div class="bc-row bc-bg-white bc-mg-t-15rp">
			<flow-title :options="{
	      name:'收益明细'
			}"/>
			<div class="angel-table bc-mg-lr-30rp" v-if="mxData">
				<div class="table-th">
					<div>时间</div>
					<div>收益明细</div>
					<div>类型</div>
				</div>
				<div class="table-td" v-for="(item,index) in mxData.res">
					<div>{{ item.create_time }}</div>
					<div>{{ item.num }}</div>
					<div>{{ item.content }}</div>
				</div>
			</div>
		</div>
		
		
		
		
		
	</bv-home-view>
</template>

<script>
	import FlowTitle from '../components/flow-title';
	export default {
		name: "scholarship",
		components: {
			FlowTitle
		},
		data() {
			return {
				mxData:''
			}
		},
		methods:{
			getmxData(){
				this.$axios.get('/member/office_honor/details').then((res) => {
					const { data } = res;
					this.mxData = data;
				});
			}
		},
		mounted() {
			this.getmxData();
		}
	}
</script>

<style scoped lang="scss">
	.scholarship{
		background: #46505A;
		.scholarship-box{
			background: url(#{$base-static-path + "/img/member/school-board/xdtop-bg.png"}) no-repeat;
			background-size: 100% 100%;
			text-align: center;
			overflow: hidden;
			.scholarship-box-tit{
				color: #333;
				font-size: rem(18);
				font-weight: bold;
				margin-top: rem(22);
				overflow: hidden;
			}
			.scholarship-box-prc{
				color: #B73939;
				font-size: rem(30);
				font-weight: bold;
				margin-top: rem(10);
				padding-bottom: rem(20);
			}
		}
	}
	
	.angel-table{
		background: #fff;
		overflow: hidden;
		.table-th, .table-td{
			display: flex;
			align-items: center;
			text-align: center;
			div{
				flex: 1;
				img{
					width: rem(33);
				}
			}
		}
		.table-th{
			padding: 0 0 rem(15) 0;
			border-bottom: 1px solid #e5e5e5;
		}
		.table-td{
			padding: rem(10) 0;
			color: #999;
		}
	}
</style>