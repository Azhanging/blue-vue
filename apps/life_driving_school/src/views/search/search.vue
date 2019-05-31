<template>
	<bv-home-view class='wap' :router-level='2' style="background:rgba(244,244,244,1);">
		<!-- 测试按钮 <button @click="search(keywords)" style="position:absolute;left:0;top:0;z-index:5000;">测试按钮：点击搜索</button>-->

		<form id="form" action="" method="" @submit.prevent="search(keywords)">
			<div id="search" class="bc-row bc-bg-white v-m bc-ps-f" style="left:0;top:0;z-index:200;max-width:30rem;">
				<div class="search-header bc-flex bc-flex-jc-c bc-flex-ai-c bc-pd-tb-10rp bc-pd-lr-10rp">
					<div class="bc-flex-10 bc-ps-r">
						<input class="search-input  bc-bd-none bc-bd-e5e bc-bd-radius-5"
						       style="" type="text" placeholder="搜索" name="keywords"
						       v-model="keywords"
						>
						<img class="clearInput-icon" :src="`${config.path.static}/img/home/search/clearInput.png`" alt="" v-if="clearInputShow" @click="clearInput">
					</div>
					<div class="bc-flex-1" style="color:#CA9F75" @click="goBack">
						取消
					</div>
				</div>
			</div>

			<div class="search-content">
				<div class="bc-ps-f" style="left:0;right:0;top:0;bottom:0;z-index:20000;background:rgba(244,244,244,1);" v-if="infoShow.status === -1">
					<img class="bc-w-100 bc-mg-t-50rp" style="" :src="`${config.path.static}/img/home/search/404.png`" alt="">
				</div>
				<div class="bc-mg-t-50rp" v-else-if="infoShow.status === 1">
					<img class="bc-w-100" :src="`${config.path.static}/img/home/search/default.png`" alt="">
				</div>
				<div class="bc-mg-t-50rp" v-else-if="infoShow.status === 0">
					<img class="bc-w-100" :src="`${config.path.static}/img/home/search/unresult.png`" alt="">
				</div>

				<div class="" v-else>
					<bv-scroll :api="api" :disabled="load.state.disabled">
						<search-arrlist :list='load.data.lists'></search-arrlist>
						<template slot="load-down">
							<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
								数据加载中...
							</div>
							<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.lists.length === 0">
								暂无数据
							</div>
							<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.lists.length > 0">
								暂无更多数据...
							</div>
						</template>
					</bv-scroll>
				</div>

			</div>
		</form>



	</bv-home-view>
</template>

<script>
	  import searchArrlist from './search-content/search-arrlist';
    import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';

    export default {
      name: "search",
      mixins: [scrollMixin()],
      data() {
        return {
          infoShow: {
            status: 1
          },
          keywords: ''
        }
      },
      methods: {
        search(keywords) {
          if (keywords) {
            this.infoShow.status = 2;
            this.load.params.page = 1;
            this.load.data.lists = [];
            this.api();
            // this.$axios.get('/api/search/index',{
            //   params: {
            //     keywords: keywords,
            //     page: 1
            //   }
            // })
            //   .then(res => {
            //     const {code} = res.data;
            //     if ( code == 200) {
            //       this.infoShow.status = 2;
            //     } else if (code == 1015) {
            //       this.infoShow.status = 0;
            //     }
            //   })
            //   .catch(err => {
            //     this.infoShow.status = -1;
            //   });
          } else {
            this.$toast({
              message: '请输入搜索内容!',
              iconClass: 'iconfont iconfail bc-t-warning'
            });
          }
        },
        goBack() {
          this.$router.go(-1);
        },
        clearInput() {
          this.keywords = '';
          this.infoShow.status = 1;
        },
        api() {
          return this.$axios.get('/api/search/index', {
            params: {
              keywords: this.keywords,
              page: this.load.params.page++
            }
          }).then((res) => {
            const { data: resultData } = res.data;
            if (scrollNoHasListData.call(this, {
              resultData,
              listKey: 'list'
            })) {
              if (this.load.data.lists && this.load.data.lists.length === 0) {
                this.infoShow.status = 0;
              }
              scrollEndHook.call(this);
            } else {
              this.load.data.lists = this.load.data.lists.concat(resultData.list);
            }
          }).catch((error) => {
            console.log(error);
            this.infoShow.status = -1;
            return scrollEndHook.call(this);
          });
        }

      },
      components: {
        "search-arrlist": searchArrlist
      },
      computed: {
        clearInputShow() {
          return this.keywords.length > 0
        }
      },
	    watch: {
        keywords(newVal) {
          this.keywords =	newVal.length >= 10 ? newVal.slice(0, 10) : newVal;
        }
	    }
    }
</script>

<style scoped lang="scss">
	#search {
		.search-header {
			height: rem(30);

			.search-input {
				width: 90%;
				padding: rem(5) 0 rem(5) rem(15);
				background: rgba(244, 244, 244, 1);
				/*color:#CA9F75;*/
			}

			.clearInput-icon {
				position: absolute;
				width: rem(15);
				height: rem(15);
				right: rem(25);
				top: rem(7);
			}
		}
	}

	.search-icon {
		width: rem(15);
		height: rem(15);
	}
</style>