<template>
	<bv-home-view class='wap' :router-level='2'>

		<w-article-detail :detail="detail.info" :header="{
			title:{
				value: '资讯详情'
			}
			}"></w-article-detail>

		<w-comment :comment="detail.comment" @release="releaseComment"></w-comment>
		<!--<button @click.stop="submitForm" style="position:fixed;z-index:200000;top:0">点击发布</button>-->

		<!--回复模块-->
		<template slot="footer">

			<form action="" method="" @submit.prevent="submitForm">
				<w-comment-reply :comment="detail.comment" ></w-comment-reply>
			</form>

		</template>

	</bv-home-view>

	<!--<bv-home-view v-else='$config.device.isPc' class='pc'>-->
	<!---->
	<!---->
	<!--</bv-home-view>-->

</template>

<script>
		import WArticleDetail from '@components/wap/article/w-article-detail';
    import WComment from '@components/wap/article/w-comment';
    import WCommentReply from '@components/wap/article/w-comment-reply';
    import store from '@store';

    export default {
      name: "zixun-detail",
      data() {
        return {
          detail: {
            info: {
              title: '我是标题',
              time: 0 || (new Date()).getTime(),
              readers: 2000,
              support: 1111
            },
            comment: {
              commentNum: 3330, // 评论条数
              discussants: [
                {
                  id: 1,
                  name: "聪明的一休",
                  avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
                  time: '3小时前',
                  content: "很好，内容很适合我！",
                  support: 100, // 点赞数量
                  reply: [
                    {
                      id: 2,
                      name: "Winter",
                      avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
                      reviewers: "又学到了一招又学到了一招又学到了一招",
                      time: "4小时前",
                      content: "通道中人",
                      support: 100, // 点赞数量

                    },
                    {
                      id: 2,
                      name: "CiCi",
                      avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
                      reviewers: "又学到了一招又学到了一招又学到了一招",
                      time: "5小时前",
                      content: "你学到了哪一招？",
                      support: 100, // 点赞数量
                    }
                  ]
                },
                {
                  id: 5,
                  name: "Steven",
                  avatar_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
                  time: "4小时前",
                  content: "好,讲得非常好，好,讲得非常好好,讲得非常好好,讲得非常好好,讲得非常好",
                  support: 100, // 点赞数量
                  reply: []
                }
              ]
            },
          },
          commentStatus: 0,  //    0为评论文章  1为评论别人
          id: 0,
          userId: 0, // 用户id
          userName: '', // 用户名称
          userAvatar: '' // 用户头像
        }
      },
      mounted() {
        // 获取用保护信息中的ID name avatar
        this.userId = store.state.userInfo.userId || '205';
        this.userName = store.state.userInfo.userName || 'lei';
        this.userAvatar = store.state.userInfo.userAvatar || 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA';
      },
      methods: {
        releaseComment(rel) {
          this.commentStatus = rel.commentStatus;
          this.id = rel.id;
        },
        submitForm() {
          // 发送请求
          // this.$axios.post('', {
          //   params: {
          //     avatar: this.avatar,
          //     name: this.name,
          //     id: this.id
	        //     userId: this.userId
          //   }
          // }).then(res => {
          //   let content = '我就是回复内容！';
          //   this.detail.comment.commentNum ++ ;
          // }).error(res => {
          //   console.log(res);

          let targetIndex = this.detail.comment.discussants.findIndex((item, index) => {
            return this.id === item.id;
          });

          let newComment = {
            id: this.userId,
            name: this.userName,
            avatar_src: this.userAvatar,
            time: "4小时前",
            content: '11111111111111111111',
            support: 100, // 点赞数量
            reply: []
          };

          if (this.commentStatus === 1) {
            // 回复他人评论
            this.detail.comment.discussants[targetIndex].reply.push(newComment);
          } else {
            // 默认回复文章
            this.detail.comment.discussants.push(newComment);
          }

          // 恢复默认评论文章状态
          this.commentStatus = 0;
        }
      },
      components: {
        'w-article-detail': WArticleDetail,
        'w-comment': WComment,
        'w-comment-reply': WCommentReply
      }

    }
</script>