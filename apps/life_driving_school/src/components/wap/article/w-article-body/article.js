//针对评论的mixin方法
export function commentMixin(opts = {}) {
  const {
    scrollEndHook,
    scrollNoHasListData
  } = opts;
  return {
    methods: {
      api() {
        const { commentParams } = this.opts.data;
        let params = Object.assign(commentParams, { page: this.load.params.page });
        return this.$axios.get('/api/Comment/index', {
          params: params
        }).then((res) => {
          const { data: resultData } = res.data;
          if (scrollNoHasListData.call(this, {
            resultData,
            listKey: 'list'
          })) {
            // 一开始就走这里
            if (JSON.stringify(this.comment) === '{}' ) {
              this.comment = resultData;
              this.comment.commentStatus = 0;
              this.comment.id = 0;
             // console.log('没有评论时候的comment', resultData);
            }
            scrollEndHook.call(this);
          } else {
            ++this.load.params.page;
            this.load.data.lists = this.load.data.lists.concat(resultData.list);
            this.comment = resultData;
            this.comment.commentStatus = 0;
            this.comment.id = 0;
            this.comment.list = this.load.data.lists || [];
            // console.log('有评论时候的comment', this.comment);
            // console.log('comment-list', this.comment.list);
            if(resultData.list.length < 10) scrollEndHook.call(this);
          }
        }).catch((error) => {
          console.log(error);
          return scrollEndHook.call(this);
        });
      },
      replyFocus() {
        this.$refs['reply'].$refs['replyInput'].focus()
      }
    },
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    }
  }
}