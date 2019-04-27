<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>

		<w-home-header :header="{
			title:{
				value: title
			}
		}"></w-home-header>

		<div class="bc-reset-ul bc-media column-list">
			<bv-scroll :api="api" :disabled="load.state.disabled">

				<div class="bc-pd-b-10rp bc-pd-t-10rp column-item" v-for="item in load.data.lists">
					<router-link :to="`${currentFullPath}/album/${item.id}`" class="t-333">
						<div class="bc-media pd-t-15 bc-row bc-c-f">
							<div class="bc-media-left">
								<img class="tuijian-article-img" :src="item.src_img" v-if="">
							</div>
							<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
								<div class=" bc-f-16rp bc-t-333 bc-f-b">{{ item.name }}</div>
								<div class=" bc-f-12rp bc-t-999">
									<span class="bc-media-left">{{ item.count }}篇</span>
									<span class="bc-media-right">{{ item.create_time }}</span>
								</div>
								<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
									{{ item.sub_content }}
								</div>
							</div>
						</div>
					</router-link>
				</div>
				
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
	</bv-home-view>
</template>

<script>
	import router from '@router';
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	export default {
		name: "special",
		mixins: [scrollMixin()],
		components:{
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		data() {
			return {
				lists:[
					{},{},{}
				],
				title:''
			}
		},
		methods:{
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/special/index', {
					params: {
						column_id:this.$route.params.column_id,
						page: this.load.params.page++
					}
				}).then((res) => {
					const { data: resultData } = res.data;
					if (scrollNoHasListData.call(this, {
						resultData,
						listKey: 'list'
					})) {
						scrollEndHook.call(this);
					} else {
						if(resultData.list.length < 10) scrollEndHook.call(this);
						this.load.data.lists = this.load.data.lists.concat(resultData.list);
					}
				}).catch(() => {
					return scrollEndHook.call(this);
				});

			},
			show_title(){
				this.$axios.get('/api/Classify/ecosphere',{
					params:{
						column_id:this.$route.params.column_id
					}
				}).then(res=>{
					this.title = res.data.data
				})
			},

		},
		mounted(){
			//console.log(this.$route.params.column_id)
			this.show_title();
		}
	}
</script>

<style lang='scss' scoped>
	.tuijian-article-img {
		width: rem(120);
		height: rem(80);
		vertical-align: top;
	}
	.column-list{
		.column-item{
			background: #fff;
			margin-bottom: 10px;
			padding: 15px;
		}
	}
</style>
