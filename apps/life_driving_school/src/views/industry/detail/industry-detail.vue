<template>
	<bv-home-view class='wap' :router-level='3'>
		<w-article-detail :header="{
				title:{
					value: title
				}
			}" :config="config"
		></w-article-detail>

	</bv-home-view>
</template>

<script>
			import WArticleDetail from '@components/wap/article/w-article-detail';

      export default {
        name: "industry-detail",
        data() {
          return {
            title: '产业研究详情',
            config: {
              url: {
                contentUrl: '/api/Lndust_Ryaesearch/info.html'
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
