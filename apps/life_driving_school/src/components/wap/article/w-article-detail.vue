<template>
	<div>
		<w-home-header :header='header'>
			<div slot="right-control">
				<div class="bc-t-r">
					<i class='iconfont icon- bc-mg-r-10rp bc-t-base'></i>
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
		<div style="background:rgba(244,244,244,1);">
			<ul class="bc-reset-ul" v-if="info.content && info.content.length > 0">
				<li class="bc-pd-lr-16rp bc-c-f" v-for="(item, index) in info.content" :key="index">
					<div class="bc-mg-t-16rp bc-f-14rp bc-t-666 " v-if="item.type === 'text'">
						{{item.value}}
					</div>
					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'images'" style="box-shadow: 5px 5px 10px rgba(166,166,166,.6)">
						<img class="bc-w-100" :src="item.value" alt="">
						<div class="bc-pd-10rp bc-t-hide" v-if="item.desc">
							{{item.desc}}
						</div>
					</div>
					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'video'">
						<iframe height=253 width=100% :src='item.value' frameborder=0 allowfullscreen="allowfullscreen"></iframe>
						<div class="bc-pd-10rp bc-t-hide" v-if="item.desc">{{item.desc}}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>

</template>

<script>
export default {
  name: "w-article-detail",
  props: {
    header: {
      type: Object,
      default: {}
    },
    config: {
      type: Object,
      default: {// 请求详情内容url
        url: {
          type: Object,
          default: {
            contentUrl: '/api/Article/info.html'
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
    }
  },
  data() {
    return {
      isAdd: true,
      isClickThumb: false,
	    info: {}
    }
  },
	mounted() {
    const {contentUrl} = this.config.url;
    const {contentParams} =  this.config.data;

    // 内容 /api/Article/info.html
    this.$axios.get(contentUrl, {
      params: contentParams
    }).then(res => {
      const {data} = res.data;
      this.info = data;
      this.info.content = data.content ? JSON.parse(data.content) : [];
    }).catch(error => {
      console.log(error);
    });
  }
}
</script>

<style scoped lang="scss">
	iframe {
		height: rem(200);
		width: 100%;
	}
</style>