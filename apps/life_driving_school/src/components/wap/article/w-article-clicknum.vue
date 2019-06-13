<template>
	<div class=''>

		<!--阅读量-->
		<div class="bc-pd-10rp bc-t-999" style="background:rgba(244,244,244,1);">
			<i class='iconfont iconeye- bc-f-15rp '></i> {{comment.click_num}}
			<i class='iconfont iconzan1 bc-t-base bc-f-20rp' v-if="comment.article_fabulous" @click.stop="clickArticleThumb(comment)"></i>
			<i class='iconfont iconzan bc-f-20rp' v-else @click.stop="clickArticleThumb(comment)"></i>
			{{comment.fabulous_num}}
		</div>

		<template >
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>

	</div>
</template>

<script>
  export default {
	  name: 'w-article-clicknum',
    props:{
      opts: {
				type: Object,
	      default: {}
      },
			comment: {
			  type: Object,
				default: {}
			}
    },
	  data() {
	    return {
        showBindPhoneStatus: false
      }
	  },
	  methods: {
      clickArticleThumb(comment) {
        const { commentParams } = this.opts.data;
        let articleAdd = !comment.article_fabulous;
        // 由没点赞->点赞
        if (articleAdd) {
          this.$axios.get('/api/article/fabulous', {
            params: commentParams
          }).then(res => {
            const { code } = res;
            if (code == 10002) {
              // 去绑定手机号
              this.showBindPhoneStatus = true;
            } else if (code == 200) {
              comment.article_fabulous = true;
              comment.fabulous_num ++;
              this.$toast({
                message: '点赞成功!',
                iconClass: 'iconfont iconchenggong bc-t-success'
              });
            }
          })
        } else {
          // 由点赞->没点赞
          this.$axios.get('/api/article/fabulous', {
            params: commentParams
          }).then(res => {
            comment.article_fabulous = false;
            comment.fabulous_num --;
            this.$toast({
              message: '取消点赞!',
              iconClass: 'iconfont iconchenggong bc-t-success'
            });
          })
        }
      }
	  }
  }
</script>

<style lang='scss' scoped>

</style>
