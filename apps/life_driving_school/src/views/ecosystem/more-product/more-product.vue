<template>
	<bv-home-view class='wap bc-bg-f4f' :router-level='3'>
		<w-ecosystem-tab :title='{
            title:{
                value: EcosystemtowTitle
            }
        }' :ecosystem-index="4" :leftControl="`/tow-nav/${$route.params.tow_nav_id}/tow-nav-detail/${$route.params.tow_nav_detail_id}`"></w-ecosystem-tab>
		
		<bv-scroll :api="api" :disabled="load.state.disabled">
			<product-item :bgwhite="true" :goods="load.data.list"></product-item>
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
	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import wEcosystemTab from "@components/wap/ecosystem/w-ecosystem-tab";
	import ProductItem from '@components/wap/list-item/product-item.vue'
	export default {
		name: "more-product",
		components: {
			'w-ecosystem-tab': wEcosystemTab,
			'product-item':ProductItem
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
				this.$axios.get('/api/ecosystem_goods/goodsList', {
					params: {
						column:this.$route.params.tow_nav_detail_id,
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
.bc-bg-f4f{background: #F4F4F4;}
</style>