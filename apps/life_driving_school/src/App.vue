<template>
	<div id="app" class="bc-t-666 bc-f-14rp">

		<bv-transition>
			<router-view/>
		</bv-transition>

		<!-- 底部导航 -->
		<w-navigator></w-navigator>

		<!-- 图片预览的组件 -->
		<blue-photo-swipe></blue-photo-swipe>

	</div>
</template>

<script>
	export default {
    name: 'app'
  };
</script>

<style>
	/*阿里字体图标*/
	@import url("//at.alicdn.com/t/font_1091145_gev7bc2bzw7.css");
</style>
