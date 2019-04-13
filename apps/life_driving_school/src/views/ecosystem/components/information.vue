<template>
	<div class="expense-l-box">
		<div class="expense-list">
			<div class="expense-list">
				<bv-scroll :api="api" :disabled="load.state.disabled">

					<w-arrlist :list='load.data.lists'></w-arrlist>

					<template slot="load-down">
						<div class="bc-t-c bc-pd-10rp">
							数据加载中...
						</div>
						<div class="bc-t-c bc-pd-10rp">
							暂无数据...
						</div>
					</template>
				</bv-scroll>
				<!--<itemList></itemList>-->
			</div>
		</div>
	</div>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import WArrlist from '@components/wap/article/w-arrlist'

	export default {
		name: "information",
		mixins: [scrollMixin()],
		props:{
			this_id:null
		},
		components: {
			'w-arrlist': WArrlist
		},
		data() {
			return {
			}
		},
		methods: {
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/Classify/column_article', {
					params: {
						column_id:this.this_id,
						page: this.load.params.page++
					}
				}).then((res) => {
					//console.log(res.data.data)
					const {data: resultData} = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						const {disabled} = scrollEndHook.call(this);
						this.load.state.disabled = disabled
					} else {
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
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
