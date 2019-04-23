<template>
	<bv-home-view :router-level="3" style="background-color:#EDEDED;padding-bottom:4rem;">

		<bv-header :header="{
	    title:{
	      value: 'VIP会员卡'
	    }
		}">
			<template slot="right-control">
				<div class="bc-t-r bc-pd-r-10" @click="$share({
					title: '点通宝VIP权益页',
          descr: '点通宝重磅推出VIP年卡'
				})">
					<i class="icon icon-share"></i>
				</div>
			</template>
		</bv-header>

		<div class="bc-row bc-pd-b-10rp">
			<div class="bc-row bc-v-t bc-ps-r">
				<bv-swiper-scroll class="bc-row bc-ps-a vip-tips bc-t-hide" :current-index="currentScrollIndex" direction="y" v-if="vipList.length > 0">
					<template slot="scroll-items">
						<div v-for="item in vipList" class="bc-t-hide">
							<span class="bc-t-base">{{item.nickname}}</span><span>刚刚成为了</span><span class="bc-t-base">VIP</span>
						</div>
					</template>
				</bv-swiper-scroll>
				<div class="bc-row">
					<img :src="`${staticPath}/banner-1.png`" class="bc-w-100">
				</div>
			</div>
			<div class="bc-row bc-v-t">
				<img :src="`${staticPath}/banner-2.png`" class="bc-w-100">
			</div>
			<div class="bc-row bc-v-t bc-pd-lr-15rp">
				<div class="bc-row bc-mg-t-20rp">
					<img :src="`${staticPath}/banner-3.png`" class="bc-w-100">
				</div>
				<div class="bc-row bc-mg-t-20rp">
					<img :src="`${staticPath}/banner-4.png`" class="bc-w-100">
				</div>

				<div class="bc-row bc-mg-tb-20rp bc-t-c">

					<!-- 没有登录 -->
					<template v-if="$store.getters.isLogin">
						<router-link to="/member/vip" v-if="isVip">
							<!-- 已经是vip -->
							<img :src="`${staticPath}/my-vip-1.png`" class="bc-w-80">
						</router-link>

						<router-link to="/join/vip-buy" v-else>
							<!-- 不是vip -->
							<img :src="`${staticPath}/join-vip-1.png`" class="bc-w-80">
						</router-link>

					</template>

					<template v-else>
						<a @click="$login">
							<!-- 不是vip -->
							<img :src="`${staticPath}/join-vip-1.png`" class="bc-w-80">
						</a>
					</template>

				</div>

				<div class="bc-row bc-mg-tb-20rp bc-bg-white bc-bd-radius-5" style="border:1px solid #CDA47D;">
					<router-link to="/join/creator">
						<div class="bc-row">
							<img :src="`${staticPath}/banner-5.png`" alt="" class="bc-w-100"/>
						</div>
					</router-link>
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-5 bc-overflow-hide" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-6.png`" alt="" class="bc-w-100"/>
					</div>
					<div class="bc-t-c bc-mg-tb-10rp bc-pd-lr-20rp">
						<div id="video" class="prism-player video"></div>
					</div>
				</div>

			</div>
		</div>

		<template slot="other">
			<div class="bc-row bc-ps-f bc-v-t" style="bottom:0;left:0;">

				<!-- 没有登录 -->
				<template v-if="$store.getters.isLogin">
					<router-link to="/member/vip" v-if="isVip">
						<!-- 已经是vip -->
						<img :src="`${staticPath}/my-vip-2.png`" class="bc-w-100">
					</router-link>

					<router-link to="/join/vip-buy" v-else>
						<!-- 不是vip -->
						<img :src="`${staticPath}/join-vip-2.png`" class="bc-w-100">
					</router-link>
				</template>

				<template v-else>
					<a @click="$login">
						<!-- 不是vip -->
						<img :src="`${staticPath}/join-vip-2.png`" class="bc-w-100">
					</a>
				</template>

			</div>
		</template>

	</bv-home-view>
</template>

<script>

	import AliVideoPlayer from '@assets/js/ali-video-player';
	
export default {
  name: "join-vip",
  data() {
    return {
      timer: 0,
      vipList: [],
      currentScrollIndex: 0,
      isVip: false,
      video: {
        vid: false,
        playauth: ''
      }
    };
  },
  computed: {
    staticPath() {
      return `${this.config.path.static}/img/home/join/vip`;
    }
  },
  methods: {
    auto() {
      this.timer = setTimeout(() => {
        if (this.currentScrollIndex === (this.vipList.length - 1)) {
          this.currentScrollIndex = 0;
        } else {
          ++this.currentScrollIndex;
        }
        this.auto();
      }, 2000);
    },
    getData() {
      this.$axios.get('/home/vip/index').then((res) => {
        const { data } = res.data;
        const { list, is_vip } = data;
        if(list.length > 0){
          this.auto();
        }
        this.vipList = list;
        this.isVip = is_vip;
      });

      this.$axios.get('/api/video/index').then((res) => {
        const { data } = res.data;
        new AliVideoPlayer({
          id: 'video',
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
	mounted(){
    this.$weChatShare({
      title: '点通宝VIP权益页',
      desc: '点通宝重磅推出VIP年卡'
    });
	}
}
</script>

<style scoped lang="scss">
	.vip-tips {
		position: absolute;
		overflow: hidden;
		text-align: center;
		padding: 0 rem(15);
		color: white;
		font-size: rem(14);
		line-height: 1.8;
		top: rem(20);
		left: 50%;
		transform: translateX(-50%);
		width: 80%;
		height: rem(30);
		background: url(https://imagedev.dtb315.com/665655.jpg) no-repeat center;
		background-size: 100% 100%;
	}
</style>