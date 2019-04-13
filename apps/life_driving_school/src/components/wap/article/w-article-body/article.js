//针对评论的mixin方法
export function commentMixin() {
  return {
    mounted() {
      // 评论内容 /api/Comment/index.html
      const { commentParams } = this.config.data;
      this.$axios.get('/api/Comment/index.html', {
        params: commentParams
      }).then(res => {
        const { data } = res.data;
        this.comment = data;
        // 初始化comment  clickstatus为false
        if (this.comment && this.comment.list) {
          this.comment.list.forEach(function (item) {
            item.isclickthumb = false;
            if (item.reply && item.reply.length > 0) {
              item.reply.forEach(function (item) {
                item.isclickthumb = false;
              })
            }
          })
        }
        this.comment.commentStatus = 0;
        this.comment.id = 0;
        this.comment.article_collection = false;
        this.comment.article_fabulous = false;
      }).catch(error => {
        console.log(error);
      });
    },
    methods: {
      releaseComment(opts) {
        this.comment.commentStatus = opts.commentStatus;
        this.comment.id = opts.id;
      },
      deleteComment(opts) {
        const { commentStatus, id } = opts;
        this.comment.commentStatus = commentStatus;
        this.comment.id = id;
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    }
  }
}