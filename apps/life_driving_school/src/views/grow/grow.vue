<template>
	<bv-home-view class='wap' :router-level='2' style='background-color: #f4f4f4;'>

		<!--空页面-->
	</bv-home-view>

	<!--<bv-home-view v-else='config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->


</template>

<script>


	export default {
		name: "grow",
		watch:{
			$route(to,from){
				//跳到空白页时返回到首页
				if(from.path == '/grow/12/college/15' && to.path=='/grow/12'){
					this.$router.push('/')
				}
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		methods: {
			// /api/classify/assortment?column_id=12 点进来的

			getdata() {
				/^\/grow\/((?:[^\/]+?))(?:\/(?=$))?$/i.test(this.$route.fullPath) &&
				this.$axios.get('/api/classify/assortment', {
					params: {
						column_id: this.$route.params.grow_id
					}
				}).then((res) => {
					// this.$router.push({path:res.system[0].id,query:{growId:this.$route.params.id}})
					let t_path = '/grow/'+this.$route.params.grow_id;//只grow跳转首页
					if(this.currentFullPath == t_path){
						this.$router.push(
							this.$router.routerID.getPathID({
								id: res.data.data.system[0].id,
								params: {
									classId: res.data.data.system[0].id,
									grow_id: this.$route.params.grow_id
								}
							})
						)
					}
				});
			}
		},

		mounted() {
			this.getdata();
		}

	}
</script>

<style lang='scss' scoped>
	.wap {
		.scroll-x {
			border-bottom: 1px #eee solid;
			.scroll_img {
				width: rem(80);
				height: rem(114);
				img {
					vertical-align: top;
				}
				.scroll_read {
					bottom: 0;
					left: 0;
					background-color: rgba(0, 0, 0, .4);
				}
			}
			.scroll_name {
				width: rem(80);
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
		.course {
			.item_course {
				margin-right: rem(10);
				&:last-child {
					margin-right: 0;
				}
				img {
					width: rem(40);
					height: rem(40);
				}
			}
			.default {
				background: url($base-url+ '/img/grow/ccourse2.png') no-repeat;
				background-size: 100% 100%;
				color: #666;
			}
			.active {
				color: #A7815C;
				background: url($base-url+ '/img/grow/course.png') no-repeat;
				background-size: 100% 100%;

			}
		}
		.courseList {
			border-bottom: 1px #e5e5e5 solid;
			img {
				width: rem(120);
				height: rem(80);
			}
		}
	}
</style>
