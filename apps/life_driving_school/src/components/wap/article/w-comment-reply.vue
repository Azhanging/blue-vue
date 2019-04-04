<template>
	<div class="comments-reply-input bc-ps-f bc-w-100 bc-v-m" style="" v-if="commentsReplyInputShow">
		<div class="bc-flex bc-pd-7rp bc-bg-white">
			<div class="bc-flex-2 bc-bg-e5e bc-pd-lr-15rp">
				<img class="comment-reply-input-img" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="">
				<input class="bc-input bc-bd-none bc-bg-e5e bc-w-70" type="text" placeholder="写评论...">
			</div>
			<div class="bc-flex-2 ">
				<span class="bc-inline-block bc-ps-r">
					<i class='iconfont iconpinglun bc-f-20rp bc-mg-lr-12rp' ></i>
					<span class="info-num bc-f-10rp">{{comment.commentNum}}</span>
				</span>
				<i class='iconfont iconxingxing bc-f-20rp bc-mg-lr-12rp' v-if="true"></i>
				<i class='iconfont iconiconfontxingxing bc-f-20rp bc-mg-lr-12rp' v-else></i>
				<i class='iconfont iconzan bc-f-20rp bc-mg-lr-12rp' v-if="true" v-else></i>
				<i class='iconfont iconzan1 bc-f-20rp bc-mg-lr-12rp' v-else></i>
				<i class='iconfont icon- bc-f-20rp bc-mg-lr-12rp' ></i>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "w-comment-reply",
	props: {
    comment: {
      type: Object,
	    default: {}
    }
	},
	data() {
    return {
      commentsReplyInputShow: true
    }
	}
}
</script>

<style scoped lang="scss">
	.comments-reply-input {
		left: 0;
		bottom: 0;
		z-index: 200;
		max-width: rem(450);
		.comment-reply-input-img {
			width: rem(15);
			height: rem(15);
		}
		.info-num {
			position: absolute;
			left: rem(25);
			top: rem(-8);
			background: #F76872;
			color: white;
			border-radius: rem(5);
		}
	}
</style>