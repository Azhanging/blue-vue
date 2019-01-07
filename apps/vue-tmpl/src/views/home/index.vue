<template>
	<m-home-view>
		<m-header :title="'首页'"></m-header>
		<div class="bc-t-c bc-pd-10 bc-overflow-hide">
			<div>
				<router-link to="/components" class="bc-t-c bc-t-333">
					components
				</router-link>
			</div>
		</div>
	</m-home-view>
</template>

<script>

  export default {
    name: "home"
  }
</script>