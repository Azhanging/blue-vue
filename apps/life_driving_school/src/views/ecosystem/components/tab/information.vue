<template>
	<div class="expense_l_box">
		<div class="expense_list">
			<itemList></itemList>
		</div>
	</div>
</template>

<script>
	import router from '@router';
	import itemList from '../../components/list';

	export default {
		name: "information",
		components: {
			itemList
		},
		data() {
			return {
			}
		},
		methods: {}
	}
</script>