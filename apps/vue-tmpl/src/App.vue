<template>
	<div id="app" class="bc-t-666 bc-f-14rp">

		<m-transition>
			<router-view/>
		</m-transition>

		<!-- 底部导航 -->
		<m-navigator></m-navigator>

		<!-- 图片预览的组件 -->
		<lg-preview></lg-preview>

	</div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>
