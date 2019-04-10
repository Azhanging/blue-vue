<template>
	<bv-home-view class='wap' :router-level='3'>
		<life_nav_tab :growIndex='3' :title='{
            title:{
                value: "健康导航"
            }
        }'></life_nav_tab>

		<div class="recommend-li">
			<div class="recommend-li-top">
				<div class="recommend-li-top-img">
					<img :src="det_data.head_img">
				</div>
				<div class="recommend-li-top-tit">
					<h3>{{ det_data.name }}</h3>
					<p>{{ det_data.create_time }}</p>
				</div>
			</div>

			<div class="recommend-li-box">
				<div class="recommend-li-box-p">
					{{ det_data.content }}
				</div>
				<div class="recommend-li-box-imgb">
					<!-- <div v-for="item in imglist"><img src="https://image.dtb315.com/327000.jpg?val=Thumb"></div>-->
					<bv-scroll :api="api">
						<div>
							<div v-blue-photoswipe="{itemTagName:'DIV'}">
								<div v-for="img in det_data.list_img" class="img-list">
									<img :src="img" width="50" data-size="0x0" :msrc="img"/>
								</div>
							</div>
						</div>
					</bv-scroll>
				</div>
				<button @click="btn_comments">提交评论测试按钮</button>

				<div class="question-review">

					<div class="question-review-top" v-for="(comms,index) in contentData" :key="index">
						<div class="question-review-top-l">
							<img :src="comms.head_img">
						</div>
						<div class="question-review-top-r">
							<div class="question-review-top-tit">
								<div class="question-review-top-tit-l">{{ comms.nickname }}</div>
								<div class="question-review-top-tit-r">
									<span @click="btn_commLike(comms.id,index)" :class="{on:(comms.like)}"><i class="iconfont icondianzan"></i> {{ comms.like_num }}</span>
									<span @click="btn_reply(comms.id)"><i class="iconfont icongengduo"></i></span>
								</div>
							</div>
							<div class="question-review-top-time">{{ comms.time }}</div>
							<div class="question-review-top-box">{{ comms.content }}</div>
							<div class="question-review-top-reply" v-for="comms_m in comms.son"><span>@{{ comms.nickname }} </span>{{ comms_m.content }}</div>
						</div>
					</div>

					<!--<div class="question-review-top">
						<div class="question-review-top-l">
							<img src="https://image.dtb315.com/76343.jpg">
						</div>
						<div class="question-review-top-r">
							<div class="question-review-top-tit">
								<div class="question-review-top-tit-l">鼠妹的小夏目</div>
								<div class="question-review-top-tit-r">
									<span><i class="iconfont icondianzan"></i> 155</span>
									<span @click="btn_reply"><i class="iconfont icongengduo"></i></span>
								</div>
							</div>
							<div class="question-review-top-time">2小时前</div>
							<div class="question-review-top-box">你好，我是鼠妹的夏目</div>
						</div>
					</div>-->
				</div>


			</div>
		</div>


		<div class="review-txt">
			<div class="review-txt-l">
				<i class="iconfont iconbianji"></i>
				<form class="review-txt-form" action="javascript:return true">
					<input ref="review_hf" :autofocus="focus" type="search" v-model="content_txt" placeholder="写评论...">
				</form>

				<!--@keypress="btn_comments"-->
			</div>
			<div class="review-txt-r">
				<div><i class="iconfont iconpinglun"></i><span v-if="det_data.comment_num>0">{{ det_data.comment_num }}</span></div>
				<div><i class="iconfont iconxingxing"></i></div>
				<div><i class="iconfont icondianzan"></i></div>
				<div><i class="iconfont icon-"></i></div>
			</div>
		</div>



		<div class="reply-mask" v-if="reply_show"></div>
		<div class="reply-show" v-if="reply_show">
			<div class="reply-item" @click="btn_reply_txt()">回复</div>
			<div class="reply-item" @click="btn_reply_h">取消</div>
		</div>
	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "index",
		components: {
			life_nav_tab,
		},
		data() {
			return {
				imglist: [{
					imgs: [{src: 'https://image.dtb315.com/327640.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327773.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/326999.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327036.jpg?val=Thumb'},
						{src: 'https://image.dtb315.com/327703.jpg?val=Thumb'}
					]
				}],
				reply_show:false,
				det_data:'',//详情数据

				contentData:'',//评论列表

				content_txt:'',//文本框-评论内容

				pid:null//回复别人评论id
			}
		},
		methods:{
			btn_reply(i) {
				this.reply_show = true
				this.pid = i;
			},
			btn_reply_h() {
				this.reply_show = false
				this.pid = null;
			},
			btn_reply_txt(){
				this.reply_show = false;
				this.$nextTick(()=>{
					this.$refs.review_hf.focus()
				})
			},

			/*详情数据请求*/
			detail_data() {
				return this.$axios.get('/api/circle/info',{
					params: {
						circle_id: this.$route.query.circle_id
					}
				}).then((res)=>{
					console.log(res.data.data)
					this.det_data = res.data.data
					this.contentData = res.data.data.comment.list
				}).catch((err)=>{
					console.log(err);
				})
			},
			//提交评论
			btn_comments() {
				/*searchGoods (event) {
					if (event.keyCode == 13) {
						event.preventDefault(); //禁止默认事件（默认是换行）
					}
				}*/
				if(this.content_txt==''){
					$toast({
						message: '评论不能为空',
						duration: 3000
					});
					return;
				}

				this.$axios.post('/api/circle/comment',{
					circle_id: this.$route.query.circle_id,//id
					pid: this.pid,//评论id
					content:this.content_txt,//评论内容
				}).then((res)=>{
					//console.log(res.data)
					if(res.data.code==200){
						$toast({
							message: '评论成功',
							duration: 3000
						});
						this.content_txt='';
						this.pid = null;//清楚评论别人id
						this.detail_data();//刷新评论
					}else {
						$toast({
							message: '评论失败',
							duration: 3000
						});
						return;
					}
				});
			},
			//给评论点赞
			btn_commLike(cid,i){
				//console.log(cid)
				this.$axios.get('/api/circle/commentLike', {
					params: {
						comment_id:cid
					}
				}).then(res => {
					//console.log(res)
					//console.log(res.data.data.like)
					//console.log(res.data.data.like_num)
					if(res.data.data.like){
						this.contentData[i].like = res.data.data.like
						this.contentData[i].like_num = res.data.data.like_num
					}else {
						this.contentData[i].like = res.data.data.like
						this.contentData[i].like_num = res.data.data.like_num
					}
				})
			}

		},
		mounted() {
			this.detail_data();
		}
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.recommend-li {
		padding: 0 rem(15);
		border-bottom: 1px solid #e5e5e5;
		overflow: hidden;
		margin-bottom: rem(50);
		.recommend-li-top {
			padding: rem(15) 0;
			overflow: hidden;
			.recommend-li-top-img {
				width: rem(50);
				height: rem(50);
				overflow: hidden;
				border-radius: 100%;
				margin-right: rem(8);
				float: left;
				img {
					width: 100%;
					min-height: 100%;
					vertical-align: top;
				}
			}

			.recommend-li-top-tit {


				h3 {
					font-size: rem(18);
					color: #222;
					font-weight: normal;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				p {
					font-size: rem(14);
					color: #888;
					margin-top: rem(8);
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.recommend-li-box {
			.recommend-li-box-p {
				font-size: rem(16);
				color: #333;
				line-height: rem(24);
				margin-bottom: rem(15);
			}

			.recommend-li-box-imgb {
				&:after {
					clear: both;
					content: '.';
					display: block;
					width: 0;
					height: 0;
					visibility: hidden;
				}

				.img-list {
					float: left;
					width: 32.5%;
					margin-right: 3px;
					margin-bottom: 3px;
					height: rem(100);
					overflow: hidden;

					img {
						width: 100%;
						vertical-align: top;
						min-height: rem(100);
					}

					&:nth-child(3n) {
						margin-right: 0;
					}
				}
			}

			.recommend-li-box-video {
				position: relative;

				.recommend-li-box-video-t {
					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.recommend-li-box-video-back {
					background: rgba(0, 0, 0, .5);
					position: absolute;
					left: 0;
					top: 0;
					bottom: 0;
					right: 0;
					z-index: 5;
				}

				.recommend-li-box-video-btn {
					width: rem(40);
					height: rem(40);
					position: absolute;
					left: 50%;
					top: 50%;
					margin-left: rem(-20);
					margin-top: rem(-20);
					z-index: 6;
					color: #fff;
					border: 1px solid #fff;
					border-radius: 100%;
					text-align: center;
					line-height: rem(40);
					box-sizing: border-box;

					i {
						font-size: rem(14);
					}
				}
			}

			.recommend-li-box-view {
				padding: rem(10) 0;
				font-size: rem(12);
				color: #666;

				span{
					margin-right: rem(20);
				}
				span.on{
					color: #CA9F75;
					i.icondianzan{
						color: #CA9F75;
					}
				}
			}

			.question-review {
				overflow: hidden;
				border-top: 1px solid #e5e5e5;
				margin-top: rem(15);
				padding-top: rem(15);

				.question-review-top {
					display: flex;
					margin-bottom: rem(10);

					.question-review-top-l {
						width: rem(38);
						height: rem(38);
						border-radius: 100%;
						overflow: hidden;
						margin-right: rem(15);

						img {
							vertical-align: top;
							width: 100%;
						}
					}

					.question-review-top-r {
						flex: 1;

						.question-review-top-tit {
							display: flex;
							line-height: rem(20);
							font-size: rem(14);

							.question-review-top-tit-l {
								flex: 1;
							}

							.question-review-top-tit-r {
								span {
									margin-left: rem(10);
								}
								span.on{
									color: #CA9F75;
									i.icondianzan{
										color: #CA9F75;
									}
								}
							}
						}

						.question-review-top-time {
							font-size: rem(12);
						}

						.question-review-top-box {
							margin: rem(10) 0;
							font-size: rem(14);
							color: #333;
						}

						.question-review-top-reply {
							background: #F7F7F7;
							padding: rem(10);
							color: #666;

							span {
								color: #507DAF;
							}
						}
					}
				}
			}
		}
	}

	.review-txt {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
		height: rem(50);
		background: #fff;
		padding: rem(10) rem(15);
		display: flex;
		box-sizing: border-box;

		.review-txt-l {
			width: rem(155);
			display: flex;
			height: rem(30);
			background: #f7f7f7;
			color: #999;
			box-sizing: border-box;
			padding: 0 rem(15);
			align-items: center;
			.review-txt-form{
				flex: 1;
			}
			input[type='search'] {
				background: none;
				height: rem(30);
				outline: none;
				border: 0;
				margin-left: rem(10);
				width: rem(110);
			}
		}

		.review-txt-r {
			flex: 1;
			text-align: center;
			line-height: rem(30);

			div {
				display: inline-block;
				margin: 0 rem(8);
				position: relative;

				span {
					position: absolute;
					left: rem(10);
					top: -2px;
					background: #FE6270;
					height: rem(12);
					border-radius: rem(3);
					line-height: rem(12);
					vertical-align: middle;
					color: #fff;
					padding: 1px 3px;
					font-size: rem(10);
				}
			}
		}
	}

	.reply-mask{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		background: rgba(000,000,000,.5);
		z-index: 200;
	}
	.reply-show{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background: #fff;
		z-index: 201;
		.reply-item{
			padding: rem(15);
			text-align: center;
			color: #333;
			font-size: rem(18);
			border-bottom: 1px solid #e5e5e5;
			&:last-child{
				border-bottom: 0;
			}
		}
	}
</style>
