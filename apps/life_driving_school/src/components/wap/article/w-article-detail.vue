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
				{{detail.title}}
			</div>
			<!--时间-->
			<div class="bc-f-12rp bc-pd-tb-10rp bc-mg-t-6rp">
				{{ detail.time| timeFilter("Y-M-D h:min:s")}}
			</div>
		</div>

		<!--文章内容-->
		<div style="background:rgba(244,244,244,1);">
			<ul class="bc-reset-ul">
				<li class="bc-pd-lr-16rp bc-c-f" v-for="(item, index) in contentList" :key="index">
					<div class="bc-mg-t-16rp bc-f-14rp bc-t-666 " v-if="item.type === 'text'">
						{{item.content}}
					</div>
					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'image'" style="box-shadow: 5px 5px 10px rgba(166,166,166,.6)">
						<img class="bc-w-100" :src="item.img_src" alt="">
						<div class="bc-pd-10rp bc-t-hide">{{item.desc}}</div>
					</div>
					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'video'">
						<iframe height=253 width=100% src='http://player.youku.com/embed/XNDEwMTAxMDA1Ng==' frameborder=0 allowfullscreen="allowfullscreen"></iframe>
						<div class="bc-pd-10rp bc-t-hide">{{item.desc}}</div>
					</div>
				</li>
			</ul>
		</div>

		<!--阅读量-->
		<div class="bc-pd-16rp bc-t-999" style="background:rgba(244,244,244,1);">
			<i class='iconfont iconeye- bc-f-15rp '></i> {{detail.readers}}
			<i class='iconfont iconzan bc-f-20rp' v-if="!isClickThumb" @click.stop="clickThumb(isAdd)" ></i>
			<i class='iconfont iconzan1 bc-t-base bc-f-20rp' v-else @click.stop="clickThumb(isAdd)"></i>
			{{detail.support}}
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
    detail: {
      type: Object,
      default: {
        title: {
          type: String,
          default: '生命驾校'
        },
        time: {
          type: Number,
          default: (new Date()).getTime()
        },
        readers: {
          type: Number,
          default: 100
        },
        support: {
          type: Number,
          default: 100
        }
      }

    }
  },
  data() {
    return {
      isAdd: true,
      isClickThumb: false,
      contentList: [
        {
          type: 'text',
          content: `我是文字我是文字我是文字我是文字我是文字我是文字我是文字
			    我是文字我是文字我是文字我是文字我是
			    文字我是文字我是文字我是文字我是文字我是文字我是文字我
				    是文字我是文字我是文字我是文字我是文字我是文字我是
				    文字我是文字我
				    是文字我是文字我是文字我是文字`
        },
        {
          type: 'image',
          img_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
          desc: '我是图片描述我是图片描述我是图片描述我是图片描述我是图片描述'
        },
        {
          type: 'video',
          video_src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA',
          desc: '我是视频描述'
        }
      ]
    }
  },
  methods: {
    clickThumb(add) {
      // 由没点赞->点赞
      if (add) {
        this.detail.support++;
        this.isClickThumb = true;
        this.isAdd = false
      } else {
        // 由点赞->没点赞
        this.detail.support--;
        this.isClickThumb = false;
        this.isAdd = true;
      }
    }
  }
}
</script>

<style scoped lang="scss">
	iframe {
		height: rem(200);
		width: 100%;
	}
</style>