<template>
	<bv-home-view class='wap' :router-level='4' style='background-color: #f4f4f4;'>
		<w-home-header :header="{
			title:{
				value:showInfo.name
			}
		}"></w-home-header>

		<div class="album-top">
			<div class="album-top-img">
				<img :src="showInfo.src_img">
			</div>
			<div class="album-top-title">
				{{ showInfo.name }}
			</div>
			<div class="driving-title">
				<div><i class="driving-title-r"></i></div>
				<h3>{{ count }}篇文章</h3>
				<div><i class="driving-title-l"></i></div>
			</div>
			<div class="album-top-desc">
				{{ showInfo.sub_content }}
			</div>
		</div>


		<div class="bc-reset-ul bc-media album-list">

			<bv-scroll :api="api" :disabled="load.state.disabled">

				<div class="bc-pd-b-10rp bc-pd-t-10rp album-item" v-for="item in load.data.lists">
					<router-link :to="`${currentFullPath}/album-detail/${item.id}`" class="t-333">
						<div class="bc-media pd-t-15 bc-row bc-c-f">
							<div class="bc-media-left">
								<img class="tuijian-article-img" :src="item.src_img" v-if="">
							</div>
							<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
								<div class=" bc-f-16rp bc-t-333 bc-f-b">{{ item.name }}</div>
								<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
									{{ item.sub_content }}
								</div>
							</div>
						</div>
						<div class="album-item-but">{{ item.come_from }}<span class="bc-mg-l-20rp">{{ item.create_time }}</span></div>
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

			<!--文章-->


			<!--视频-->
			<!--<div class="bc-pd-b-10rp bc-pd-t-10rp album-item" v-for="i in 2">
				<a class="t-333">
					<div class="bc-media pd-t-15 bc-row bc-c-f">
						<div class="bc-media-left">
							<img class="tuijian-article-img" src="https://image.dtb315.com?src_img=/Uploads/image/2016-09-13/57d754e3c0a71.jpg&val=Thumb" v-if="">
							<div class="album-item-video">
								<div class="album-item-play">
									<i class="iconfont iconbofang"></i>
								</div>
								<div class="album-item-duration">
									01:49:30
								</div>
							</div>
						</div>
						<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
							<div class=" bc-f-16rp bc-t-333 bc-f-b">开篇语 阻击摧残生命的五大“杀手”</div>
							<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
								文章内容前面部分文章内容前面部分文
								章内容前面部分文章内容前面部分文...
							</div>
						</div>
					</div>
					<div class="album-item-but">原创视频<span class="bc-mg-l-20rp">03-04</span></div>
				</a>
			</div>-->

			<!--图集-->
			<!--<div class="bc-pd-b-10rp bc-pd-t-10rp album-item" v-for="i in 2">
				<a class="t-333">
					<div class="bc-media pd-t-15 bc-row bc-c-f">
						<div class="bc-media-left">
							<img class="tuijian-article-img" src="https://image.dtb315.com?src_img=/Uploads/image/2016-09-13/57d754e3c0a71.jpg&val=Thumb" v-if="">
							<div class="album-item-video">
								<div class="album-item-atlas">
									<i class="iconfont icontupian"></i> 15
								</div>
							</div>
						</div>
						<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
							<div class=" bc-f-16rp bc-t-333 bc-f-b">开篇语 阻击摧残生命的五大“杀手”</div>
							<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
								文章内容前面部分文章内容前面部分文
								章内容前面部分文章内容前面部分文...
							</div>
						</div>
					</div>
					<div class="album-item-but">原创图集<span class="bc-mg-l-20rp">03-04</span></div>
				</a>
			</div>-->

			<!--音频-->
			<!--<div class="bc-pd-b-10rp bc-pd-t-10rp album-item" v-for="i in 2">
				<a class="t-333">
					<div class="bc-media pd-t-15 bc-row bc-c-f">
						<div class="bc-media-left">
							<img class="tuijian-article-img album-item-audio-img" src="https://image.dtb315.com?src_img=/Uploads/image/2016-09-13/57d754e3c0a71.jpg&val=Thumb" v-if="">
							<div class="album-item-video">
								<div class="album-item-audio">
									<i class="iconfont "></i>12'21"
								</div>
							</div>
						</div>
						<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
							<div class=" bc-f-16rp bc-t-333 bc-f-b">开篇语 阻击摧残生命的五大“杀手”</div>
							<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
								文章内容前面部分文章内容前面部分文
								章内容前面部分文章内容前面部分文...
							</div>
						</div>
					</div>
					<div class="album-item-but">原创语音<span class="bc-mg-l-20rp">03-04</span></div>
				</a>
			</div>-->

		</div>
	</bv-home-view>
