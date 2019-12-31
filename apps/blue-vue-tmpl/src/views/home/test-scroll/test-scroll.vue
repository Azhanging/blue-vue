<template>
	<BvLayoutView :router-level="2">
		<div v-for="i in 1" class="bc-t-c bc-mg-t-10rpx">
			<router-link to="/test-scroll/test-scroll-children" class="bc-btn bc-btn-danger bc-btn-line">
				test-scroll-children
			</router-link>
		</div>
		<div v-for="i in 10" class="bc-pd-tb-20rpx bc-t-c">
			<input type="text" class="bc-input" placeholder="test content">
		</div>
	</BvLayoutView>
</template>

<script>
export default {
  name: "test-scroll"
}
</script>