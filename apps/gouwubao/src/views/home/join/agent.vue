<template>
	<bv-home-view :router-level="3" style="background-color:#EDEDED;padding-bottom:3rem;">

		<bv-header :header="{
	    title:{
	      value: '城市合伙人'
	    }
		}">
			<template slot="right-control">
				<div class="bc-t-r bc-pd-r-10" @click="$share({
					title: '点通宝代理权益页',
          descr: '走进人类幸福工程'
				})">
					<i class="icon icon-share"></i>
				</div>
			</template>
		</bv-header>

		<!-- 审核不通过 -->
		<div class="bc-row bc-pd-10rp" v-if="pageData.area_info && pageData.area_info.id">
			<div class="bc-row bc-pd-10rp bc-bg-white bc-bd-radius-10" style="box-shadow: 0 0 10px rgba(0,0,0,.2)">
				<div class="bc-row bc-t-base bc-mg-b-13rp bc-f-16rp">
					审核不通过
				</div>
				<div class="bc-flex bc-flex-ai-c bc-flex-jc-sb">
					<div class="bc-flex-2">
						<div class="bc-row bc-mg-b-4rp">
							<span>申请类型：</span>
							<span class="bc-t-999">{{pageData.area_info.area_type}}</span>
						</div>
						<div class="bc-row bc-mg-b-4rp">
							<span>申请区域：</span>
							<span class="bc-t-999">{{pageData.area_info.area}}</span>
						</div>
						<div class="bc-row bc-mg-b-4rp">
							<span>不通过原因：</span>
							<span class="bc-t-999">{{pageData.area_info.why}}</span>
						</div>

						<div class="bc-row bc-mg-b-4rp">
							您可点击下方申请按钮进行重新申请，如有疑问，请致电 <a href="tel:4000-6843-688" class="bc-t-base">4000-6843-688</a>
						</div>
					</div>
					<div class="bc-flex-1 bc-t-r">
						<img :src="`${staticPath}/pass-danger.png`" style="width: 4.86666666rem;height: 4.86666666rem;">
					</div>
				</div>
			</div>
		</div>

		<div class="bc-row bc-pd-b-15rp">
			<div class="bc-row bc-v-t bc-ps-r">
				<div class="bc-row">
					<img :src="`${staticPath}/banner-1.png`" class="bc-w-100">
				</div>
			</div>
			<div class="bc-row bc-v-t bc-v-t bc-ps-r  bc-t-c">

				<div class="bc-row">
					<img :src="`${staticPath}/banner-2.png`" class="bc-w-100">
				</div>

				<div class="bc-row bc-ps-a" style="bottom:4rem;">
					<template v-if="$store.getters.isLogin">
						<template v-if="pageData.area_info && pageData.area_info.id">
							<router-link :to="`/join/agent-apply?id=${pageData.area_info.id}`">
								<img :src="`${staticPath}/again-agent-1.png`" class="bc-w-70">
							</router-link>
						</template>
						<template v-else>
							<router-link to="/join/agent-apply">
								<img :src="`${staticPath}/join-agent-1.png`" class="bc-w-70">
							</router-link>
						</template>
					</template>

					<template v-else>
						<a @click="$login">
							<!-- 不是创客 -->
							<img :src="`${staticPath}/join-agent-1.png`" class="bc-w-70">
						</a>
					</template>
				</div>

				<bv-swiper-scroll class="bc-row bc-ps-a creator-tips" :current-index="currentScrollIndex" direction="y">
					<template slot="scroll-items">
						<div v-for="item in pageData.areas" class="bc-t-hide">
							<span class="bc-t-base">{{item.nickname}}</span><span>刚刚成为了代理</span>
						</div>
					</template>
				</bv-swiper-scroll>

			</div>

			<div class="bc-row bc-v-t bc-pd-lr-15rp">
				<div class="bc-row bc-mg-t-20rp bc-bd-radius-6 bc-overflow-hide" style="border:1px solid #CDA47D;">
					<img :src="`${staticPath}/banner-3.png`" class="bc-w-100">
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-4.png`" class="bc-w-100">
					</div>
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp">
					<div class="bc-row">
						<router-link to="/join/creator">
							<img :src="`${staticPath}/banner-5.png`" alt="" class="bc-w-100"/>
						</router-link>
					</div>
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp bc-overflow-hide" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-6.png`" alt="" class="bc-w-100"/>
					</div>
					<div class="bc-t-c bc-mg-tb-10rp bc-pd-lr-20rp">
						<div id="agentVideo" class="prism-player video"></div>
					</div>
				</div>
			</div>
		</div>

		<template slot="other">
			<div class="bc-row bc-ps-f bc-v-t" style="bottom:0;left:0;z-index:10000;">

				<!-- 没有登录 -->
				<template v-if="$store.getters.isLogin">
					<template v-if="pageData.area_info && pageData.area_info.id">
						<router-link :to="`/join/agent-apply?id=${pageData.area_info.id}`">
							<img :src="`${staticPath}/again-agent-2.png`" class="bc-w-100">
						</router-link>
					</template>
					<template v-else>
						<router-link to="/join/agent-apply">
							<!-- 已经是创客 -->
							<img :src="`${staticPath}/join-agent-2.png`" class="bc-w-100">
						</router-link>
					</template>
				</template>

				<template v-else>
					<a @click="$login">
						<!-- 不是vip -->
						<img :src="`${staticPath}/join-agent-2.png`" class="bc-w-100">
					</a>
				</template>

			</div>
		</template>

	</bv-home-view>
</template>

<script>

	import AliVideoPlayer from '@assets/js/ali-video-player';

  export default {
    name: "join-agent",
    data() {
      return {
        timer: 0,
        pageData: [],
        currentScrollIndex: 0,
        video: {
          vid: false,
          playauth: ''
        }
      }
    },
    computed: {
      staticPath() {
        return `${this.config.path.static}/img/home/join/agent`;
      }
    },
    methods: {
      auto() {
        const areas = this.pageData.areas;
        this.timer = setTimeout(() => {
          if (this.currentScrollIndex === (areas.length - 1)) {
            this.currentScrollIndex = 0;
          } else {
            ++this.currentScrollIndex;
          }
          this.auto();
        }, 2000);
      },
      getData() {
        this.$axios.get('/member/area_apply/main').then((res) => {
          const { data } = res;
          this.pageData = data;
          if (data.areas.length > 0) {
            this.auto();
          }
        });

        this.$axios.get('/api/video/index').then((res) => {
          const { data } = res;
          new AliVideoPlayer({
            id: 'agentVideo',
            vid: data.videoId,
            height: '170px',
            playauth: data.playauth,
            cover: 'https://imagedev.dtb315.com/687378.jpg'
          });
        });

      }
    },
    created() {
      this.getData();
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    mounted() {
      this.$weChatShare({
        title: '点通宝代理权益页',
        desc: '走进人类幸福工程'
      });
    }
  }
</script>

<style scoped lang="scss">
	.creator-tips {
		position: absolute;
		overflow: hidden;
		text-align: center;
		padding: 0 rem(15);
		color: white;
		font-size: rem(14);
		line-height: 1.8;
		bottom: rem(20);
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: rem(27);
		background-size: 100% 100%;
	}
</style>