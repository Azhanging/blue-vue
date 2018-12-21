<script src="../../../../../../../node_modules/vue-picture-preview/index.js"></script>
<template>
	<div class="row">
		<m-scroll
			:api="api"
			:disabled="load.state.disabled"
		>
			<ul class="reset-ul">
				<li v-for="item in load.data.lists">
					<img :src="item.list_img" v-preview="item.list_img"/>
					<span>{{item.name}}</span>
				</li>
			</ul>
			<template slot="load-down">
				<div class="t-c pd-10" v-if="load.state.hasMore">
					数据加载中...
				</div>
				<div class="t-c pd-10" v-else>
					暂无数据...
				</div>
			</template>
		</m-scroll>
	</div>
</template>

<script>

	import { loadMixin, loadEndHook, loadNoHasListData } from '$load';

  export default {
    name: "scroll",
    mixins: [loadMixin()],
    data() {
      return {}
    },
    methods: {
      api() {
        return this.$axios.get('/home/home/getrecommendforyou', {
          params: {
            page: this.load.params.page++
          }
        }).then((res) => {
          if (loadNoHasListData.call(this, {
              result: res
            })) {
            loadEndHook.call(this);
          } else {
            this.load.data.lists = this.load.data.lists.concat(res.data);
          }
        }).then(() => {
          return {
            disabled: this.load.state.disabled
          };
        });
      }
    }
  }
</script>

<style scoped lang="scss">

</style>