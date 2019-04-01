<template>
	<div class="comment">
		<div class="bc-flex bc-flex-jc-s bc-flex-ai-s bc-t-c bc-pd-tb-15rp">
			<div class="bc-flex-2">
				<img class="avatar" :src="`${$config.path.static}/img/home/shengtaiquan_chuangye.png`" alt="头像">
			</div>
			<div class="bc-flex-6 bc-f-14rp bc-t-l">
				<div>聪明的一休</div>
				<div class="bc-t-999 bc-f-12rp">一小时前</div>
				<div class="bc-f-14rp">
					猫和老鼠你好，我是聪明的一休
				</div>
			</div>
			<div class="bc-flex-2 bc-flex">
				<div class="bc-flex-1" v-if="thumbIsShow" @click="clickThumb">
					<i class='iconfont icondianzan bc-f-20rp' ></i>
				</div>
				<div class="bc-flex-1" v-else>
					<i class='iconfont icondianzan bc-f-base bc-f-20rp' ></i>
					{{support}}
				</div>
				<div class="bc-flex-1">...</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "comment",
	props: {
		support: {
		  type: Number,
			default: 100
		}
	},
	data() {
    return {
      thumbIsShow: true
    }
	},
	methods: {
    clickThumb() {
      this.thumbIsShow = false;
    }
	}
}
</script>

<style scoped lang="scss">
	.comment {
		.avatar {
			width: rem(38);
			height: rem(38);
			border-radius: 50%;
		}
	}
</style>