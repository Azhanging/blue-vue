<template>
	<bv-home-view>
		<w-home-header :title="'商城'" :type=2 ></w-home-header>
		
		<w-home-nav ></w-home-nav>

		
		<bv-transition>
			<router-view/>
		</bv-transition>
	
	
	</bv-home-view>
</template>

<script>

	export default {
		name: "shop"
	}
</script>