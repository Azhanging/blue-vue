<template>
	<div class="expense-l-box">
		<div class="expense-list">
			<w-arrlist></w-arrlist>
		</div>
	</div>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import WArrlist from '@components/wap/article/w-arrlist'

	export default {
		name: "information",
		components: {
			'w-arrlist': WArrlist
		},
		data() {
			return {
			}
		},
		methods: {}
	}
</script>
