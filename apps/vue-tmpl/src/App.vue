<template>
	<div id="app" class="bc-t-666 bc-f-0_9">
		<m-transition>
			<keep-alive>
				<router-view/>
			</keep-alive>
		</m-transition>
		<!-- 图片预览的组件 -->
		<lg-preview></lg-preview>
	</div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>
