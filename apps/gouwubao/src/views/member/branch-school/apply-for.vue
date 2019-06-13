<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<bv-header :header="{title:{value:'申请列表'}}"/>
		
		<div class="angel-table" v-if="schoolData">
			<div class="table-th">
				<div>活动主题</div>
				<div>申请时间</div>
				<div>活动开始时间</div>
				<div>申请状态</div>
			</div>
			<!--<div class="table-td">
				<div>
					活动主题活动主题活动主题活动主题活动主题活动主题活动主题
				</div>
				<div>2019年05月24号 16:43</div>
				<div>2019年05月24号 16:43</div>
				<div>
					<a class="zt-color" href="">
						已提交 <i class="icon icon-right"></i></a>
				</div>
			</div>-->
			<div class="table-td" v-for="(item,index) in schoolData">
				<div>
					{{ item.theme }}
				</div>
				<div>{{ item.create_time }}</div>
				<div>{{ item.start_date }}</div>
				<div>
					<a class="zt-color" :href="`/member/office_commonweal/apply_activity?id=${item.id}`">
						<template  v-if="item.status == 0">已提交</template>
						<template v-else-if="item.status == 1">未通过</template>
						<template  v-else-if="item.status == 2">已通过</template> <i class="icon icon-right"></i></a>
				</div>
			</div>
		</div>
		
	</bv-home-view>
</template>

<script>
	export default {
		name: "apply-for",
		data(){
			return {
				schoolData:''
			}
		},
		methods:{
			getapplyData() {
				this.$axios.get('/member/office_commonweal/apply_list').then((res) => {
					const { data } = res;
					this.schoolData = data;
				});
			}
		},
		mounted() {
			this.getapplyData();
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
	.angel-table{
		background: #fff;
		margin-top: rem(10);
		overflow: hidden;
		font-size: rem(12);
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
			div{padding: rem(5)}
		}
		.zt-color{
			color: #DCB46E;
		}
	}
</style>