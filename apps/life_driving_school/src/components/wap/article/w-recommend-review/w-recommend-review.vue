<template>
	<div class='wap' :router-level="2">
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
				<div class="bc-t-c bc-pd-10rp" v-else-if="load.data.list.length === 0">
					暂无数据
				</div>
				<div class="bc-t-c bc-pd-10rp" v-else-if="!load.state.hasMore && load.data.list.length > 0">
					暂无更多数据...
				</div>
			</template>
		</bv-scroll>

		<!--回复评论-->
		<template slot="footer">
			<w-comment-reply :opts="opts" :comment="comment" ref="reply"></w-comment-reply>
		</template>
	</div>
</template>

<script>
	import WArticleClicknum from '@components/wap/article/w-article-clicknum';
	import WComment from '@components/wap/article/w-comment';
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';
	import { commentMixin } from '@components/wap/article/w-article-body/article';
	import WCommentReply from '@components/wap/article/w-comment-reply';

	export default {
		name: "w-recommend-review",
		mixins: [scrollMixin(), commentMixin({
			scrollEndHook,
			scrollNoHasListData
		})],
		props: {
			opts: {
			}
		},
		data() {
			return {
				comment: {}
				// commentStatus: 0,  //  0为评论文章 1为评论别人(回复) 2为自己(是自己就是删除)
				// id: 0,
			}
		},
		components:{
			'w-article-clicknum': WArticleClicknum,
			'w-comment': WComment,
			'w-comment-reply': WCommentReply
		}
	}
</script>

<style scoped>

</style>
