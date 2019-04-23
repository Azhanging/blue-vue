<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "我的消息"
            }
        }'

		>
		</w-home-header>

		<div class="message-box">
			<div v-if="comment!=''">
				<router-link to="/students/message/comment">
					<div class="message-item">
						<div class="message-item-img">
							<img :src="comment.head_img">
						</div>
						<div class="message-item-r">
							<div class="message-item-r-top">
								<div class="message-item-r-top-l">评论</div>
								<div class="message-item-r-top-r">{{ comment.create_time }}</div>
							</div>
							<div class="message-item-r-hf" v-html="comment.content">
								<!--<span>{{ comment.member_id }}</span>--> <!--{{ comment.content }}-->
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<div v-else>
				<div class="message-item">
					<div class="message-item-img">
						<img :src="`${config.path.static}/img/public/share/default-share-img.png`">
					</div>
					<div class="message-item-r">
						<div class="message-item-r-top">
							<div class="message-item-r-top-l">评论</div>
							<div class="message-item-r-top-r"></div>
						</div>
						<div class="message-item-r-hf">
							还没有人评论你哦
						</div>
					</div>
				</div>
			</div>


			<div v-if="fabulous!=''">
				<router-link to="/students/message/fabulous">
					<div class="message-item">
						<div class="message-item-img">
							<img :src="fabulous.head_img">
						</div>
						<div class="message-item-r">
							<div class="message-item-r-top">
								<div class="message-item-r-top-l">点赞</div>
								<div class="message-item-r-top-r">{{ fabulous.create_time | timeFilter("Y-M-D")  }}</div>
							</div>
							<div class="message-item-r-hf" v-html="fabulous.content">
								<!--<span>{{ fabulous.member_id }}</span> --><!--{{ fabulous.content }}-->
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<div v-else>
				<div class="message-item">
					<div class="message-item-img">
						<img :src="`${config.path.static}/img/public/share/default-share-img.png`">
					</div>
					<div class="message-item-r">
						<div class="message-item-r-top">
							<div class="message-item-r-top-l">点赞</div>
							<div class="message-item-r-top-r"></div>
						</div>
						<div class="message-item-r-hf">
							还没人点赞你哦
						</div>
					</div>
				</div>
			</div>

			<div v-if="station!=''">
				<router-link to="/students/message/station">
					<div class="message-item">
						<div class="message-item-img">
							<img :src="`${config.path.static}/img/public/share/default-share-img.png`">
						</div>
						<div class="message-item-r">
							<div class="message-item-r-top">
								<div class="message-item-r-top-l">站内信</div>
								<div class="message-item-r-top-r">{{ station.create_time | timeFilter("Y-M-D") }}</div>
							</div>
							<div class="message-item-r-hf" v-html="station.content">
								<!--{{ station.content }}-->
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<div v-else>
				<div class="message-item">
					<div class="message-item-img">
						<img :src="`${config.path.static}/img/public/share/default-share-img.png`">
					</div>
					<div class="message-item-r">
						<div class="message-item-r-top">
							<div class="message-item-r-top-l">站内信</div>
							<div class="message-item-r-top-r"></div>
						</div>
						<div class="message-item-r-hf">
							暂无站内信
						</div>
					</div>
				</div>
			</div>


			<div v-if="notice!=''">
				<router-link to="/students/message/notice">
					<div class="message-item">
						<div class="message-item-img">
							<img :src="`${config.path.static}/img/public/share/default-share-img.png`">
						</div>
						<div class="message-item-r">
							<div class="message-item-r-top">
								<div class="message-item-r-top-l">更新公告</div>
								<div class="message-item-r-top-r">{{ notice.create_time | timeFilter("Y-M-D") }}</div>
							</div>
							<div class="message-item-r-hf" v-html="notice.content">
								<!--{{ notice.content }}-->
							</div>
						</div>
					</div>
				</router-link>
			</div>
			<div v-else>
				<div class="message-item">
					<div class="message-item-img">
						<img :src="`${config.path.static}/img/public/share/default-share-img.png`">
					</div>
					<div class="message-item-r">
						<div class="message-item-r-top">
							<div class="message-item-r-top-l">更新公告</div>
							<div class="message-item-r-top-r"></div>
						</div>
						<div class="message-item-r-hf">
							暂无更新公告
						</div>
					</div>
				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "message",
		data() {
			return {
				comment:'',//评论
				fabulous:'',//点赞
				station:'',//站内
				notice:'',//更新公告
			}
		},
		methods: {
			messageData() {
				this.$axios.get('/api/Member_News/index',{

				}).then(res=>{
					//console.log(res.data.data)
					this.comment=res.data.data.comment
					this.fabulous=res.data.data.fabulous
					this.station=res.data.data.station
					this.notice=res.data.data.notice
				})
			}
		},
		mounted() {
			this.messageData()
		}
	}
</script>

<style scoped lang="scss">
.message-box{
	background: #fff;
	.message-item{
		padding: 0 rem(15);
		display: flex;
		.message-item-img{
			width: rem(40);
			height: rem(40);
			border-radius: 100%;
			overflow: hidden;
			margin-right: rem(10);
			margin-top: rem(15);
			img{width: 100%;vertical-align: top;}
		}
		.message-item-r{
			flex: 1;
			border-bottom: 1px solid #e5e5e5;
			padding: rem(15) 0;
			.message-item-r-top{
				font-size: rem(14);
				color: #999;
				display: flex;
				.message-item-r-top-l{
					flex: 1;
				}
				.message-item-r-top-r{
					margin-left: rem(20);
				}
			}
			.message-item-r-hf{
				font-size: rem(14);
				color: #666;
				margin-top: rem(5);
				span{
					color: #46505A;
					margin-right: rem(10);
				}
			}
		}
	}
}
</style>
