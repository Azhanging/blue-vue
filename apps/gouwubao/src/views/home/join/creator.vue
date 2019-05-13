<template>
	<bv-home-view :router-level="3" style="background-color:#EDEDED;padding-bottom:3rem;">

		<bv-header :header="{
	    title:{
	      value: '创客'
	    }
		}">
			<template slot="right-control">
				<div class="bc-t-r bc-pd-r-10" @click="$share({
					title: '点通宝创客权益页',
          descr: '引导健康消费，引领绿色创业，扶持良心企业，实现大健康梦想'
				})">
					<i class="icon icon-share"></i>
				</div>
			</template>
		</bv-header>

		<div class="bc-row bc-pd-b-15rp">

			<div class="bc-row bc-v-t bc-ps-r">
				<div class="bc-row">
					<img :src="`${staticPath}/banner-1.png`" class="bc-w-100">
				</div>
			</div>

			<div class="bc-row bc-v-t bc-v-t bc-ps-r bc-t-c">

				<div class="bc-row">
					<img :src="`${staticPath}/banner-2.png`" class="bc-w-100">
				</div>

				<div class="bc-row bc-ps-a" style="bottom:4rem;" >
					<template v-if="$store.getters.isLogin">
						<router-link to="/member/creator" v-if="isCreator">
							<!-- 是创客 -->
							<img :src="`${staticPath}/my-creator-1.png`" class="bc-w-70">
						</router-link>
						<router-link to="/join/creator-buy" v-else>
							<!-- 不是创客 -->
							<img :src="`${staticPath}/join-creator-1.png`" class="bc-w-70">
						</router-link>
					</template>

					<template v-else>
						<a @click="$login">
							<!-- 不是创客 -->
							<img :src="`${staticPath}/join-creator-1.png`" class="bc-w-70">
						</a>
					</template>

				</div>

				<bv-swiper-scroll class="bc-row bc-ps-a creator-tips bc-t-hide" :current-index="currentScrollIndex" direction="y">
					<template slot="scroll-items">
						<div v-for="item in list" class="bc-t-hide">
							<span class="bc-t-base">{{item.nickname}}</span><span>刚刚成为了创客先锋</span>
						</div>
					</template>
				</bv-swiper-scroll>

			</div>

			<div class="bc-row bc-v-t bc-pd-lr-15rp">

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-5.png`" alt="" class="bc-w-100"/>
					</div>
				</div>

				<div class="bc-row bc-bg-white bc-bd-radius-6 bc-mg-t-20rp bc-overflow-hide" style="border:1px solid #CDA47D;">
					<div class="bc-row">
						<img :src="`${staticPath}/banner-7.png`" alt="" class="bc-w-100"/>
					</div>
					<div class="bc-t-c bc-mg-tb-10rp bc-pd-lr-20rp">
						<div id="creatorVideo" class="prism-player video"></div>
					</div>
				</div>

			</div>
		</div>

		<template slot="other">
			<div class="bc-row bc-ps-f bc-v-t" style="bottom:0;left:0;z-index:10000;" >

				<!-- 没有登录 -->
				<template v-if="$store.getters.isLogin">
					<router-link to="/member/creator" v-if="isCreator">
						<!-- 已经是创客 -->
						<img :src="`${staticPath}/my-creator-2.png`" class="bc-w-100">
					</router-link>

					<router-link to="/join/creator-buy" v-else>
						<!-- 不是创客 -->
						<img :src="`${staticPath}/join-creator-2.png`" class="bc-w-100">
					</router-link>
				</template>

				<template v-else>
					<a @click="$login">
						<!-- 不是vip -->
						<img :src="`${staticPath}/join-creator-2.png`" class="bc-w-100">
					</a>
				</template>

			</div>
		</template>

	</bv-home-view>
</template>

<script>
	import AliVideoPlayer from '@assets/js/ali-video-player';

  export default {
    name: "join-creator",
    data() {
      return {
        timer: 0,
        list: [],
        currentScrollIndex: 0,
        isCreator: false,
        video: {
          vid: false,
          playauth: ''
        }
      };
    },
    computed: {
      staticPath() {
        return `${this.config.path.static}/img/home/join/creator`;
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
        this.$axios.get('/home/creator/index').then((res) => {
          const { data } = res.data;
          const { list, is_creator } = data;
          if (list.length > 0) {
            this.auto();
          }
          this.list = list;
          this.isCreator = is_creator;
        });

        this.$axios.get('/api/video/index').then((res) => {
          const { data } = res.data;
          new AliVideoPlayer({
            id: 'creatorVideo',
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
        title: '点通宝创客权益页',
        desc: '引导健康消费，引领绿色创业，扶持良心企业，实现大健康梦想'
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