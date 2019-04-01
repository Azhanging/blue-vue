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
		<div v-html="detail.content" style="background:rgba(244,244,244,1);"></div>

		<div class="bc-pd-16rp bc-t-999" style="background:rgba(244,244,244,1);">
			<i class='iconfont iconeye- bc-f-15rp '></i>{{detail.readers++}}
			<i class='iconfont icondianzan bc-f-20rp' v-if="!isClickThumb" @click.stop="clickThumb(true)" ></i>
			<i class='iconfont icondianzan bc-t-base bc-f-20rp' v-else @click.stop="clickThumb(false)"></i>
			{{detail.support}}
		</div>

	</div>

</template>

<script>
export default {
  name: "w-article-detail",
	props: {
		header:{
			type: Object,
			default: {}
		},
		detail: {
		  type: Object,
			default() {
		    return {
			    title:{
				    type: String,
				    default: '生命驾校'
			    },
			    time:{
				    type: Number,
				    default: (new Date()).getTime()
			    },
          content: {
            type: String,
            default: '尽请期待...'
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
		}
	},
	data() {
    return {
			isClickThumb: false
    }
	},
	methods: {
    clickThumb(isAdd) {
      // 由没点赞->点赞
      if (isAdd) {
        this.detail.support ++ ;
        this.isClickThumb = true;
      } else {
        // 由点赞->没点赞
        this.detail.support --;
        this.isClickThumb = false;
      }

    }
	}
}
</script>

<style scoped lang="scss">

</style>