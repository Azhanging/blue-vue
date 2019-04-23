<template>
	<bv-home-view class='wap' :router-level='2'>

		<w-article-detail :header="header" :opts="opts"></w-article-detail>

	</bv-home-view>

	<!--<bv-home-view v-else='config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>
	import WArticleDetail from '@components/wap/article/w-article-detail';
  export default {
    name: "industry-detail",
    data() {
      return {
        header: {
          title: {
            value: '产业研究'
          }
        },
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
        }


      }
    },
    components: {
      'w-article-detail': WArticleDetail
    }
  }
</script>