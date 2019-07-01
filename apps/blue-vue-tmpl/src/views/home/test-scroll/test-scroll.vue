<template>
	<bv-home-view :router-level="2">
		<div v-for="i in 1" class="bc-t-c bc-mg-t-10rp">
			<router-link to="/test-scroll/test-scroll-children" class="bc-btn bc-btn-danger bc-btn-line">
				test-scroll-children
			</router-link>
		</div>
		<div v-for="i in 10" class="bc-pd-tb-20rp bc-t-c">
			<input type="text" class="bc-input" placeholder="test content">
		</div>
	</bv-home-view>
</template>

<script>
export default {
  name: "test-scroll"
}
</script>