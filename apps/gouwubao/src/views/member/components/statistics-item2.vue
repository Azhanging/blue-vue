<template>
	<div class="bc-row bc-bg-white bc-mg-t-10rp bc-mg-b-10rp bc-pd-b-10rp" v-if="options">
		<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp" v-if="options.title">
			<div class="bc-f-b">{{options.title.name}}</div>
		</div>
		<div class="bc-flex bc-flex-ai-c bc-t-c">
			<div class="bc-flex-1" v-for="(item,index) in options.otherNum">
				<div class="bc-f-12rp bc-t-999">
					{{ item.name }}
				</div>
				<div class="bc-mg-t-2rp bc-f-16rp">
					{{item.num || 0}}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "statistics2-item",
		props: ['options']
	}
</script>

<style scoped lang="">

</style>