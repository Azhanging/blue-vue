<template>
	<div>
		<div class="recommend-li" v-for="item in list">
			<router-link :to="`${currentFullPath}/detail`">
				<div class="recommend-li-top">
					<div class="recommend-li-top-img">
						<img src="https://image.dtb315.com/76343.jpg">
					</div>
					<div class="recommend-li-top-tit">
						<h3>风和日丽</h3>
						<p>2019-02-19</p>
					</div>
				</div>
			</router-link>

			<div class="recommend-li-box">
				<div class="recommend-li-box-p">
					<router-link :to="`${currentFullPath}/detail`">
						生活中有很多食物并不是所有人都能吃的，一些
						人吃了以后就会生病了。大漠粮芯藻这种食物很
						多人都听过，但是没有吃过的。螺旋藻这种食物
						营养丰富，同样的也不是所有人都适合吃的。那
						么到底螺旋藻适合哪些人吃呢?
					</router-link>
				</div>
				<div class="recommend-li-box-imgb">
					<!--<div v-for="item in imglist"><img src="https://image.dtb315.com/327000.jpg?val=Thumb"></div>-->
					<bv-scroll :api="api">
						<div v-for="item in imglist">
							<div v-blue-photoswipe="{itemTagName:'DIV'}">
								<div v-for="img in item.imgs" class="img-list">
									<img :src="img.src" width="50" data-size="0x0" :msrc="img.src"/>
								</div>
							</div>
						</div>
					</bv-scroll>
				</div>
				<div class="recommend-li-box-view">
					<span><i class="iconfont icondianzan"></i>2356</span>
					<span><i class="iconfont iconzhuanfa"></i>1243</span>
				</div>
			</div>
		</div>

		<div class="recommend-li" v-for="item in list">
			<router-link :to="`${currentFullPath}/detail`">
				<div class="recommend-li-top">
					<div class="recommend-li-top-img">
						<img src="https://image.dtb315.com/76343.jpg">
					</div>
					<div class="recommend-li-top-tit">
						<h3>风和日丽</h3>
						<p>2019-02-19</p>
					</div>
				</div>
			</router-link>

			<div class="recommend-li-box">
				<div class="recommend-li-box-p">
					<router-link :to="`${currentFullPath}/detail`">
						生活中有很多食物并不是所有人都能吃的，一些
						人吃了以后就会生病了。大漠粮芯藻这种食物很
						多人都听过，但是没有吃过的。螺旋藻这种食物
						营养丰富，同样的也不是所有人都适合吃的。那
						么到底螺旋藻适合哪些人吃呢?
					</router-link>
				</div>

				<div class="recommend-li-box-video">
					<div class="recommend-li-box-video-t">
						<img src="http://www.pptbz.com/pptpic/UploadFiles-6909/201203/2012031220134655.jpg">
					</div>
					<div class="recommend-li-box-video-back"></div>
					<div class="recommend-li-box-video-btn">
						<i class="iconfont iconyugao"></i>
					</div>
				</div>
				<div class="recommend-li-box-view">
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
		name: "recommend-list",
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
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
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
			display: flex;

			.recommend-li-top-img {
				width: rem(50);
				height: rem(50);
				overflow: hidden;
				border-radius: 100%;
				margin-right: rem(8);

				img {
					width: 100%;
					vertical-align: top;
				}
			}

			.recommend-li-top-tit {
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
				a{
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
					height: rem(100);
					overflow: hidden;

					img {
						width: 100%;
						vertical-align: top;
						min-height: rem(100);
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
			}
		}
	}
</style>
