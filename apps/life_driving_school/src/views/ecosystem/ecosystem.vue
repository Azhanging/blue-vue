<template>
	<bv-home-view class='wap' :router-level='2'>
		<bv-scroll>

			<w-home-header :header='{
            title:{
                value: "消费"
            }
        }'

			></w-home-header>
			<div class="banner-img">
				<img src="http://image.dtb315.com/5217013.jpg">
			</div>

			<div class="growsystem-tab">
				<div
					@click="tabqh(true)"
					:class="{active:(temp===true)}">
					<a>资讯</a>
				</div>
				<div
					@click="tabqh(false)"
					:class="{active:(temp===false)}">
					<a>课程</a>
				</div>
			</div>

			<div v-if="temp">
				<information></information>
			</div>
			<div v-if="!temp">
				<course></course>
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
	import information from './components/information';
	import course from './components/course';

	export default {
		name: "expense",
		mixins: [scrollMixin()],
		components: {
			information,
			course,
		},
		data() {
			return {
				temp: true,
				btn: [
					{title: '资讯'},
					{title: '课程'},
				],
				box: [
					{boxs: information},
					{boxs: course},
				]
			}
		},
		methods: {
			tabqh(t) {
				this.temp = t;
			}
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.banner-img {
		overflow: hidden;

		img {
			width: 100%;
			vertical-align: top;
		}
	}

	.growsystem-tab {
		display: flex;
		margin: 20px 15px;
		height: 30px;
		border: 1px solid #CA9F75;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 5px;
		line-height: 30px;

		div {
			flex: 1;
			text-align: center;
			font-size: 16px;

			a {
				display: block;
				color: #CA9F75;
			}
		}

		div.active {
			background: #CA9F75;

			a {
				color: #fff;
			}
		}
	}
</style>
