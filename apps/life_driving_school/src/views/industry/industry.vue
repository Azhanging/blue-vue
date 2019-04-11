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

		<div class="bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp" style="background: #fff">
			<div class='bc-flex bc-flex-ai-c ' >
				<a href="/" class="bc-flex-1 ">首页</a>
				<div class="bc-flex-2" v-for="(item, index) in nav" :key="index">
					<a class="bc-flex-1" :class="[1 !== index ? 'bc-t-666' : 'active','bc-pd-tb-9rp','bc-inline-block']" @click="routerTo(item) "
					   v-if="item.name"
					>
						{{item.name}}
					</a>
				</div>
			</div>
		</div>

		<div class="bc-pd-10rp industry">

				<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10" @click="toDetail(1)">
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

				<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10"  @click="toDetail(2)">
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

				<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10"  @click="toDetail(3)">
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
          name: '资讯',
          path: '/zixun',
	        id: 1,
          params: {
            type: "zixun"
          }
        }, {
          name: '产业研究',
          path: '/industry',
		      id: 2
        }],
      activeIndex: 2,
    }
	},
  methods: {
    routerTo(item) {
      const { id } = item;
      this.$router.push(this.$router.routerID.getPathID({
        id: id, // 和后台id 对应
        params: {
          id: id // 对应router里面的id
        }
      }));
    },
    toDetail(type) {
      this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${type}`});
    }
  }
}
</script>

<style scoped lang="scss">
	.wap {
		.home-nav {
			border-bottom: 1px #eee solid;
			.active {
				color: $color-base;
				border-bottom: 2px $color-base solid;
			}
		}
		.industry {
			.industry-icon {
				width: rem(41);
				height: rem(41);
			}
		}

	}


</style>