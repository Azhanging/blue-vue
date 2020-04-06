<!-- tab bar icon -->
<template>
	<span class="bz-inline-block " :class="{
  	'tab-bar-icon': icon.src && icon.activeSrc
	}">
		<!-- 图片导航 -->
		<template v-if="icon.src && icon.activeSrc">
			<img :src="activeIndex === currentIndex ? icon.activeSrc : icon.src" class="bv-tab-bar-icon"
           :style="icon.style"
           :class="[icon.className]"
      />
		</template>
    <!-- font图库 -->
		<template v-else-if="icon.font">
			<i :class='`${icon.font} ${activeIndex === currentIndex && icon.activeFont}`' :style="icon.style"></i>
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