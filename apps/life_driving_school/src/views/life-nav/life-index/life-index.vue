<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">

		<life_nav_tab :title='{
            title:{
                value: "生活导航"
            }
        }' :leftControl="`/`"></life_nav_tab>
		
		<div v-if="banner && banner.length > 0">
			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(slide, index) in banner" :key="index"><!--:to="{path:'driving-license/fitness-test'+'?record_id='+slide.id}"-->
						<a :href="slide.url" target="_blank"></a>
						<div class="life-nav-banner">
							<a :href="slide.url">
								<img :src="slide.src_img">
							</a>
						</div>
					</swiper-slide>
					<div class="swiper-pagination" id="pagination" slot="pagination"></div>
				</swiper>
			</bv-scroll>
		</div>
		

		<div class="life-nav-icon">
			<div class="life-nav-icon-li">
				<router-link :to="`${currentFullPath}/introduce-detail`">
					<div class="life-nav-icon-liimg"><img :src="`${config.path.static}/img/life-nav/1@2x.png`"></div>
					<p>驾照简介</p>
				</router-link>
			</div>
			<div class="life-nav-icon-li">
				<router-link to="/grow/12/video/16">
					<div class="life-nav-icon-liimg"><img :src="`${config.path.static}/img/life-nav/2@2x.png`"></div>
					<p>视频直播</p>
				</router-link>
			</div>
			<div class="life-nav-icon-li">
				<router-link to="" @click.native="zwkf_click">
					<div class="life-nav-icon-liimg"><img :src="`${config.path.static}/img/life-nav/3@2x.png`"></div>
					<p>健康测试</p>
				</router-link>
			</div>
		</div>

		<div class="life-nav-information">
			<h2>精选资讯</h2>
			<bv-scroll :api="api" :disabled="load.state.disabled">
				<w-arrlist :list='load.data.lists'></w-arrlist>
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

		</div>

	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import WArrlist from '@components/wap/article/w-arrlist'
	import router from '@router';
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "index",
		mixins: [scrollMixin()],
		components: {
			life_nav_tab,
			'w-arrlist': WArrlist
		},
		data() {
			return {
				swiperOption: {
					pagination: {
						el: "#pagination"
					},
					loop: true,
					autoplay: {
						delay: 5000,
						disableOnInteraction: false,
					},
				},
				swiper:{},
				life_nav:{},
				banner:''
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
			swiperUpdate() {
				this.swiper.update();
			},
			banner_show() {
				return this.$axios.get('/api/Banner/index',{
					params:{
						column_id:this.$route.params.nav_id
					}
				}).then(res=>{
					//console.log(res)
					this.banner = res.data.data.banner;
					this.$nextTick(() => {
						this.swiper = this.$refs['swiper'];
						this.swiperUpdate();
					});
				})
			},
			api() {
				//const page = this.load.params.page++;
				return this.$axios.get('/api/Classify/column_article', {
					params: {
						column_id:this.$route.params.id,
						page: this.load.params.page++
					}
				}).then((res) => {
					//console.log(res.data.data)
					const {data: resultData} = res.data;
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
			},
			zwkf_click(){
				$toast({
					message: '暂未开放',
					duration: 3000
				});
				return;
			}
		},
		mounted() {
			this.banner_show();
		}

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
			max-height: rem(150);
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