</template>

<script>
	import router from '@router';
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	export default {
		name: "album",
		mixins: [scrollMixin()],
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		data() {
			return {
				showInfo:'',
				count:''
			}
		},
		methods: {
			show_data(){
				this.$axios.get('/api/special/special_list', {
					params: {
						column_id: this.$route.params.album_id,
					}
				}).then((res) => {
					//console.log(res)
					this.showInfo = res.data.data.info
					this.count = res.data.data.count
				});
			},
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/special/special_list', {
					params: {
						column_id:this.$route.params.album_id,
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

			}
		},
		mounted() {
			this.show_data();
		}
	}
</script>

<style scoped lang="scss">
	.album-top{
		background: #fff;
		.album-top-img{
			text-align: center;
			padding: 20px;
			img{
				width: rem(200);
			}
		}
		.album-top-title{
			text-align: center;
			font-size: rem(20);
			color: #333;
			margin: 0 20px;
		}
		.driving-title {
			padding: 15px 0;
			display: flex;
			height: 20px;
			line-height: 20px;
			align-items: center;
			width: rem(140);
			margin: 0 auto;
			div {
				flex: 1;
				height: 1px;
				position: relative;
				background: rgba(153, 153, 153, 1);
				background: linear-gradient(to right, rgba(153, 153, 153, .2), rgba(153, 153, 153, 1));

				&:last-child {
					background: linear-gradient(to right, rgba(153, 153, 153, 1), rgba(153, 153, 153, .2));
				}

				i {
					width: 6px;
					height: 6px;
					background: #CA9F75;
					position: absolute;
					top: -3px;
					right: 0;
					transform: rotate(-60deg);
				}

				.driving-title-l {
					right: auto;
					left: 0;
				}
			}

			h3 {
				margin: 0 10px;
				font-weight: normal;
				color: #999;
				font-size: rem(14);
			}
		}
		.album-top-desc{
			font-size: rem(14);
			color: #666;
			padding: 0 20px 20px;
		}
	}
.album-list{
	background: #fff;
	margin-top: 10px;
	padding: 0 15px;
	.album-item{
		border-bottom: 1px solid #e5e5e5;
		padding-bottom: 0;
		.album-item-but{
			padding: 10px 0;
			font-size: rem(12);
			color: #999;
		}

		.album-item-video{
			position: absolute;
			left: 0;
			top:0;
			right: 0;
			bottom: 0;
			color: #fff;
			.album-item-play{
				width: rem(30);
				height: rem(30);
				position: absolute;
				left: 50%;
				top:50%;
				margin-left: rem(-15);
				margin-top: rem(-15);
				i{
					font-size: rem(30);
				}
			}
			.album-item-duration{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 0 rem(10);
				font-size: rem(12);
			}
			.album-item-audio{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 0 rem(10);
				font-size: rem(12);
				text-align: center;
			}

			.album-item-atlas{
				position: absolute;
				left: 0;
				right: 0;
				bottom: 0;
				padding: 0 rem(10);
				font-size: rem(12);
				i{font-size: rem(12)}
			}
		}
	}
}
	.tuijian-article-img {
		width: rem(120);
		height: rem(80);
		vertical-align: top;
	}
	.album-item-audio-img{
		width: rem(80);
		height: rem(80);
		vertical-align: top;
	}
</style>
