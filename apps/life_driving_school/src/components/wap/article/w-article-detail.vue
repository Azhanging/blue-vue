<template>
	<div>
		<w-home-header :header='header'>
			<div slot="right-control">
				<div class="bc-t-r">
					<i class='iconfont icon- bc-mg-r-10rp bc-t-base' @click='$share(comment.shareInfo)' v-if="config.device.isApp"></i>
				</div>
			</div>
		</w-home-header>
		<div class="bc-pd-15">
			<!--标题-->
			<div class="bc-f-20rp bc-f-b t-c">
				{{info.name}}
			</div>
			<!--时间-->
			<div class="bc-f-12rp bc-pd-tb-10rp bc-mg-t-6rp">
				{{ info.create_time }}
			</div>
		</div>

		<!--文章内容-->
		<div class="article-content" style="background:rgba(244,244,244,1);">

			<ul class="bc-reset-ul" v-if="info.content && info.content.length > 0">
				<li class="bc-pd-lr-16rp bc-c-f" v-for="(item, index) in info.content" :key="index">
					<div class="bc-mg-t-16rp bc-f-14rp bc-t-666 " v-if="item.type === 'text'">
						<div v-html="item.value"></div>
					</div>

					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'images'" style="box-shadow: 5px 5px 10px rgba(166,166,166,.6)">
						<div v-blue-photoswipe="{itemTagName:'DIV'}">
							<img :src="item.value" width="100%" height="222" data-size="0x0" :msrc="item.value"/>
						</div>
						<!--<img class="bc-w-100" :src="item.value" alt="">-->
						<div class="bc-pd-10rp bc-t-hide" v-if="item.desc">{{item.desc}}</div>
					</div>

					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'video'">
						<!--开播-->
						<div class="prism-player video" :id="`J_prismPlayer${item.videoId}`"></div>
						<!--<iframe height="253" width="100%" :src='item.PlayURL' frameborder=0  allowfullscreen="allowfullscreen"></iframe>-->
					</div>

					<div class="bc-mg-t-16rp bc-bg-white " v-else-if="item.type === 'audio'">

						<!--音频组件-->
						<w-article-audio :audio="item"></w-article-audio>

					</div>

				</li>
			</ul>

		</div>
	</div>
</template>

<script>
		import WArticleAudio from '@components/wap/article/w-article-audio/w-article-audio'

    import VideoPlayer from '@assets/js/videoplayer';

    export default {
      name: "w-article-detail",
      props: {
        header: {
          type: Object,
          default: {}
        },
        opts: {
          type: Object,
          default: {// 请求详情内容url
            url: {
              type: Object,
              default: {
                contentUrl: '/api/Article/info'
              }
            },
            data: {
              type: Object,
              default: {
                contentParams: {// 文章内容 请求参数
                  article_id: 0
                },
                commentParams: { // 评论内容 请求参数
                  article_id: 0,
                  data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
                },
                submitCommentParams: { // 提交评论 请求参数 只需第一个
                  article_id: 0,
                  data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
                }
              }
            }
          }
        },
        comment: {
          type: Object,
          default: {}
        }
      },
      data() {
        return {
          isAdd: true,
          isClickThumb: false,
          info: {},
          video: {
            url: '',
            cover: '',
            videoId: '',
            playauth: '',
          }
        }
      },
      mounted() {
        const { contentUrl } = this.opts.url;
        const { contentParams } = this.opts.data;
        // 内容 /api/Article/info
        this.$axios.get(contentUrl, {
          params: contentParams
        }).then(res => {
          const { data } = res.data;
          this.info = data;

          const { share_title, share_img, share_content } = data;
          this.comment.shareInfo = {
            title: share_title,
            thumImage: share_img,
            descr: share_content,
          };
          // 微信分享
          this.$weChatShare({
            title: share_title,
            imgUrl: share_img,
            desc: share_content,
          });

          // 初始化视频
          this.info.content.forEach((item) => {
            if (item.type === 'video') {
              const { videoId, PlayURL, cover, playauth } = item;
              this.video = {
                videoId,
                url: PlayURL,
                cover,
                playauth
              };
              this.$nextTick(() => {
                this.videoPlay_init(this.video);
              });
            }
          });

        }).catch(error => {
          console.log(error);
        });

      },
      methods: {
        videoPlay_init(video) {
          const { videoId, playauth, cover } = video;
          this.player = new VideoPlayer({
            id: `J_prismPlayer${videoId}`,
            cover,
            //点播
            vid: videoId,
            playauth,
          });
        }
      },
      components: {
        'w-article-audio': WArticleAudio
      }
    }
</script>

<style lang="scss">
	.article-content {
		.video {
			max-height: rem(210) !important;
			background-color: #f4f4f4;
		}
	/*	word-wrap: break-word;
		word-break: break-all;
		padding: 15px 10px;
		overflow: hidden;
		* {
			margin: 0;
			max-width: 100%;
			box-sizing: border-box !important;
		}
		span[id] {
			width: auto !important;
			text-align: center !important;
		}*/
		* {
			max-width: 100%;
			box-sizing: border-box !important;
		}
		p {
			line-height: 1.6;
		}
		img {
			max-width: 100%!important;
		}

	}
	.prism-info-display {
		display: none!important;
	}
</style>