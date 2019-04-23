<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3' style='background: #f4f4f4'>
		
		<bv-header :header="{title:{value:'历史数据'}}"/>
		
		<div class="bc-bg-white bc-pd-b-10" v-if='pageData.extensionSchoolCount'>
			<!--<div class="bc-flex bc-flex-jc-sb bc-flex-ai-c bc-pd-10 bc-bd-b-e5e">-->
				<!--<span class="bc-f-14rp bc-bd-l-base bc-bd-w-3 bc-pd-l-5">分校推广分校</span>-->
				<!--<a class="bc-t-666 bc-f-12rp" href="{:U('details_schools')}">查询明细<span class="bc-inline-block bd-666 bc-arrow bc-arrow-xsmall bc-arrow-r"></span></a>-->
			<!--</div>-->
			<div class="bc-row bc-bg-white">
				<flow-title :options="{
	      name:'分校推广分校',
	      url:`${config.path.base}/member/office_president/details_schools.html`,
	      urlName:'查看更多'
			}"/>
			</div>
			
			<div class="bc-t-c bc-flex bc-bg-white bc-mg-b-10">
				<div class="bc-flex-1 bc-pd-tb-10  bc-bd-r-e5e">
					<div class="bc-t-base"><span class="f-1_1 bc-mg-r-5">
						{{pageData.extensionSchoolCount.schoolCount || 0}}</span><span class="bc-f-12rp">家</span>
					</div>
					<div class="bc-t-666 bc-mg-t-10">推广分校</div>
				</div>
				<div class="bc-flex-1 bc-pd-tb-10 bc-bd-r-e5e">
					<div class="bc-t-base"><span class="f-1_1 bc-mg-r-5">
						{{pageData.extensionSchoolCount.count_agency_money || 0}}
					</span><span class="bc-f-12rp">元</span></div>
					<div class="bc-t-666 bc-mg-t-10">推广总额</div>
				</div>
				<div class="bc-flex-1 bc-pd-tb-10">
					<div class="bc-t-base"><span class="f-1_1 bc-mg-r-5">
						{{pageData.extensionSchoolCount.count_reward_money || 0}}
					</span><span class="bc-f-12rp">元</span></div>
					<div class="bc-t-666 bc-mg-t-10">推广奖励</div>
				</div>
			</div>
		</div>
		
		
		<div>
			<!--分校推广商城收益-->
			<div class="bc-bg-white bc-pd-b-10">
				<div class="bc-row bc-bg-white">
					<flow-title :options="{
	      name:'分校推广商城收益',
	      url:`${config.path.base}/member/office_president/details_store.html`,
	      urlName:'查看更多'
			}"/>
				</div>
			
				<div class="bc-pd-10" style='padding-top: 0'>
					<table class="bc-table bc-table-pd-5 bc-t-c bc-bd-e5e f-0_8 bc-w-100" border='1'>
						<tr>
							<th class="table-head"><span>时间</span><span>会员</span></th>
							<th>当日收益(元)</th>
							<th>累计收益(元)</th>
						</tr>
						<template v-if="pageData.huangjin_total_money">
							<tr>
								<th>黄金商城</th>
								<td>{{pageData.huangjin_total_money_day || 0}}</td>
								<td>{{pageData.huangjin_total_money || 0}}</td>
							</tr>
						</template>
						
						<template v-if="pageData.baijin_total_money">
							<tr>
								<th>白金商城</th>
								<td>{{pageData.baijin_total_money_day || 0}}</td>
								<td>{{pageData.baijin_total_money || 0}}</td>
							</tr>
						</template>
						<template v-if="pageData.chuangke_total_money">
							<tr>
								<th>创客商城（1000）</th>
								<td>{{pageData.chuangke_total_money_day || 0}}</td>
								<td>{{pageData.chuangke_total_money || 0}}</td>
							</tr>
						</template>
						
						<tr>
							<th>创客商城（2000）</th>
							<td>{{pageData.chuangke2_total_money_day || 0}}</td>
							<td>{{pageData.chuangke2_total_money || 0}}</td>
						</tr>
						
						<tr>
							<th>合计</th>
							<td>{{pageData.today_total || 0}}</td>
							<td>{{pageData.cumulative_total || 0}}</td>
						</tr>
					</table>
				</div>
			</div>
			
			<!--分校推广300元桶装粮芯藻收益-->
			<div class="bc-bg-white bc-pd-tb-10">
					<div class="bc-row bc-bg-white">
						<flow-title :options="{
				      name:'分校推广300元桶装粮芯藻收益',
				      url:`${config.path.base}/member/office_president/details_lxz_300.html`,
				      urlName:'查看更多'
						}"/>
					</div>
				<div class="bc-pd-10" style='padding-top: 0' >
					<table class="bc-table bc-table-pd-5 bc-t-c bc-bd-e5e f-0_8 bc-w-100" border='1'>
						<tr>
							<th class="table-head"><span>时间</span><span>会员</span></th>
							<th>当日收益(元)</th>
							<th>累计收益(元)</th>
						</tr>
						<tr v-if='pageData.school_extension_profit'>
							<th>分校直推</th>
							<td>{{pageData.school_extension_profit.num_today || 0}}</td>
							<td>{{pageData.school_extension_profit.num_total || 0}}</td>
						</tr>
							<tr  v-if='pageData.school_qd_profit'>
								<th>渠道直推</th>
								<td>{{pageData.school_qd_profit.num_today || 0}}</td>
								<td>{{pageData.school_qd_profit.num_total || 0}}</td>
							</tr>
							<tr v-if='pageData.school_bonus_profit'>
								<th>奖金</th>
								<td>{{pageData.school_bonus_profit.num_today || 0}}</td>
								<td>{{pageData.school_bonus_profit.num_total || 0}}</td>
							</tr>
						<tr>
							<th>合计</th>
							<td>{{pageData.school_300_today || 0}}</td>
							<td>{{pageData.school_300_total || 0}}</td>
						</tr>
						
					</table>
				</div>
			</div>
			
			<!--店面补贴费-->
			<div class="bc-bg-white bc-pd-tb-10">
				<div class="bc-row bc-bg-white">
					<flow-title :options="{
				      name:'店面补贴费',
				      url:`${config.path.base}/details_goods`,
				      urlName:'查看更多'
						}"/>
				</div>
				<div class="bc-pd-10" style='padding-top: 0'>
					<table class="bc-table bc-table-pd-5 bc-t-c bc-bd-e5e f-0_8 bc-w-100" border='1'>
						<tr>
							<th class="table-head"><span>时间</span><span>会员</span></th>
							<th>当日收益(元)</th>
							<th>累计收益(元)</th>
						</tr>
						<tr v-if='pageData.schoolprofit'>
							<th>产品收益</th>
							<td>{{pageData.schoolprofit.today_profit || 0}}</td>
							<td>{{pageData.schoolprofit.profit || 0}}</td>
						</tr>
					</table>
				</div>
			</div>
			
			<!--分校福利收益-->
			<div class="bc-bg-white bc-pd-tb-10">
				<div class="bc-row bc-bg-white">
					<flow-title :options="{
				      name:'分校福利收益',
				      url:`${config.path.base}/member/office_president/details_fuli.html?today_lpjf=&lpjf=&today_fljf=&fljf=&today_seed=&seed=`,
				      urlName:'查看更多'
						}"/>
				</div>
				<div class="bc-pd-10" style='padding-top: 0'>
					<table class="bc-table bc-table-pd-5 bc-t-c bc-bd-e5e f-0_8 bc-w-100" border='1'>
						<tr>
							<th class="table-head"><span>时间</span><span>会员</span></th>
							<th>当日收益(元)</th>
							<th>累计收益(元)</th>
						</tr>
						<tr>
							<th>礼品积分</th>
							<td>{{pageData.totay_lpjf || 0}}</td>
							<td>{{pageData.lpjf || 0}}</td>
						</tr>
						<tr>
							<th>福利子金</th>
							<td>{{pageData.today_fljf || 0}}</td>
							<td>{{pageData.fljf || 0}}</td>
						</tr>
						<tr>
							<th>种子积分</th>
							<td>{{pageData.today_seed || 0}}</td>
							<td>{{pageData.seed || 0}}</td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		
	</bv-home-view>
