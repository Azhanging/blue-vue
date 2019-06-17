<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "站内信"
            }
        }'

		>
		</w-home-header>

		<bv-scroll :api="api" :disabled="load.state.disabled">

			<div class="message-list-on" v-for="(item,index) in this.load.data.list">
				<router-link class="liston-item" to="">
					<div class="item-name">
						{{ item.title }}
					</div>
					<div class="item-content" v-html="item.content">
					</div>
					<div class="item-time">
						{{ item.create_time | timeFilter("Y-M-D") }}
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


	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	export default {
		name: "message-station",
		mixins: [scrollMixin()],
		methods:{
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/Member_News/station_notice', {
					params: {
						state:'station',
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

			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.message-list-on{
		overflow: hidden;
		.liston-item{
			background: #fff;
			display: block;
			margin-top: rem(10);
			overflow: hidden;
			padding: rem(10) rem(15);
			font-size: rem(12);
			.item-name{
				color: #333;
				font-size: rem(14);
			}
			.item-content{color: #666;margin: rem(5) 0}
			.item-time{color: #666;}
		}
	}
</style>
