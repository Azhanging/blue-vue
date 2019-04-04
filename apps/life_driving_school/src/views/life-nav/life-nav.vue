<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">

		<bv-scroll>

			<life_nav_tab :growIndex='0' :title='{
            title:{
                value: "生命导航"
            }
        }'
			></life_nav_tab>

			<div class="life-nav-banner">
				<img src="http://image.dtb315.com/5217013.jpg">
			</div>

			<div class="life-nav-icon">
				<div class="life-nav-icon-li">
					<div class="life-nav-icon-liimg"><img src="http://pc.lifest.dtb315.com/static/img/life-nav/1@2x.png"></div>
					<p>驾照简介</p>
				</div>
				<div class="life-nav-icon-li">
					<router-link to="/grow/video">
						<div class="life-nav-icon-liimg"><img src="http://pc.lifest.dtb315.com/static/img/life-nav/2@2x.png"></div>
						<p>视频直播</p>
					</router-link>
				</div>
				<div class="life-nav-icon-li">
					<router-link :to="`${currentFullPath}/fitness-test`">
						<div class="life-nav-icon-liimg"><img src="http://pc.lifest.dtb315.com/static/img/life-nav/3@2x.png"></div>
						<p>健康测试</p>
					</router-link>
				</div>
			</div>

			<div class="life-nav-information">
				<h2>精选资讯</h2>
				<w-arrlist :list='load.data.lists'></w-arrlist>

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
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import WArrlist from '@components/wap/article/w-arrlist'
	import router from '@router';

	export default {
		name: "index",
		mixins: [scrollMixin()],
		components: {
			life_nav_tab,
			'w-arrlist': WArrlist
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {

		},

	}
</script>

<style scoped lang="scss">
	h2, p {
		margin: 0;
		padding: 0;
	}

	.life-nav-banner {
		overflow: hidden;

		img {
			width: 100%;
			vertical-align: top;
		}
	}

	.life-nav-icon {
		padding: rem(20) rem(15);
		display: flex;
		background: #fff;

		.life-nav-icon-li {
			width: rem(110);
			height: rem(80);
			background: #f4f4f4;
			margin-right: rem(10);
			flex: 1;
			&:last-child {
				margin-right: 0;
			}

			.life-nav-icon-liimg {
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

	.life-nav-information {
		/*padding: 0 rem(15);*/
		margin-top: rem(10);
		background: #fff;

		h2 {
			font-size: rem(16);
			font-weight: normal;
			color: #424243;
			padding: rem(15) rem(15) 0;
		}


	}
</style>
