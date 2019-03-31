<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">

		<bv-scroll>

			<growTab :growIndex='0' :title='{
            title:{
                value: "生命导航"
            }
        }'
			></growTab>

			<div class="life_nav_banner">
				<img src="http://image.dtb315.com/5217013.jpg">
			</div>

			<div class="life_nav_icon">
				<div class="life_nav_icon_li">
					<div class="life_nav_icon_liimg"><img src="https://image.dtb315.com/5580002.jpg?val=Thumb"></div>
					<p>驾照简介</p>
				</div>
				<div class="life_nav_icon_li" @click="to_video">
					<div class="life_nav_icon_liimg"><img src="https://image.dtb315.com/5580002.jpg?val=Thumb"></div>
					<p>视频直播</p>
				</div>
				<div class="life_nav_icon_li" @click="to_fitness_test">
					<div class="life_nav_icon_liimg"><img src="https://image.dtb315.com/5580002.jpg?val=Thumb"></div>
					<p>健康测试</p>
				</div>
			</div>

			<div class="life_nav_information">
				<h2>精选资讯</h2>
				<div class="life_nav_list">
					<div class="life_nav_list_li">
						<div class="life_nav_list_img">
							<img src="https://image.dtb315.com/5404878.jpg?val=Thumb">
						</div>
						<div class="life_nav_list_desc">
							<div class="life_nav_list_tit">课程标题课程标题课程标题课程标题课程标题课程标题</div>
							<div class="life_nav_list_p">课程简介课程简介课程简介课程简介课程简介课程简介课程简介</div>
							<div class="life_nav_list_view">
								<div class="life_nav_list_view_l"><i class="iconfont iconeye-"></i> 584</div>
								<div class="life_nav_list_view_r">2019-03-06</div>
							</div>
						</div>
					</div>
					<div class="life_nav_list_li">
						<div class="life_nav_list_img">
							<img src="https://image.dtb315.com/5404878.jpg?val=Thumb">
						</div>
						<div class="life_nav_list_desc">
							<div class="life_nav_list_tit">课程标题课程标题课程标题课程标题课程标题课程标题</div>
							<div class="life_nav_list_p">课程简介课程简介课程简介课程简介课程简介课程简介课程简介</div>
							<div class="life_nav_list_view">
								<div class="life_nav_list_view_l"><i class="iconfont iconeye-"></i> 584</div>
								<div class="life_nav_list_view_r">2019-03-06</div>
							</div>
						</div>
					</div>
				</div>
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

	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import growTab from "./components/life_nav_tab";
	import router from '@router';

	export default {
		name: "index",
		components: {
			growTab
		},
		methods: {
			to_video() {
				this.$router.push({'path': `/video`})
			},
			to_fitness_test() {
				this.$router.push({'path': `${router.currentRoute.fullPath}/fitness-test`})
			}
		}
	}
</script>

<style scoped lang="scss">
	h2, p {
		margin: 0;
		padding: 0;
	}

	.life_nav_banner {
		overflow: hidden;

		img {
			width: 100%;
			vertical-align: top;
		}
	}

	.life_nav_icon {
		padding: 20px 15px;
		display: flex;
		background: #fff;

		.life_nav_icon_li {
			width: 110px;
			height: 80px;
			background: #f4f4f4;
			margin-right: 10px;

			&:last-child {
				margin-right: 0;
			}

			.life_nav_icon_liimg {
				width: 37px;
				height: 37px;
				border-radius: 100%;
				margin: 12px auto 2px;
				overflow: hidden;

				img {
					width: 100%;
				}
			}

			p {
				color: #424242;
				font-size: rem(14);
				text-align: center;
			}
		}
	}

	.life_nav_information {
		padding: 0 15px;
		margin-top: 10px;
		background: #fff;

		h2 {
			font-size: rem(16);
			font-weight: normal;
			color: #424243;
			padding: 15px 0 0;
		}

		.life_nav_list {
			overflow: hidden;

			.life_nav_list_li {
				display: flex;
				padding: 15px 0;
				border-bottom: 1px solid #e5e5e5;

				.life_nav_list_img {
					width: 120px;
					height: 80px;
					overflow: hidden;
					margin-right: 15px;

					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.life_nav_list_desc {
					flex: 1;

					.life_nav_list_tit {
						height: 40px;
						font-size: rem(16);
						font-weight: normal;
						color: #333;
						line-height: 20px;
						overflow: hidden;
					}

					.life_nav_list_p {
						height: 40px;
						font-size: rem(14);
						font-weight: normal;
						color: #999;
						line-height: 20px;
						overflow: hidden;
					}

					.life_nav_list_view {
						display: flex;
						color: #999;
						font-size: rem(12);

						.life_nav_list_view_l {
							flex: 1;

							i {
								font-size: rem(12);
							}
						}

						.life_nav_list_view_r {

						}
					}
				}
			}
		}
	}
</style>