<template>
	<bv-home-view :router-level="3" style="background-color:#f4f4f4;">
		<bv-header :header="{title:{value:'历史'}}"/>
		<!-- 历史 -->
		<div class="bc-row">
			<div class="bc-row bc-bg-white bc-t-c bc-mg-t-10rp">
				<div class="bc-flex">
					<div class="bc-flex-1 bc-mg-tb-26rp">
						<div class="bc-bd-r-e5e">
							<div class="bc-row bc-t-999">
								区域会员(位)
							</div>
							<div class="bc-row bc-f-b bc-f-16rp bc-pd-10rp">
								{{pageData.my_area_member}}
							</div>
						</div>
					</div>
					<div class="bc-flex-1 bc-mg-tb-26rp">
						<div class="bc-bd-r-e5e">
							<div class="bc-row bc-t-999">
								累计收益(通宝)
							</div>
							<div class="bc-row bc-f-b bc-f-16rp bc-pd-10rp">
								{{pageData.my_area_money}}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 历史列表 -->
		<flow-title class="bc-mg-t-10rp" :options="{
      name:'收入明细',
      url: `history-income`,
      urlName:'查看更多'
		}"/>

		<order-item :item="item" v-for="(item,index) in pageData.list" type="order" :key="index"/>

	</bv-home-view>
</template>

<script>

	import FlowTitle from '../components/flow-title';
  import OrderItem from '../components/order-item';

  export default {
    name: "history",
    created() {
      this.getData();
    },
    data() {
      return {
        pageData: {}
      };
    },
    methods: {
      getData() {
        this.$axios.get(`/member/AreaApply/area_history`, {
          params: this.$utils.extend(this.$route.params, {
            sign: true
          })
        }).then((res) => {
          const { data } = res.data;
          this.pageData = data;
        });
      }
    },
    components: {
      FlowTitle,
      OrderItem
    }
  }
</script>