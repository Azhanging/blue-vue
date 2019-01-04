<template>
	<m-view>
		<div class="bc-t-c bc-pd-10 bc-overflow-hide">
			<div>
				<router-link to="/components" class="bc-t-c bc-t-333">
					components
				</router-link>
			</div>

			<div class="bc-row bc-pd-tb-50" v-for="i in 20">
				{{i}}
			</div>
		</div>
	</m-view>
</template>

<script>
	export default {
    name: "home"
  }
</script>