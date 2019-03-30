<template>
	<div>
		<div class="recommend_li" v-for="item in list">
			<div class="recommend_li_top" @click="ifdetail">
				<div class="recommend_li_top_img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="recommend_li_top_tit">
					<h3>风和日丽</h3>
					<p>2019-02-19</p>
				</div>
			</div>

			<div class="recommend_li_box">
				<div class="recommend_li_box_p" @click="ifdetail">
					生活中有很多食物并不是所有人都能吃的，一些
					人吃了以后就会生病了。大漠粮芯藻这种食物很
					多人都听过，但是没有吃过的。螺旋藻这种食物
					营养丰富，同样的也不是所有人都适合吃的。那
					么到底螺旋藻适合哪些人吃呢?
				</div>
				<div class="recommend_li_box_imgb">
					<!--<div v-for="item in imglist"><img src="https://image.dtb315.com/327000.jpg?val=Thumb"></div>-->
					<bv-scroll :api="api">
						<div v-for="item in imglist">
							<div v-blue-photoswipe="{itemTagName:'DIV'}">
								<div v-for="img in item.imgs" class="img_list">
									<img :src="img.src" width="50" data-size="0x0" :msrc="img.src"/>
								</div>
							</div>
						</div>
					</bv-scroll>
				</div>
				<div class="recommend_li_box_view">
					<span><i class="iconfont icondianzan"></i>2356</span>
					<span><i class="iconfont iconzhuanfa"></i>1243</span>
				</div>
			</div>
		</div>

		<div class="recommend_li" v-for="item in list">
			<div class="recommend_li_top">
				<div class="recommend_li_top_img">
					<img src="https://image.dtb315.com/76343.jpg">
				</div>
				<div class="recommend_li_top_tit">
					<h3>风和日丽</h3>
					<p>2019-02-19</p>
				</div>
			</div>

			<div class="recommend_li_box">
				<div class="recommend_li_box_p">
					生活中有很多食物并不是所有人都能吃的，一些
					人吃了以后就会生病了。大漠粮芯藻这种食物很
					多人都听过，但是没有吃过的。螺旋藻这种食物
					营养丰富，同样的也不是所有人都适合吃的。那
					么到底螺旋藻适合哪些人吃呢?
				</div>

				<div class="recommend_li_box_video">
					<div class="recommend_li_box_video_t">
						<img src="http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg">
					</div>
					<div class="recommend_li_box_video_back"></div>
					<div class="recommend_li_box_video_btn">
						<i class="iconfont iconyugao"></i>
					</div>
				</div>
				<div class="recommend_li_box_view">
					<span><i class="iconfont icondianzan"></i>2356</span>
					<span><i class="iconfont iconzhuanfa"></i>1243</span>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import router from '@router';

	export default {
		name: "recommend_list",
		data() {
			return {
				list: [
					{id: 1},
					{id: 2},
				],
				imglist: [{
					imgs: [{src: 'https://image.dtb315.com/327640.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327773.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/326999.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327036.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327703.jpg?val=Thumb'}
					]
				}]
			}
		},
		methods: {
			ifdetail() {
				this.$router.push({'path': `${router.currentRoute.fullPath}/detail`})
			}
		}
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.recommend_li {
		padding: 0 15px;
		border-bottom: 1px solid #e5e5e5;
		overflow: hidden;

		.recommend_li_top {
			padding: 15px 0;
			display: flex;

			.recommend_li_top_img {
				width: 50px;
				height: 50px;
				overflow: hidden;
				border-radius: 100%;
				margin-right: 8px;

				img {
					width: 100%;
					vertical-align: top;
				}
			}

			.recommend_li_top_tit {
				flex: 1;

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
					margin-top: 8px;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.recommend_li_box {
			.recommend_li_box_p {
				font-size: rem(16);
				color: #333;
				line-height: 24px;
				margin-bottom: 15px;
			}

			.recommend_li_box_imgb {
				&:after {
					clear: both;
					content: '.';
					display: block;
					width: 0;
					height: 0;
					visibility: hidden;
				}

				.img_list {
					float: left;
					width: 32.5%;
					margin-right: 3px;
					margin-bottom: 3px;
					height: 100px;
					overflow: hidden;

					img {
						width: 100%;
						vertical-align: top;
						min-height: 100px;
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}

			.recommend_li_box_video {
				position: relative;

				.recommend_li_box_video_t {
					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.recommend_li_box_video_back {
					background: rgba(0, 0, 0, .5);
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					z-index: 5;
				}

				.recommend_li_box_video_btn {
					width: 40px;
					height: 40px;
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: -20px;
					margin-top: -20px;
					z-index: 6;
					color: #fff;
					border: 1px solid #fff;
					border-radius: 100%;
					text-align: center;
					line-height: 40px;
					box-sizing: border-box;

					i {
						font-size: rem(14);
					}
				}
			}

			.recommend_li_box_view {
				padding: 10px 0;
				font-size: rem(12);
				color: #666;

				span {
					margin-right: 20px;
				}
			}
		}
	}
</style>