<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "评论消息"
            }
        }'

		>
		</w-home-header>

		<bv-scroll :api="api" :disabled="load.state.disabled">
			<div class="message-list" v-for="(item,index) in this.load.data.list">
				<template v-if="item.offline == true">
					<a class="list-item" @click="goshow()">
						<div class="list-item-img">
							<img :src="item.head_img">
						</div>
						<div class="list-item-desc">
							<div class="list-item-desc-top">
								<div class="list-item-desc-top-l" v-html="item.content"><!--<span>{{ item.m_id }}</span> 回复了你--></div>
								<div class="list-item-desc-top-r">互动提醒</div>
							</div>
							<div class="list-item-desc-time">
								{{ item.create_time  }}
							</div>
						</div>
					</a>
				</template>
				<template v-else>
					<router-link class="list-item" :to="item.name_url || ''">
						<div class="list-item-img">
							<img :src="item.head_img">
						</div>
						<div class="list-item-desc">
							<div class="list-item-desc-top">
								<div class="list-item-desc-top-l" v-html="item.content"><!--<span>{{ item.m_id }}</span> 回复了你--></div>
								<div class="list-item-desc-top-r">互动提醒</div>
							</div>
							<div class="list-item-desc-time">
								{{ item.create_time  }}
							</div>
						</div>
					</router-link>
				</template>
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

	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "message-comment",
		mixins: [scrollMixin()],
		methods:{
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/Member_News/comment_fabulous', {
					params: {
						state:'comment',
						page: this.load.params.page++
					}
				}).then((res) => {
					//console.log(res)
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
			goshow(){
				$toast({
					message: '资讯或课程已下线。',
					duration: 3000
				});
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
.message-list{
	overflow: hidden;
	.list-item{
		display: block;
		display: flex;
		background: #fff;
		overflow: hidden;
		margin-top: rem(10);
		padding: rem(15);
		.list-item-img{
			width: rem(40);
			height: rem(40);
			border-radius: 100%;
			overflow: hidden;
			margin-right: rem(10);
			img{width: 100%;vertical-align: top;}
		}
		.list-item-desc{
			flex: 1;
			.list-item-desc-top{
				font-size: rem(14);
				color: #999;
				display: flex;
				.list-item-desc-top-l{
					flex: 1;
					font-size: rem(14);
					color: #666;
					span{color: #333;}
				}
				.list-item-desc-top-r{
					color: #999;
				}
			}
			.list-item-desc-time{
				color: #999;
				font-size: rem(12);
				margin-top: rem(4);
			}
		}
	}
}
</style>
