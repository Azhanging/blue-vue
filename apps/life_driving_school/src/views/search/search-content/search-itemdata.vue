<template>
	<div class="bc-bd-b-e5e bc-pd-t-15rp">
		<div class="bc-flex">
			<img class='left_img' :src='itemList.src_img' alt='列表图'>
			<div class='bc-flex-1 bc-mg-l-10rp'>
				<div class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-16rp' v-html="itemList.name"></div>
				<div class='bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2'>{{itemList.sub_content}}</div>
			</div>
		</div>
		<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-tb-10rp bc-t-999'>
			<div class="bc-flex-3 bc-f-12rp bc-t-base ">
				{{itemList.column_name}}
			</div>
			<div class='bc-flex-1 action bc-flex bc-f-12rp'>
				<i class='iconfont iconeye- bc-f-12rp'></i>
				<span>&nbsp;{{itemList.click_num}}</span>
			</div>
			<div class='bc-flex-1 bc-f-12rp t-888'>
				{{itemList.update_time}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "search-itemdata",
	props: {
    itemList: {
      type: Object,
	    default: {}
    }
	}
}
</script>

<style scoped lang="scss">
	.left_img{
		width: rem(120);
		height: rem(80);
	}
</style>