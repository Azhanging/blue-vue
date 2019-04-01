<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">

		<bv-scroll>

			<life_nav_tab :growIndex='0' :title='{
            title:{
                value: "生命导航"
            }
        }'
			></life_nav_tab>

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

					<div class='bc-flex courseList bc-pd-tb-10rp' v-for='i in 2'>
						<img class='bc-mg-r-10rp' src='https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t' alt=''>
						<div class='bc-flex-1 bc-flex bc-flex-d-c bc-flex-jc-sb'>
							<span class='bc-f-16rp bc-t-ellipsis bc-t-ellipsis-2'>精选标题精选标题精选标题精选标题精选标题精选标题</span>
							<div class='bc-flex bc-flex-jc-sb bc-t-999'>
								<div class='bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>&nbsp;
									<span>222</span>
								</div>
								<span class=' bc-f-12rp'>{{1548946491687 | timeFilter}}</span>
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
	import life_nav_tab from "./components/life-nav-tab";
	import router from '@router';

	export default {
		name: "index",
		components: {
			life_nav_tab
		},
		methods: {
			to_video() {
				this.$router.push({'path': `grow/video`})
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
		padding: rem(20) rem(15);
		display: flex;
		background: #fff;

		.life_nav_icon_li {
			width: rem(110);
			height: rem(80);
			background: #f4f4f4;
			margin-right: rem(10);
			flex: 1;
			&:last-child {
				margin-right: 0;
			}

			.life_nav_icon_liimg {
				width: rem(37);
				height: rem(37);
				border-radius: 100%;
				margin: rem(12) auto rem(2);
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
		padding: 0 rem(15);
		margin-top: rem(10);
		background: #fff;

		h2 {
			font-size: rem(16);
			font-weight: normal;
			color: #424243;
			padding: rem(15) 0 0;
		}

		.life_nav_list {
			overflow: hidden;
			.courseList{
				border-bottom: 1px #e5e5e5 solid;
				img{
					width: rem(120);
					height: rem(80);
				}
			}
		}
	}
</style>