<template>
	<div class="bc-mg-t-20rp bc-t-333" >
			<div class="bc-media pd-t-15 bc-row bc-c-f">
				<div class="bc-media-left">
					<img class="tuijian-article-img" :src="itemList.src_img" :alt="itemList.name">
				</div>
				<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
					<div class=" bc-f-16rp bc-t-333 bc-f-b  bc-t-ellipsis bc-t-ellipsis-2">{{itemList.name}}</div>
					<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
						{{itemList.sub_content}}
					</div>
				</div>
			</div>
	</div>
</template>

<script>
export default {
  name: "recommend-itemdata",
	props: {
    itemList: {
      type: Object,
	    default: {}
    }
	}
}
</script>

<style scoped lang="scss">
		.tuijian-article-img {
			width: rem(120);
			height: rem(80);
		}
</style>