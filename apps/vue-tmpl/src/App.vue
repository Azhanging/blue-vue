<template>
	<div id="app" class="t-333 reset-all-a">
		<m-transition>
			<keep-alive>
				<router-view/>
			</keep-alive>
		</m-transition>
		<lg-preview></lg-preview>
	</div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="scss">
	.children-page {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
		background-color: white;
	}
</style>
