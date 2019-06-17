<template>
	<bv-home-view class='wap bc-bg-f4f' :router-level='2'>
		
		<w-home-header :header='{
            title:{
                value: title
            }
        }'
		></w-home-header>
		
		<div class="bc-bg-white bc-mg-10rp bc-overflow-hide">
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<div class="eco-tow-box bc-overflow-hide bc-mg-t-10rp" v-for="item in load.data.list">
					<router-link :to="`${currentFullPath}/tow-nav-detail/${item.id}`">
						<div class="bc-pd-lr-15rp bc-overflow-hide">
							<div class="eco-tow-img"><img :src="item.src_img"></div>
							<div class="bc-pd-l-15rp bc-bd-t-e5e eco-tow-right">
								<div class="bc-f-18rp bc-t-333 bc-mg-t-10rp bc-f-b eco-tow-name">{{ item.name }}</div>
								<div class="bc-f-12rp bc-t-999 bc-mg-t-5rp eco-tow-cont">{{ item.sub_content }}</div>
							</div>
						</div>
					</router-link>
				</div>
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
	export default {
		name: "ecosystem-tow-nav",
		components: {},
		computed: {
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		mixins: [scrollMixin()],
		data() {
			return {
				title:''
			}
		},
		methods: {
			api() {
				this.$axios.get('/api/column_ecosphere/assortment', {
					params: {
						column_id:this.$route.params.tow_nav_id,
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
			show_title(){
				this.$axios.get('/api/Classify/column_ecosphere',{
					params:{
						column_id:this.$route.params.tow_nav_id
					}
				}).then(res=>{
					this.title = res.data
				})
			}
		},
		mounted() {
			this.show_title();
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
	
	.eco-tow-box{
		.eco-tow-img{
			width: rem(100);
			height: rem(90);
			overflow: hidden;
			float: left;
			img{width: 100%;height: 100%;margin-top: rem(10);}
		}
		.eco-tow-right{margin-left: rem(115);overflow: hidden;padding-top: rem(10);}
		.eco-tow-name{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
		.eco-tow-cont{white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
		&:first-child{
			.eco-tow-img{
				margin-top: 0;
			}
			.eco-tow-right{
				border-top: 0!important;
			}
		}
	}
	
</style>