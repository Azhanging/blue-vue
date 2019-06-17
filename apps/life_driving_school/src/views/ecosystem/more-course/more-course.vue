<template>
	<bv-home-view class='wap bc-bg-f4f' :router-level='3'>
		<w-ecosystem-tab :title='{
            title:{
                value: EcosystemtowTitle
            }
        }' :ecosystem-index="2" :leftControl="`/tow-nav/${$route.params.tow_nav_id}/tow-nav-detail/${$route.params.tow_nav_detail_id}`"></w-ecosystem-tab>
		
		<div class="bc-pd-lr-15rp bc-bg-white bc-overflow-hide">
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<list-item :list="load.data.list"></list-item>
				<template slot="load-down">
					<div class="bc-t-c bc-pd-10rp" v-if="load.state.hasMore">
						数据加载中...
					</div>
					<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.list.length === 0">
						暂无数据
					</div>
					<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.list.length > 0">
						暂无更多数据...
					</div>
				</template>
			</bv-scroll>
		</div>
		
	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import wEcosystemTab from "@components/wap/ecosystem/w-ecosystem-tab";
	import ListItem from '@components/wap/list-item/list-item.vue'
	export default {
		name: "more-course",
		components: {
			'w-ecosystem-tab': wEcosystemTab,
			'list-item': ListItem,
		},
		mixins: [scrollMixin()],
		computed: {
			EcosystemtowTitle(){
				return sessionStorage.getItem('EcosystemtowTitle');
			}
		},
		data() {
			return {}
		},
		methods: {
			api() {
				this.$axios.get('/api/column_ecosphere/ecosphere_list', {
					params: {
						column_id:this.$route.params.tow_nav_detail_id,
						ecosphere_type:2,
						page: this.load.params.page++
					}
				}).then((res) => {
					const {data: resultData} = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if(resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.list = this.load.data.list.concat(resultData.list);
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
	.bc-bg-f4f{background: #f4f4f4;}
</style>