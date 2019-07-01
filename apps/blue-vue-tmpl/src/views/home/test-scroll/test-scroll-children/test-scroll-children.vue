<template>
	<bv-home-view :router-level="3">
		<div v-for="i in 1">
			{{i}}
		</div>
	</bv-home-view>
</template>

<script>
export default {
  name: "text-scroll-chilren"
}
</script>