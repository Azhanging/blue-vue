<template>
	<BvLayoutView :router-level="3">
		<div v-for="i in 1">
			{{i}}
		</div>
	</BvLayoutView>
</template>

<script>
export default {
  name: "text-scroll-chilren"
}
</script>