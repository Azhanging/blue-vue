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
    info: {
      type: Object,
      default: {
        name: {
          type: String,
          default: '生命驾校'
        },
        create_create_time: {
          type: String,
          default: '2019-03-29 16:09:56'
        },
        click_num: {
          type: Number,
          default: 100
        },
        fabulous_num: {
          type: Number,
          default: 100
        },
	      content: {
          type: Array,
		      default: []
	      }
      }
    }
  },
  data() {
    return {
      isAdd: true,
      isClickThumb: false
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