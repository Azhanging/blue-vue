<template>
	<bv-home-view :router-level='2' style="background-color: #f4f4f4;">

		<bv-header :header="{title:{value:'代理办公室'}}">
			<div slot="right-control">
				<div class="bc-t-r bc-mg-r-10rp member-sqtc">
					<router-link to="quit" append class="bc-t-333">
						申请退出
					</router-link>
				</div>
			</div>
		</bv-header>

		<!-- 办公室头部 -->
		<office-header :member-info="pageData.memberInfo" type="agent" class="bc-mg-b-10rp">
			<div
				class="area bc-t-white bc-t-c" slot="area"
				@click="showAreaToggle = !showAreaToggle"
				v-if="pageData.area && pageData.area.length > 1">
				<i class="icon icon-dizhi bc-f-10rp"></i>切换区域
			</div>
		</office-header>

		<!-- 统计 -->
		<statistics  :textType='"agent"' />

		<!-- 我的会员 -->
		<statistics-item v-if="pageData.area_member" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'我的区域会员',
	      url: `${config.path.base}/member/my_member/area_member?area_id=${$route.params.area_id}&level=${$route.params.level}`
	    },
	    num: {value:pageData.area_member.total},
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.area_member.today_add_num
	    },{
	      name:'昨日新增',
	      num: pageData.area_member.yest_add_num
	    }]
		}"/>

		<!--商城收益 -->
		<statistics-item class="bc-bd-b-e5e" v-if="pageData.mall_sale" :options="{
	    title:{
	      name:'商城收益',
	      url:`shop-income`
	    },
	    num: {value:pageData.mall_sale.total},
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.mall_sale.today_add_num
	    },{
	      name:'昨日新增',
	      num: pageData.mall_sale.yest_add_num
	    }],
	    bottomNum:{
	      name: '待结算收益：',
	      num: pageData.mall_sale.waitSettle,
	      url: `wait-settle`,
	      urlName: '点击查看'
	    }
		}"/>

		<!-- 我的县区代理 -->
		<statistics-item  v-if="pageData.memberInfo && pageData.memberInfo.level == 1 && pageData.areacount" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'我的县区代理',
	      url: `${config.path.base}/member/my_member/agent_member?area_id=${$route.params.area_id}&level=${$route.params.level}`
	    },
	    num: {value:pageData.areacount.total},
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.areacount.today_add_num
	    },{
	      name:'昨日新增',
	      num: pageData.areacount.yest_add_num
	    }]
		}"/>

		<!-- 运营经费 -->
		<statistics-item v-if="pageData.peratecount && pageData.memberInfo && pageData.memberInfo.level == 1" :options="{
	    title:{
	      name:'运营经费',
	      url:`operating-expenses`
	    },
	    num: {value:pageData.peratecount.total},
	    otherNum:[{
	      name:'今日新增',
	      num: pageData.peratecount.today_area_expenses
	    },{
	      name:'昨日新增',
	      num: pageData.peratecount.yest_area_expenses
	    }]
		}"/>

		<div class="bc-t-c bc-bg-white bc-t-base bc-pd-10rp bc-f-12rp" v-if="pageData.memberInfo && pageData.memberInfo.level == 1">
			<router-link :to="`history`" append class="bc-t-base">
				查看历史数据>>
			</router-link>
		</div>

		<!-- 运营支持 -->
		<operation class="bc-mg-t-10rp"/>

		<!-- 我的工具 -->
		<tools type="agent"/>

		<!-- 切换区域 -->
		<mt-actionsheet
			:actions="area || []"
			v-model="showAreaToggle">
		</mt-actionsheet>

	</bv-home-view>
</template>

<script>
	//办公室头部
  import OfficeHeader from '../components/office-header';
  //统计
  import Statistics from '../components/statistics';
  //统计的item
  import StatisticsItem from '../components/statistics-item';
  //营业支持
  import Operation from '../components/operation';
  //我的工具
  import Tools from '../components/tools';

  export default {
    name: "agent",
    data() {
      return {
        showAreaToggle: false,
        pageData: {}
      }
    },
    created() {
      this.getData();
    },
    watch: {
      ['$route']() {
        this.showAreaToggle = false;
      }
    },
    computed: {
      staticPath() {
        return `${this.config.path.static}/img/member/agent`
      },
      //计算区域
      area() {
        const allArea = [];
        const _this = this;
        const pageData = this.pageData;
        const params = this.$route.params;
        (pageData.area || []).forEach((area) => {
          //给mt-actionsheet组件使用的数据
          allArea.push({
            name: area.area_name,
            method() {
              if (params.area_id != area.area_id) {
                _this.$router.replace(`/member/agent/${area.area_id}/${area.level}`);
              } else {
                _this.showAreaToggle = false;
              }
            }
          });
        });
        return allArea;
      }
    },
    methods: {
      getData() {
        const params = this.$route.params;
        this.$axios.get('/member/AreaApply/areaApplyOffice', {
          params
        }).then((res) => {
          const { data } = res.data;
          this.pageData = data;
        });
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.$nextTick(() => {
        this.getData();
      });
      next();
    },
    components: {
      OfficeHeader,
      Statistics,
      StatisticsItem,
      Operation,
      Tools
    }
  }
</script>

<style lang="scss" scoped>
	.area {
		position: absolute;
		right: rem(10);
		display: inline-block;
		padding: rem(5);
		font-size: rem(12);
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
		background-color: black;
	}
</style>