</template>

<script>
	//流水item
	import OrderItem from '../components/order-item';
	//流水title
	import FlowTitle from '../components/flow-title';


	export default {
		name: "history",
		data() {
			return {
				pageData: {},
			}
		},
		created() {
			this.getData();
		},
		methods: {
			getData() {
				this.$axios.get('/member/office_president/history').then((res) => {
					const { data } = res.data;
					this.pageData = data;
				
				});
			}
		},
		components: {
			OrderItem,
			FlowTitle
		}
	}
</script>

<style scoped lang="scss">
	table th {
		color: #666;
		font-weight: 400;
	}
	th,td{
		padding:rem(5);
	}
	
	.table-head {
		background: no-repeat url(data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABQAAD/4QONaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjUtYzAyMSA3OS4xNTU3NzIsIDIwMTQvMDEvMTMtMTk6NDQ6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YzIyNjdiZGUtZDY3ZC0yOTRmLTkwNzAtMjJiMDBkMzhmZWNkIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkYzMUVDQUIyRTIwRjExRTc4NzY1Q0VENTdDNEJCQTQ4IiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkYzMUVDQUIxRTIwRjExRTc4NzY1Q0VENTdDNEJCQTQ4IiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjU0YTVlYzBkLWIzOTItN2E0ZC1hZTlmLTA4M2NkZjk4N2VhMSIgc3RSZWY6ZG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjBlMmJmNWRhLWRmZTgtMTFlNy05NGNhLWFkMDE1YmU3M2RhYSIvPiA8L3Jk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)
	}
	
	.table-head {
		background-size: 100% 100%;
		position: relative;
	}
	
	.table-head span:first-child {
		position: absolute;
		right: 5px;
		top: 2px;
	}
	
	.table-head span:last-child {
		position: absolute;
		left: 5px;
		bottom: 0;
	}
</style>
