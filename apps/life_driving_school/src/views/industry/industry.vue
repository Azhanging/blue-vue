<template>
	<!--产业研究-->
	<bv-home-view class='wap' style="background:rgba(244,244,244,1);;">

		<w-home-header :header="{
			title:{
				value: '生活导航'
			}
		}" :type=0>
			<div slot="right-control">
				<div class="bc-t-r">
					<router-link to="/search">
						<i class='iconfont iconicon-test bc-t-base bc-f-20rp bc-mg-r-10rp'></i>
					</router-link>
					<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp' @click='$share'  v-if="config.device.isApp"></i>
				</div>
			</div>
		</w-home-header>

		<div class="bc-flex-jc-c bc-t-c home-nav bc-pd-lr-12rp" style="background: #fff">
			<div class='bc-flex bc-flex-ai-c '>
				<div class="bc-flex-1 ">
					<a href="/" class="bc-t-666 bc-f-14rp">首页</a>
				</div>
				<div class="bc-flex-1" v-for="(item, index) in nav" :key="index">
					<a :class="[index !== 1 ? 'bc-t-666' : 'active','bc-pd-tb-9rp','bc-inline-block', 'bc-f-16rp']" @click="routerTo(item) "
					   v-if="item.name"
					>
						{{item.name}}
					</a>
				</div>
			</div>
		</div>

		<ul class="bc-pd-10rp industry">
			<li v-for="(item, index) in getData" :key="index">
					<div class="bc-mg-b-10rp bc-flex bc-flex-ai-c bc-bg-white bc-pd-tb-10"  @click="toDetail(item.id)">
						<div class="bc-flex-1 bc-t-c">
							<img class="industry-icon inline-block" :src="item.src_img" alt="">
						</div>
						<div class="bc-flex-4">
							<div class="bc-f-18rp bc-mg-b-10rp" style="color:#8C9E51">{{item.name}}</div>
							<div class="bc-f-11rp" style="color:#8C9E51">{{item.sub_content}}</div>
						</div>
						<div class="bc-flex-1">
							<button class="bc-btn bc-t-c bc-bd-radius-10" style="border:1px solid rgba(202,159,117,1);color:rgba(202,159,117,1);">
								进入
							</button>
						</div>
					</div>
			</li>
		</ul>


	</bv-home-view>

</template>

<script>
import router from '@router';
export default {
  name: "industry-research",
	data() {
    return {
      nav: [
        {
          name: '资讯',
          path: '/article/zixun',
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
	    getData: []
    }
	},
	mounted() {
    this.$axios.get('/api/Lndust_Ryaesearch/index')
	    .then(res => {
				const {code, data} = res.data;
				if (code === 200) {
				  this.getData = data;
				}
	    })
	    .catch(err => {
	      console.log(err);
	    })
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
    toDetail(article_id) {
      this.$router.push({'path':`${router.currentRoute.fullPath}/detail/${article_id}`});
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