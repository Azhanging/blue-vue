<template>
	<bv-home-view class='wap' :router-level="2">

		<!--文章内容-->
		<w-article-detail :header="{
				title:{
					value: '详情'
				}
			}" :opts="opts"
		></w-article-detail>

		<!--文章阅读量 点赞量-->
		<w-article-clicknum :opts="opts" :comment="comment"></w-article-clicknum>

		<!--文章评论-->
		<bv-scroll :api="api" :disabled="load.state.disabled">
			<w-comment
				:opts="opts"
				:comment="comment"
				@replyFocus='replyFocus'
				@hideReply="hideReply"
				@showReply="showReply"
			></w-comment>
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

		<!--回复评论-->
		<template slot="footer">
			<w-comment-reply :opts="opts" :comment="comment" ref="reply"></w-comment-reply>
		</template>

	</bv-home-view>
</template>

<script>
	import WArticleDetail from '@components/wap/article/w-article-detail';
	import WArticleClicknum from '@components/wap/article/w-article-clicknum';
	import WComment from '@components/wap/article/w-comment';
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	import { commentMixin } from '@components/wap/article/w-article-body/article';
	import WCommentReply from '@components/wap/article/w-comment-reply';
	export default {
		name: "detail",
		mixins: [scrollMixin(), commentMixin({
			scrollEndHook,
			scrollNoHasListData
		})],
		data() {
			return {
				comment: {},
				opts: {
					url: {
						contentUrl: '/api/Article/info'
					},
					data: {
						contentParams: {// 文章内容 请求参数
							article_id: this.$route.params.article_id
						},
						commentParams: { // 评论内容 请求参数
							article_id: this.$route.params.article_id,
							data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
						},
						submitCommentParams: { // 提交评论 请求参数 只需第一个
							article_id: this.$route.params.article_id,
							data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
						}
					}
				},
				info: {},
				article_id:this.$route.params.article_id
			}
		},
		components: {
			'w-article-detail': WArticleDetail,
			'w-article-clicknum': WArticleClicknum,
			'w-comment': WComment,
			'w-comment-reply': WCommentReply
		},
		methods:{

			Update_progress(){

				const { contentUrl } = this.opts.url;
				const { contentParams } = this.opts.data;

				// 内容 /api/Article/info
				this.$axios.get(contentUrl, {//停留时间
					params: contentParams
				}).then(res => {
					const { data } = res.data;
					this.info = data;
					//console.log(this.info)
					//console.log(this.info.integral_time)

					let stime = this.info.integral_time;
					//更新课程
					setTimeout(()=>{
						this.$axios.post('/api/study/updateStudy', {
							article_id: this.article_id
						}).then((res) => {
							//console.log(res)
						});
					},stime*1000)

				}).catch(error => {
					console.log(error);
				});

				//console.log('栏目'+this.$refs.column.data.column_id)
				//console.log('文章'+this.$route.params.article_id)

			}
		},
		mounted() {
			this.Update_progress();
		}
	}
</script>
