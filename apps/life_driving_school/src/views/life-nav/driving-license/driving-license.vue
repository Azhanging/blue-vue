<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<growTab :growIndex='1' :title='{
            title:{
                value: "生命导航"
            }
        }'></growTab>

		<div class="driving_top">
			<div class="driving_title">
				<div><i class="driving_title_r"></i></div>
				<h3>阶段测试</h3>
				<div><i class="driving_title_l"></i></div>
			</div>

			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(slide, index) in banners" :key="index">

						<div class="driving_slide">
							<div class="driving_learn">
								<div class="driving_learn_img">
									<img src="https://image.dtb315.com/31713.jpg?val=Thumb">
								</div>
								<div class="driving_learn_desc">
									<h3>您已学习至：</h3>
									<p>初阶&nbsp;第三课《财富的真相》</p>
								</div>
							</div>

							<div class="driving_topic">
								<div class="driving_topic_img">
									<img src="https://image.dtb315.com/31713.jpg?val=Thumb">
								</div>
								<div class="driving_topic_desc">
									<div class="driving_topic_desc_tit">
										<div>初阶课程测试（选择题）</div>
										<i class="iconfont iconbianji"></i>
									</div>
									<div class="driving_topic_desc_xing">
										<i class="iconfont iconiconfontxingxing"></i>
										<i class="iconfont iconiconfontxingxing"></i>
										<i class="iconfont iconiconfontxingxing"></i>
										<i class="iconfont iconiconfontxingxing"></i>
										<i class="iconfont iconiconfontxingxing"></i>
									</div>
									<div class="driving_topic_desc_progress">
										<div class="driving_topic_desc_l">
											<progress value="40" max="100"></progress>
										</div>
										<div><span>40</span>/100道</div>
									</div>
								</div>
							</div>
						</div>


					</swiper-slide>
					<div class="swiper-pagination" id="pagination" slot="pagination"></div>
				</swiper>
			</bv-scroll>

		</div>

		<div class="driving-List">
			<div class="driving-List-tab">
				<div
					v-on:click="tabqh(1)"
					:class="{active:(temp===1)}">
					初阶
				</div>
				<div
					v-on:click="tabqh(2)"
					:class="{active:(temp===2)}">
					中阶
				</div>
				<div
					v-on:click="tabqh(3)"
					:class="{active:(temp===3)}">
					高阶
				</div>
			</div>
			<div v-if="temp===1">
				<bv-transition>
					<driving_list></driving_list>
				</bv-transition>
			</div>
			<div v-if="temp===2">
				<bv-transition>
					<driving_list></driving_list>
				</bv-transition>
			</div>
			<div v-if="temp===3">
				<bv-transition>
					<driving_list></driving_list>
				</bv-transition>
			</div>
		</div>


	</bv-home-view>
</template>


<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import growTab from "../components/life_nav_tab"
	import driving_list from '../components/driving_list';

	export default {
		name: "driving_license",
		components: {
			growTab,
			driving_list
		},
		data() {
			return {
				temp: 1,
				banners: [1, 2, 3, 4],
				swiperOption: {
					pagination: {
						el: "#pagination"
					},
					loop: true
				},
				swiper: {}
			}
		},
		methods: {
			swiperUpdate() {
				this.swiper.update();
			},
			tabqh(t) {
				this.temp = t;
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.swiper = this.$refs['swiper'];
				this.swiperUpdate();
			});
		}
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.driving_top {
		background: #fff;
		overflow: hidden;
		padding: 0 15px;

		.driving_title {
			padding: 20px;
			display: flex;
			height: 20px;
			line-height: 20px;
			align-items: center;

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

				.driving_title_l {
					right: auto;
					left: 0;
				}
			}

			h3 {
				margin: 0 5px;
			}
		}


		.driving_slide {
			overflow: hidden;

			.driving_learn {
				display: flex;
				background: #A9A892;
				padding: 20px;
				border-radius: 5px;
				overflow: hidden;

				.driving_learn_img {
					width: 40px;
					overflow: hidden;
					margin: 0 20px;

					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.driving_learn_desc {
					flex: 1;
					color: #fff;

					h3 {
						font-size: rem(16);
						margin: 8px 0;
					}

					p {
						font-size: rem(14);
					}
				}
			}

			.driving_topic {
				display: flex;
				padding: 15px 0 30px;

				.driving_topic_img {
					width: 95px;
					height: 60px;
					overflow: hidden;
					margin-right: 12px;

					img {
						vertical-align: top;
						width: 100%;
					}
				}

				.driving_topic_desc {
					flex: 1;

					.driving_topic_desc_tit {
						display: flex;

						div {
							flex: 1;
							color: #333;
							font-size: rem(16);
						}
					}

					.driving_topic_desc_xing {
						height: 15px;
						line-height: 15px;

						i {
							font-size: rem(14);
						}
					}

					.driving_topic_desc_progress {
						display: flex;
						color: #999;
						font-size: rem(10);

						.driving_topic_desc_l {
							flex: 1;

							progress {
								border: 0;
								background: #999;
								height: 3px;
								border-radius: 3px;

								&::-webkit-progress-bar {
									background: transparent;
								}

								&::-webkit-progress-value {
									background: #CA9F75;
								}
							}
						}

						span {
							color: #CA9F75;
						}
					}
				}
			}
		}
	}

	.swiper-pagination .swiper-pagination-bullet-active {
		background: #CA9F75;
		width: 12px;
	}

	.driving-List {
		margin-top: 10px;
		background: #fff;
		padding: 0 15px;
		overflow: hidden;

		.driving-List-tab {
			margin: 20px 0;
			display: flex;
			height: 30px;
			border: 1px solid #CA9F75;
			box-sizing: border-box;
			overflow: hidden;
			border-radius: 5px;
			line-height: 30px;

			div {
				flex: 1;
				text-align: center;
				font-size: rem(16);
				color: #CA9F75;
			}

			div.active {
				background: #CA9F75;
				color: #fff;
			}
		}
	}
</style>