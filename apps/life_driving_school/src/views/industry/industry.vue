<template>
	<!--产业研究-->
	<bv-home-view class='wap' style="background:rgba(244,244,244,1);;">

		<w-home-header :header="{
			title:{
				value: title
			}
		}" :type=0>
			<div slot="right-control">
				<div class="bc-t-r"></div>
			</div>
		</w-home-header>

		<w-home-nav :nav='nav' @router-to='_init' :active-index='activeIndex' style="background: #fff"></w-home-nav>

		<div class="bc-pd-10rp industry">

				<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10" @click="routerTo(1)">
					<div class="bc-flex-1 bc-t-c">
						<img class="industry-icon inline-block" :src="`${$config.path.static}/img/industry/dajiankang.png`" alt="">
					</div>
					<div class="bc-flex-4">
						<div class="bc-f-18rp bc-mg-b-10rp" style="color:#8C9E51">世界的大健康</div>
						<div class="bc-f-11rp" style="color:#8C9E51">内容内容内容内容内容</div>
					</div>
					<div class="bc-flex-1">
						<button class="bc-btn bc-t-c bc-bd-radius-10" style="border:1px solid rgba(202,159,117,1);color:rgba(202,159,117,1);">
							进入
						</button>
					</div>
				</div>

				<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10"  @click="routerTo(2)">
					<div class="bc-flex-1 bc-t-c">
						<img class="industry-icon inline-block" :src="`${$config.path.static}/img/industry/dtb.png`" alt="">
					</div>
					<div class="bc-flex-4">
						<div class="bc-f-18rp bc-mg-b-10rp" style="color:#715E56">人类的点通宝</div>
						<div class="bc-f-11rp" style="color:#715E56">内容内容内容内容内容</div>
					</div>
					<div class="bc-flex-1">
						<button class="bc-btn bc-t-c bc-bd-radius-10" style="border:1px solid rgba(202,159,117,1);color:rgba(202,159,117,1);">
							进入
						</button>
					</div>
				</div>

				<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10"  @click="routerTo(3)">
					<div class="bc-flex-1 bc-t-c">
						<img class="industry-icon inline-block" :src="`${$config.path.static}/img/industry/life_school.png`" alt="">
					</div>
					<div class="bc-flex-4">
						<div class="bc-f-18rp bc-mg-b-10rp" style="color:#7D4641">走进生命驾校</div>
						<div class="bc-f-11rp" style="color:#7D4641">内容内容内容内容内容</div>
					</div>
					<div class="bc-flex-1">
						<button class="bc-btn bc-t-c bc-bd-radius-10" style="border:1px solid rgba(202,159,117,1);color:rgba(202,159,117,1);">
							进入
						</button>
					</div>
				</div>


		</div>


	</bv-home-view>

</template>

<script>
import router from '@router';
export default {
  name: "industry-research",
	data() {
    return {
      allSelCopy: {},
      title: '生命导航',
      nav: [
        {
          nav_name: '首页',
          path: '/'
        },{
          nav_name: '资讯',
          path: '/zixun',
          params: {
            type: "zixun"
          }
        }, {
          nav_name: '产业研究',
          path: '/industry'
        }],
      activeIndex: 2,
    }
	},
  methods: {
    _init(opts = {}) {
      const { params } = opts;
    },
    routerTo(type) {
      this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${type}`})
      console.log('~');
    }
  }
}
</script>

<style scoped lang="scss">

.industry {
	.industry-icon {
		width: rem(41);
		height: rem(41);
	}
}
</style>