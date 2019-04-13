<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
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
		data() {
			return {
				life_nav:{},
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
			getdata() {
				this.$axios.get('/api/classify/assortment.html', {
					params: {
						column_id: this.$route.params.nav_id
					}
				}).then((res) => {
					//console.log(res.data.data.system[0].id)
					// this.$router.push({path:res.system[0].id,query:{growId:this.$route.params.id}})
					this.$router.push(
						this.$router.routerID.getPathID({
							id: res.data.data.system[0].id,
							params: {
								id: res.data.data.system[0].id,
								nav_id: this.$route.params.nav_id
							}
						})
					)
				});
			}
		},
		mounted() {
			this.getdata();
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
