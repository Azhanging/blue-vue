<template>
	<div id="app" class="bc-t-666 bc-f-14rp">
		
		<bv-view-transition>
			<router-view/>
		</bv-view-transition>
		
		<!-- 底部导航 -->
		<w-tab-bar></w-tab-bar>
		
		<!-- 图片预览的组件 -->
		<blue-photo-swipe></blue-photo-swipe>
	
	</div>
</template>

<script>
	export default {
		name: 'app'
	};
</script>

<style lang='scss'>
	/*阿里字体图标*/
	@import url("//at.alicdn.com/t/font_1091145_kngdpcldren.css");
	
	//swipe 默认样式
	.swiper-pagination .swiper-pagination-bullet-active {
		background-color: $color-base !important;
	}
</style>
