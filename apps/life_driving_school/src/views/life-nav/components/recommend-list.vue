<template>
	<div>
		<bv-scroll :api="api" :disabled="load.state.disabled">

			<div class="recommend-li" v-for="(item,index) in this.load.data.list" :key="index">
				<router-link :to="`${$router.currentRoute.fullPath}/detail/${item.id}`">
					<div class="recommend-li-top">
						<div class="recommend-li-top-img">
							<img :src="item.head_img">
						</div>
						<div class="recommend-li-top-tit">
							<h3>{{ item.name }}</h3>
							<p>{{ item.create_time }}</p>
						</div>
					</div>
				</router-link>

				<div class="recommend-li-box">
					<div class="recommend-li-box-p">
						<router-link :to="`${$router.currentRoute.fullPath}/detail/${item.id}`">
							{{item.sub_content}}
						</router-link>
					</div>
					<div class="recommend-li-box-imgb">
						<!--<div v-for="item in imglist"><img src="https://image.dtb315.com/327000.jpg?val=Thumb"></div>-->
						<bv-scroll :api="api" :disabled="load.state.disabled">
							<div>
								<div v-blue-photoswipe="{itemTagName:'DIV'}">
									<div v-for="(img,index) in item.list_img" class="img-list">
										<img :src="img" width="50" data-size="0x0" :msrc="img"/>
									</div>
								</div>
							</div>
						</bv-scroll>
					</div>
					<div class="recommend-li-box-view">

						<span @click="btn_like(item.id,index)" :class="{on:(item.fabulous==true)}"><i class="iconfont icondianzan"></i>{{ item.fabulous_num }}</span>

						<span @click="$share({
						title:item.name,
						descr:item.sub_content,
						thumImage:item.head_img,
						shareUrl:$route.path
						})" v-if="config.device.isApp"><i class="iconfont iconzhuanfa"></i> {{ item.share }}</span>
					</div>
				</div>
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
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import router from '@router';

	export default {
		name: "recommend-list",
		mixins: [scrollMixin()],
		created() {
			//console.log(this.load.state);
		},
		data() {
			return {
				likes: ''
			}
		},
		computed: {
			currentFullPath() {
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/circle/getList', {
					params: {
						column_id : this.$route.params.id,
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
			btn_like(kid, i) {//点赞
				//console.log(kid)
				this.$axios.get('/api/article/fabulous', {
					params: {
						article_id: kid,
						data_id: 4
				}
				}).then(res => {
					//console.log(res)
					//console.log(res.data.like_num)
					if (res.data.fabulous) {
						this.load.data.list[i].fabulous = res.data.fabulous
						this.load.data.list[i].fabulous_num = res.data.fabulous_num
					} else {
						this.load.data.list[i].fabulous = res.data.fabulous
						this.load.data.list[i].fabulous_num = res.data.fabulous_num
					}
				})
			},
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.recommend-li {
		padding: 0 rem(15);
		border-bottom: 1px solid #e5e5e5;
		overflow: hidden;

		.recommend-li-top {
			padding: rem(15) 0;
			overflow: hidden;

			.recommend-li-top-img {
				width: rem(50);
				height: rem(50);
				overflow: hidden;
				border-radius: 100%;
				margin-right: rem(8);
				float: left;

				img {
					width: 100%;
					vertical-align: top;
					min-height: 100%;
				}
			}

			.recommend-li-top-tit {
				margin-left: rem(58);

				h3 {
					font-size: rem(18);
					color: #222;
					font-weight: normal;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				p {
					font-size: rem(14);
					color: #888;
					margin-top: rem(8);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.recommend-li-box {
			.recommend-li-box-p {
				font-size: rem(16);
				color: #333;
				line-height: rem(24);
				margin-bottom: rem(15);

				a {
					color: #333;
				}
			}

			.recommend-li-box-imgb {
				&:after {
					clear: both;
					content: '.';
					display: block;
					width: 0;
					height: 0;
					visibility: hidden;
				}

				.img-list {
					float: left;
					width: 32.5%;
					margin-right: rem(3);
					margin-bottom: rem(3);
					padding-bottom: 32.5%;
					height: 0;
					overflow: hidden;
					position: relative;
					img {
						width: 100%;
						vertical-align: top;
						position: absolute;
						height: 100%;
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}

			.recommend-li-box-video {
				position: relative;

				.recommend-li-box-video-t {
					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.recommend-li-box-video-back {
					background: rgba(0, 0, 0, .5);
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					z-index: 5;
				}

				.recommend-li-box-video-btn {
					width: rem(40);
					height: rem(40);
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: rem(-20);
					margin-top: rem(-20);
					z-index: 6;
					color: #fff;
					border: 1px solid #fff;
					border-radius: 100%;
					text-align: center;
					line-height: rem(40);
					box-sizing: border-box;

					i {
						font-size: rem(14);
					}
				}
			}

			.recommend-li-box-view {
				padding: rem(10) 0;
				font-size: rem(12);
				color: #666;

				span {
					margin-right: rem(20);
				}

				span.on {
					color: #CA9F75;

					i.icondianzan {
						color: #CA9F75;
					}
				}
			}
		}
	}
</style>
