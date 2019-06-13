<template>
	<bv-home-view :router-level="3" style="background-color: rgb(244,244,244);">

		<bv-header :header="{
	    title:{
	      value: '待结算收益'
	    }
		}"/>

		<div class="bc-row">
			<div class="bc-row bc-bg-white bc-t-c bc-mg-t-10rp">
				<div class="bc-row bc-f-15rp bc-pd-10rp">
					累计收益（通宝）
				</div>
				<div class="bc-row bc-f-30rp bc-pd-lr-10rp bc-pd-b-10rp">
					{{pageData.waitSettle || '0.00'}}
				</div>
			</div>
		</div>

		<flow-title class="bc-mg-t-10rp" :options="{
      name:'待结算明细'
		}"/>

		<bv-scroll :api="api" :disabled="load.state.disabled">
			<div class="bc-row bc-bg-white">
				<order-item :key="index" type="wait" :item="item" v-for="(item,index) in load.data.list" class="bc-bd-b-e5e"/>
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
	</bv-home-view>
</template>

<script>

	//流水title
  import FlowTitle from '../components/flow-title';
  import OrderItem from '../components/order-item';
  import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';

  export default {
    name: "wait-settle",
    mixins: [scrollMixin()],
    data() {
      return {
        pageData: {}
      };
    },
    methods: {
      api() {
        const page = this.load.params.page++;
        return this.$axios.get('/member/creator/wait_settle_detail', {
          params: {
            p: page,
            start_time: !this.startTime ? this.startTime : `${this.startTime} 00:00:00`,
            end_time: !this.endTime ? this.endTime : `${this.endTime} 23:59:59`
          }
        }).then((res) => {
          const { data: resultData } = res;
          if (scrollNoHasListData.call(this, {
              resultData,
              listKey: 'list'
            })) {
            scrollEndHook.call(this);
          } else {
            this.pageData = resultData;
            if (resultData.list.length < 10) scrollEndHook.call(this);
            this.load.data.list = this.load.data.list.concat(resultData.list);
          }
        }).catch(() => {
          return scrollEndHook.call(this);
        });
      },
    },
    components: {
      FlowTitle,
      OrderItem
    }
  }
</script>