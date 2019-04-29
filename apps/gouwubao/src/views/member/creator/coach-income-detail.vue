<!-- 辅导收益 -->
<template>
	<bv-home-view :router-level="3" style="background-color: rgb(244,244,244);">
		<bv-header :header="{
      title:{
        value:'辅导收益明细'
      }
		}"/>

		<div class="bc-row bc-pd-tb-10rp bc-bg-white bc-t-666 bc-flex bc-flex-ai-c bc-flex-jc-c bc-t-c">
			<span>选择时间：</span>
			<span class="bc-inline-block bc-pd-tb-5rp bc-pd-lr-10rp bc-bd-e5e" @click="openPicker('picker0')">
				{{startTime || '开始时间' }}
			</span>
			<span class="bc-inline-block bc-pd-lr-10rp">至</span>
			<span class="bc-inline-block bc-pd-tb-5rp bc-pd-lr-10rp bc-bd-e5e" @click="openPicker('picker1')">
				{{endTime || '结束时间'}}
			</span>
			<button class="bc-btn bc-btn-base bc-mg-l-2" style="padding:0.3333rem;" @click="search">
				搜索
			</button>
		</div>

		<bv-scroll :api="api" :disabled="load.state.disabled">
			<div class="bc-row bc-bg-white bc-mg-t-15rp">
				<order-item type="coach" :item="item" v-for="(item,index) in load.data.lists" :key="index" class="bc-bd-b-e5e"/>
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

		<template slot="other">

			<mt-datetime-picker
				type="date"
				ref="picker0"
				year-format="{value} 年"
				month-format="{value} 月"
				date-format="{value} 日"
				@confirm="checkStartTime"
			/>

			<mt-datetime-picker
				type="date"
				ref="picker1"
				year-format="{value} 年"
				month-format="{value} 月"
				date-format="{value} 日"
				@confirm="checkEndTime"
			/>

		</template>

	</bv-home-view>
</template>

<script>
 //流水item
 import OrderItem from '../components/order-item';
 //时间搜索
 import dateSearch from '../assets/js/date-search';
 import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';

 export default {
   name: "coach-income-detail",
   mixins: [scrollMixin(), dateSearch()],
   components: {
     OrderItem
   },
   methods: {
     api() {
       const page = this.load.params.page++;
       return this.$axios.get('/member/creator/coach_detail', {
         params: {
           p: page,
           start_time: !this.startTime ? this.startTime : `${this.startTime} 00:00:00`,
           end_time: !this.endTime ? this.endTime : `${this.endTime} 23:59:59`
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
     }
   }
 }
</script>