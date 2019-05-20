<template>
	<div class="bc-pd-tb-15rp bc-mg-lr-15rp bc-bg-white" v-if="item">

		<!-- 订单类型的item -->
		<div class="bc-flex" v-if="type === 'order' ">
			<div class="bc-flex-2">
				<div class="bc-row bc-pd-tb-2rp">
					订单号：{{item.oid}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					时间：{{item.create_time}}
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						类型：{{item.from_username ||item.content }}
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						+{{item.num}}
					</div>
				</div>
			</div>
		</div>

		<!-- 辅导收益的item -->
		<div class="bc-flex" v-else-if="type === 'coach' ">
			<div class="bc-flex-2">
				<div class="bc-row bc-pd-tb-2rp">
					订单号：{{item.oid}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					来源：{{item.from_username ||item.content }}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					日期：{{item.create_time}}
				</div>
			</div>
			<div class="bc-flex-1 bc-t-r">
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					{{item.content}}
				</div>
				<div class="bc-row bc-pd-tb-2rp">
					+{{item.num}}
				</div>
			</div>
		</div>

		<!-- 待结算收益的item -->
		<div class="bc-flex" v-else-if="type === 'wait'">
			<div class="bc-flex-2">
				<div class="bc-row bc-pd-tb-2rp">
					订单号：{{item.oid}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					时间：{{item.create_time}}
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						订单状态：{{item.status}}
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						+{{item.total}}
					</div>
				</div>
			</div>
		</div>

		<!-- 运营经费 -->
		<div class="bc-flex" v-else-if="type === 'operating' ">
			<div class="bc-flex-2">
				<div class="bc-row bc-pd-tb-2rp">
					订单号：{{item.sn}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					时间：{{item.create_time}}
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						申请人：{{item.apply_phone }}
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						+{{item.num}}
					</div>
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					推荐人：{{item.referee_phone}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					申请区域：{{item.area}}
				</div>
			</div>
		</div>
		
		
		<!-- 上大夫学院办公司-区域收益 -->
		<div class="bc-flex" v-else-if="type === 'college' ">
			<div class="bc-flex-2">
				<div class="bc-row bc-pd-tb-2rp">
					流水号：{{item.sn}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					订单号：{{item.oid}}
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						类型：商学院收益
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						+{{item.num}}
					</div>
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					来源：{{item.phone}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					日期：{{item.create_time}}
				</div>
			</div>
		</div>
		
		
		
		<!-- 消费商办公司-收益明细 -->
		<div class="bc-flex" v-else-if="type === 'consumers' ">
			<div class="bc-flex-2">
				<div class="bc-row bc-pd-tb-2rp">
					流水号：{{item.oid}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					来源：{{item.from_username}}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					日期：{{item.create_time}}
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						积分：
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						{{item.webshop_pd_jf_num}}
					</div>
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						种子：
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						{{item.webshop_pd_welfare_num}}
					</div>
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						公益基金：
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						{{item.webshop_pd_seed_num}}
					</div>
				</div>
			</div>
		</div>
		
		<!-- 产品天使 收益明细 -->
		<div class="bc-flex" v-else-if="type === 'cpts-symx' ">
			<div class="bc-flex-2">
				<div class="bc-flex bc-pd-tb-2rp">
					<div class="bc-flex-1">
						流水号：{{item.sn }}
					</div>
					<div class="bc-t-r bc-t-333">
						{{item.content}}
					</div>
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						来源：{{item.phone }}
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						{{item.num}}
					</div>
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					日期：{{item.create_time}}
				</div>
			</div>
		</div>
		<!-- 消费商办公司-历史-通宝收益明细 -->
		<div class="bc-flex" v-else-if="type === 'tb-earnings' ">
			<div class="bc-flex-2">
				<div class="bc-flex bc-pd-tb-2rp">
					<div class="bc-flex-1">
						流水号：{{item.sn }}
					</div>
					<div class="bc-t-r bc-t-333">
						{{item.content || '分享收益' }}
					</div>
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					<div class="bc-flex-1">
						来源：{{item.from_username }}
					</div>
					<div class="bc-flex-1 bc-t-r bc-t-333">
						+{{ item.num }}
					</div>
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					日期：{{item.create_time}}
				</div>
			</div>
		</div>
		
		<!-- 消费商办公司-历史-商场收益明细 -->
		<div class="bc-flex" v-else-if="type === 'sc-earnings' ">
			<div class="bc-flex-2">
				<div class="bc-flex bc-pd-tb-2rp">
					<div class="bc-flex-1">
						流水号：{{item.sn }}
					</div>
					<div class="bc-t-r bc-t-333">
						+{{item.num}}
					</div>
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					类型：{{item.create_time}}
				</div>
				<div class="bc-flex bc-pd-tb-2rp bc-t-999">
					来源：{{item.from_username }}
				</div>
				<div class="bc-row bc-pd-tb-2rp bc-t-999">
					日期：{{item.create_time}}
				</div>
			</div>
		</div>
		
	</div>

</template>

<script>
export default {
  name: "order-item",
  props:['item','type']
}
</script>