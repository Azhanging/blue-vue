<template>
	<bv-home-view class='wap' :router-level='3' style="background: #ededed;">

		<w-home-header :header='{
            title:{
                value: "问答详情"
            }
        }'></w-home-header>

		<div class="question-lists">
			<div class="question-item">
				<div class="question-ask">
					<div class="question-ask-l"><i>Q</i></div>
					<div class="question-ask-c">{{ det_data.question }}</div>
					<div class="question-ask-r" @click="btn_reply(null)"><i class="iconfont icongengduo"></i></div>
				</div>
				<div class="question-answer">
					<div class="question-answer-l">
						<i>A</i>
					</div>
					<div class="question-answer-r">
						{{ det_data.answer }}
					</div>
				</div>
				<button @click="btn_comments">提交评论测试按钮</button>
				<div class="question-review">
					<h2>全部评论</h2>
					<div class="question-review-top" v-for="(item,index) in contentData">
						<div class="question-review-top-l">
							<img :src="item.head_img">
						</div>
						<div class="question-review-top-r">
							<div class="question-review-top-tit">
								<div class="question-review-top-tit-l">{{ item.nickname }}</div>
								<div class="question-review-top-tit-r">
									<span @click="btn_commLike(item.id,index)" :class="{on:(item.like)}"><i class="iconfont icondianzan"></i> {{ item.like_num }}</span>
									<span @click="btn_reply(item.id)"><i class="iconfont icongengduo"></i></span>
								</div>
							</div>
							<div class="question-review-top-time">{{ item.time }}</div>
							<div class="question-review-top-box">{{ item.content }}</div>
							<div class="question-review-top-reply" v-for="comms in item.son">
								<!--<span>@猫和老鼠</span>--><span>{{ comms.nickname }}</span> {{ comms.content }}
							</div>
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
	import Index from "../question-answer";
	import { $toast } from "$use-in-vue/mint-ui/toast";
	import store from '@store'
	export default {
		name: "detail",
		components: {Index},
		data() {
			return {
				reply_show:false,
				det_data:'',
				contentData:'',
				content_txt:'',
				pid:null//回复别人评论id
			}
		},
		methods: {
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
				//this.$refs.review_hf.focus();
				this.$nextTick(()=>{
					this.$refs.review_hf.focus()
				})
			},
			show_detail(){//详情获取
				return this.$axios.get('/api/feedback/info',{
					params: {
						feedback_id: this.$route.query.feedback_id
					}
				}).then((res)=>{
					console.log(res.data.data)
					this.det_data = res.data.data
					this.contentData = res.data.data.comment.list
				}).catch((err)=>{
					console.log(err);
				})
			},

			btn_comments(){//发布评论

				if(this.content_txt==''){
					$toast({
						message: '评论不能为空',
						duration: 3000
					});
					return;
				}

				this.$axios.post('/api/feedback/comment',{
					feedback_id: this.$route.query.feedback_id,//id
					comment_id: this.pid,//评论id
					content:this.content_txt,//评论内容
					//at_id:1,
				}).then((res)=>{
					console.log(res.data)
					if(res.data.code==200){
						$toast({
							message: '评论成功',
							duration: 3000
						});
						this.content_txt='';
						this.pid = null;//清楚评论别人id
						this.show_detail();//刷新评论
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
				this.$axios.get('/api/feedback/commentLike', {
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
			this.show_detail();
		}
	}
</script>

<style scoped lang="scss">
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
	.question-lists {
		padding: rem(10) rem(15) 0;
		margin-bottom: rem(50);

		.question-item {
			background: #fff;
			margin-bottom: rem(15);
			padding-bottom: rem(15);
			border-radius: rem(3);
			font-size: rem(14);
			display: block;
			.question-ask {
				padding: rem(15);
				display: flex;

				.question-ask-l {
					width: rem(15);
					height: rem(15);
					background: #CA9F75;
					vertical-align: middle;
					line-height: rem(15);
					text-align: center;
					margin-top: rem(2);
					margin-right: rem(7);

					i {
						font-style: normal;
						color: #fff;
					}
				}

				.question-ask-c {
					flex: 1;
					line-height: rem(20);
					color: #333;
				}
			}

			.question-answer {
				display: flex;
				padding: 0 rem(15);

				.question-answer-l {
					width: rem(15);
					height: rem(15);
					background: #CA9F75;
					vertical-align: middle;
					line-height: rem(15);
					text-align: center;
					margin-top: rem(2);
					margin-right: rem(7);

					i {
						font-style: normal;
						color: #fff;
					}
				}

				.question-answer-r {
					flex: 1;
					background: #F7F7F7;
					padding: rem(10);
					color: #666;
				}

			}

			.question-review {
				overflow: hidden;

				h2 {
					border-top: 1px solid #e5e5e5;
					margin-top: rem(15);
					font-weight: normal;
					color: #333;
					font-size: rem(14);
					padding: rem(15) rem(15) rem(10);
				}

				.question-review-top {
					padding: 0 rem(15);
					display: flex;
					margin-top: rem(10);
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

			.question-btn {
				text-align: center;
				padding: rem(12);
				color: #CA9F75;
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
