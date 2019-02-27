<template>
	<m-home-view :router-level="2">
		<m-header :title="'下拉加载'"></m-header>
		<m-scroll :api="api" :disabled="load.state.disabled">
			<ul class="bc-reset-ul">
				<li v-for="item in load.data.lists" class="bc-pd-10">
					<!--<img :src="item.home_img" v-preview="item.home_img" width="50"/>-->
					<span>{{item.address}}</span>
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
        return this.$axios.get('/enroll', {
          params: {
            p: this.load.params.page++
          }
        }).then((res) => {
          if (scrollNoHasListData.call(this, {
              result: res,
              listKey: 'list'
            })) {
            return scrollEndHook.call(this);
          } else {
            this.load.data.lists = this.load.data.lists.concat(res.data.list);
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