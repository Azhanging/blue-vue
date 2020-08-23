<!-- tab bar icon -->
<template>
	<span class="bz-inline-block tab-bar-icon">
		<!-- 图片导航 -->
		<template v-if="icon.src && icon.activeSrc">
			<img :src="activeIndex === currentIndex ? icon.activeSrc : icon.src" class="img-icon"
      />
		</template>
    <!-- font图库 -->
		<template v-else-if="icon.font">
			<i :class='`font-icon ${icon.font} ${activeIndex === currentIndex && icon.activeFont}`'></i>
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
    display: inline-block;
    margin: 5px 0;
    font-size: 0;
  }

  .font-icon {
    font-size: 14px;
  }
</style>