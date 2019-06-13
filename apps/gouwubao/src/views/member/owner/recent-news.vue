<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<bv-header :header="{title:{value:'最新动态'}}"/>
		
		<bv-scroll :api="api" :disabled="load.state.disabled">
			<div class="bc-row bc-bg-white">
				<ArrList :dataArr="load.data.list"></ArrList>
			</div>
			<template slot="load-down">
				<div class="bc-t-c bc-pd-10" v-if="load.state.hasMore">
					数据加载中...
				</div>
				<div class="bc-t-c bc-pd-10" v-else>
					暂无数据...
				</div>
			</template>
		</bv-scroll>
	</bv-home-view>
</template>

<script>
	import ArrList from '../components/o-arrlist'
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	export default {
		name: "recent-news",
		mixins: [scrollMixin()],
		components: {
			ArrList
		},
		computed: {},
		data() {
			return {
			}
		},
		methods: {
			api() {
				const page = this.load.params.page++;
				return this.$axios.get('/member/office_lender/zixun_list', {
					params: {
						p: page
					}
				}).then((res) => {
					const { data: resultData } = res;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'zixun_list'
					})) {
						scrollEndHook.call(this);
					} else {
						if (resultData.zixun_list.length < 10) scrollEndHook.call(this);
						this.load.data.list = this.load.data.list.concat(resultData.zixun_list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});
			},
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">

</style>