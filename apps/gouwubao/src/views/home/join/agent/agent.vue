<template>
	<bv-home-view :router-level="3" style="background-color:#EDEDED;padding-bottom:3.4rem;">

		<bv-header :header="{
	    title:{
	      value: '城市合伙人'
	    }
		}">
			<template slot="right-control">
				<div class="bc-t-r bc-pd-r-10" @click="$share">
					<i class="icon icon-share"></i>
				</div>
			</template>
		</bv-header>

		<div class="bc-row">
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
						<router-link to="/join/agent-apply">
							<img :src="`${staticPath}/join-agent-1.png`" class="bc-w-70">
						</router-link>
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
						<div v-for="item in list" class="bc-t-hide">
							<span class="bc-t-base">{{item.nickname}}</span><span>刚刚成为了创客先锋</span>
						</div>
					</template>
				</bv-swiper-scroll>

			</div>

			<div class="bc-row bc-v-t bc-pd-lr-15rp">
				<div class="bc-row bc-mg-t-20rp bc-bd-radius-6" style="border:1px solid #CDA47D;">
					<img :src="`${staticPath}/banner-3.png`" class="bc-w-100">
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-4.png`" class="bc-w-100">
					</div>
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp">
					<div class="bc-row">
						<router-link to="/join/agent-apply">
							<img :src="`${staticPath}/banner-5.png`" alt="" class="bc-w-100"/>
						</router-link>
					</div>
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-6.png`" alt="" class="bc-w-100"/>
					</div>
					<div class="bc-t-c bc-mg-tb-10rp">
						<video src="" width="80%"></video>
					</div>
				</div>

			</div>
		</div>

		<template slot="other">
			<div class="bc-row bc-ps-f bc-v-t" style="bottom:0;left:0;">

				<!-- 没有登录 -->
				<template v-if="$store.getters.isLogin">
					<router-link to="/join/agent-apply">
						<!-- 已经是创客 -->
						<img :src="`${staticPath}/join-agent-2.png`" class="bc-w-100">
					</router-link>
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
export default {
  name: "join-agent",
  data() {
    return {
      timer: 0,
      list: [],
      currentScrollIndex: 0
    }
  },
  computed: {
    staticPath() {
      return `${this.$config.path.static}/img/home/join/agent`;
    }
  },
  methods: {
    auto() {
      this.timer = setTimeout(() => {
        if (this.currentScrollIndex === (this.list.length - 1)) {
          this.currentScrollIndex = 0;
        } else {
          ++this.currentScrollIndex;
        }
        this.auto();
      }, 2000);
    },
    getData() {
      this.$axios.get('/member/area_apply/main').then((res) => {
        const { data } = res.data;
        if (data.length > 0) {
          this.auto();
        }
        this.list = data;
      });
    }
  },
  created() {
    this.getData();
  },
  beforeDestroy() {
    clearTimeout(this.timer);
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
		font-size: rem(18);
		line-height: 1.7;
		bottom: rem(20);
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: rem(30);
		background-size: 100% 100%;
	}
</style>