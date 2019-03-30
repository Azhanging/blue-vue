<template>
	<div v-html="content">

	</div>
</template>

<script>
export default {
  name: "w-article-detail",
	props: {
    content: {
      type: String,
	    default: ''
    }
	},
	data() {
    return {

    }
	}
}
</script>

<style scoped lang="scss">

</style>