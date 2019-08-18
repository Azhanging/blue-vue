<!-- tab bar icon -->
<template>
	<span class="bc-inline-block tab-bar-icon">
		<!-- 图片导航 -->
		<template v-if="icon.src && icon.activeSrc">
			<img :src="activeIndex === currentIndex ? icon.activeSrc : icon.src" class="bv-tab-bar-icon"
			     :style="icon.style"
			     :class="[icon.className]"
			/>
		</template>
		<!-- font图库 -->
		<template v-else-if="icon.activeFont">
			<i :class='activeIndex === currentIndex ? icon.activeFont : icon.font' :style="icon.style"></i>
		</template>
	</span>
</template>

<script>
export default {
  name: "bv-tab-bar-icon",
  props: ['icon', 'activeIndex', 'currentIndex']
}
</script>

<style scoped lang="scss">
	.tab-bar-icon {
		font-size: 0;
		line-height: 0 !important;
	}
</style>