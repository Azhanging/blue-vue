<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<life_nav_tab :growIndex='1' :title='{
            title:{
                value: "生命导航"
            }
        }'></life_nav_tab>

		<div class="driving-top">
			<div class="driving-title">
				<div><i class="driving-title-r"></i></div>
				<h3>阶段测试</h3>
				<div><i class="driving-title-l"></i></div>
			</div>
			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(slide, index) in banners" :key="index">

						<div class="driving-slide">
							<div class="driving-learn">
								<div class="driving-learn-img">
									<img src="http://pc.lifest.dtb315.com/static/img/life-nav/book@2x.png">
								</div>
								<div class="driving-learn-desc">
									<h3>您已学习至：</h3>
									<p>初阶&nbsp;第三课《财富的真相》</p>
								</div>
							</div>

							<div class="driving-topic">
								<div class="driving-topic-img">
									<img src="https://image.dtb315.com/31713.jpg?val=Thumb">
								</div>
								<div class="driving-topic-desc">
									<div class="driving-topic-desc-tit">
										<div>初阶课程测试（选择题）</div>
										<i class="iconfont iconbianji"></i>
									</div>
									<div class="driving-topic-desc-xing">
										<i class="iconfont iconiconfontxingxing" :class="((index+1)*20)<=xing_num?'active':''" v-for="(i,index) in 5"></i>
									</div>
									<div class="driving-topic-desc-progress">

										<div class="driving-topic-desc-l">
											<progress :value="progressValue" max="100" v-if="th_progressValue>0"></progress>
											<button class="driving-topic-desc-l-btn" v-else="th_progressValue<=0">立即学习</button>
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

		<div class="driving-list">
			<div class="driving-list-tab">
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
			<bv-scroll>
				<div v-if="temp===1">
					<w-arrlist :if-achieve="achieveMsg"></w-arrlist>
				</div>
				<div v-if="temp===2">
					<w-arrlist :if-achieve="achieveMsg"></w-arrlist>
				</div>
				<div v-if="temp===3">
					<!--<bv-view-transition>
						<driving_list></driving_list>
					</bv-view-transition>-->
					<w-arrlist :if-achieve="achieveMsg"></w-arrlist>
				</div>

				<template slot="load-down">
					<div class="bc-t-c bc-pd-10rp">
						数据加载中...
					</div>
					<div class="bc-t-c bc-pd-10rp">
						暂无数据...
					</div>
				</template>
			</bv-scroll>


		</div>


	</bv-home-view>
</template>


<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import driving_list from '../components/driving-list';
	import WArrlist from '@components/wap/article/w-arrlist'

	export default {
		name: "driving-license",
		components: {
			life_nav_tab,
			driving_list,
			'w-arrlist': WArrlist
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
				swiper: {},
				xing_num:65, //星星点亮个数
				th_progressValue:40,//传的分数
				progressValue:0,//显示分数
				achieveMsg:true
			}
		},
		methods: {
			swiperUpdate() {
				this.swiper.update();
			},
			tabqh(t) {
				this.temp = t;
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.swiper = this.$refs['swiper'];
				this.swiperUpdate();
			});

			let num = this.th_progressValue;
			for(let i=0;i<=num;i++){
				setTimeout(()=>{
					this.progressValue=i;
				},800)
			}
		}
	}
</script>

<style scoped lang="scss">
	.swiper-pagination >>> .swiper-pagination-bullet-active{width: rem(12)}
	h3, p {
		margin: 0;
		padding: 0;
	}
	.driving-top {
		background: #fff;
		overflow: hidden;
		padding: 0 rem(15);

		.driving-title {
			padding: rem(20);
			display: flex;
			height: rem(20);
			line-height: rem(20);
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
					width: rem(6);
					height: rem(6);
					background: #CA9F75;
					position: absolute;
					top: rem(-3);
					right: 0;
					transform: rotate(-60deg);
				}

				.driving-title-l {
					right: auto;
					left: 0;
				}
			}

			h3 {
				margin: 0 rem(5);
			}
		}


		.driving-slide {
			overflow: hidden;

			.driving-learn {
				display: flex;
				background: url("http://pc.lifest.dtb315.com/static/img/life-nav/bg@2x.png") no-repeat;
				background-size: 100% 100%;
				padding: rem(20);
				border-radius: rem(5);
				overflow: hidden;

				.driving-learn-img {
					width: rem(40);
					overflow: hidden;
					margin: 0 rem(20);

					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.driving-learn-desc {
					flex: 1;
					color: #fff;

					h3 {
						font-size: rem(16);
						margin: rem(8) 0;
					}

					p {
						font-size: rem(14);
					}
				}
			}

			.driving-topic {
				display: flex;
				padding: rem(15) 0 rem(30);

				.driving-topic-img {
					width: rem(95);
					height: rem(60);
					overflow: hidden;
					margin-right: rem(12);

					img {
						vertical-align: top;
						width: 100%;
					}
				}

				.driving-topic-desc {
					flex: 1;

					.driving-topic-desc-tit {
						display: flex;

						div {
							flex: 1;
							color: #333;
							font-size: rem(16);
						}
					}

					.driving-topic-desc-xing {
						height: rem(15);
						line-height: rem(15);

						i {
							font-size: rem(14);
						}
						.active{
							color: #CA9F75;
						}
					}

					.driving-topic-desc-progress {
						display: flex;
						color: #999;
						font-size: rem(10);

						.driving-topic-desc-l {
							flex: 1;

							progress {
								border: 0;
								background: #999;
								height: rem(3);
								border-radius: rem(3);

								&::-webkit-progress-bar {
									background: transparent;
								}

								&::-webkit-progress-value {
									background: #CA9F75;
								}
							}
							.driving-topic-desc-l-btn{
								background: #CA9F75;
								color: #fff;
								border-radius: 2px;
								margin-top: rem(4);
								font-size: rem(12);
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

	.driving-list {
		margin-top: rem(10);
		background: #fff;
		overflow: hidden;

		.driving-list-tab {
			margin: rem(20) rem(10) rem(10);
			display: flex;
			height: rem(30);
			border: 1px solid #CA9F75;
			box-sizing: border-box;
			overflow: hidden;
			border-radius: rem(5);
			line-height: rem(30);

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
