<template>
	<bv-home-view class='wap' :router-level='3'>
		<w-article-body :title='"课程详情"' :config='config'></w-article-body>
	</bv-home-view>
</template>

<script>
		import WDetailBody from '@components/wap/article/w-article-body/w-article-body.vue';
    export default {
      components: {
        "w-article-body": WDetailBody
      },
      data() {
        return {
          header: {
            title: {
              value: '课程详情'
            }
          },
          detailData: {
            title: '三维空间挺好玩',
            time: 545457545,
            content: '内容',
            readers: 20,
            support: 52
          },
          config: {
            url: {
              contentUrl: '/api/Article/info.html'
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
      }
    }
</script>

