<template>
	<m-home-view :router-level="2">
		<m-header :title="'下拉加载'"></m-header>
		<m-scroll :api="api" :disabled="load.state.disabled">
			<ul class="bc-reset-ul">
				<li v-for="item in load.data.lists" class="bc-pd-10">
					<a href="" class="bc-t-666">
						<div class="bc-media" v-blue-photo-swiper="{itemTag:'DIV'}">
							<div class="bc-media-left">
								<img :src="item.list_img" width="50" data-size="0x0" :msrc="item.list_img"/>
							</div>
							<div class="bc-media-body">
								<span>{{item.name}}</span>
							</div>
						</div>
					</a>
					<!--<ul class="bc-reset-ul" v-blue-photo-swiper="{itemTag:'LI'}">
						<li>
							<img :src="item.list_img" alt="" width="50" data-size="0x0" :msrc="item.list_img">
						</li>
					</ul>-->

				</li>
			</ul>
			<template slot="load-down">
				<div class="bc-t-c bc-pd-10" v-if="load.state.hasMore">
					数据加载中...
				</div>
				<div class="bc-t-c bc-pd-10" v-else>
					暂无数据...
				</div>
			</template>
		</m-scroll>
	</m-home-view>
</template>

<script>

	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';

  export default {
    name: "scroll",
    mixins: [scrollMixin()],
    data() {
      return {}
    },
    methods: {
      api() {
        const page = this.load.params.page++;
        return this.$axios.get('/home/home/getRecommendForYou', {
          params: {
            p: page,
            page: page
          }
        }).then((res) => {
          if (scrollNoHasListData.call(this, {
              result: res
            })) {
            return scrollEndHook.call(this);
          } else {
            this.load.data.lists = this.load.data.lists.concat(res.data);
          }
        }).catch(() => {
          return scrollEndHook.call(this);
        });
      }
    }
  }
</script>

<style scoped lang="scss">

</style>