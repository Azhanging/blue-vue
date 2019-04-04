<template>
	<div>
		<w-article-detail :detail="detail.info" :header="{
			title:{
				value: '资讯详情'
			}
			}"></w-article-detail>

		<w-comment :comment="detail.comment"></w-comment>
	</div>
</template>

<script>
		import WArticleDetail from '@components/wap/article/w-article-detail';
    import WComment from '@components/wap/article/w-comment';

    export default {
      name: "detail-article",
      components: {
        'w-article-detail': WArticleDetail,
        'w-comment': WComment
      },
	    props: {
        detail: {
          info: {
            type: Object,
	          default: {}
          },
	        comment: {
            type: Object,
		        default: {}
	        }

        }
	    }
    }
</script>

<style scoped lang="scss">

</style>