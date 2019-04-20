<template>
	<div class="bc-pd-15rp bc-flex bc-bg-white bc-flex-jc-sb" v-if="options">
		<div class="bc-f-16rp bc-bd-l-base bc-bd-w-3 bc-pd-l-10rp bc-f-b">
			{{options.name}}
		</div>
		<a href="javascript:;" v-if="options.url" class="bc-t-r bc-t-999" @click="$router.routerBack(options.url)">
			{{options.urlName}}>
		</a>
	</div>
</template>

<script>
	export default {
	  name: "flow-title",
	  props: ['options']
	}
</script>