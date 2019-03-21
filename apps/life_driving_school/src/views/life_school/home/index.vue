<template>
	<bv-home-view>
		<w-home-header :title="'首页'" :type=2 ></w-home-header>

		<w-home-nav ></w-home-nav>

		<!--<div class="bc-t-c bc-pd-10 bc-overflow-hide">-->
			<!--<div>-->
				<!--<router-link to="/components" class="bc-t-c bc-t-333">-->
					<!--components-->
				<!--</router-link>-->
			<!--</div>-->
		<!--</div>-->

		<bv-transition>
			<router-view/>
		</bv-transition>


	</bv-home-view>
</template>

<script>

  export default {
    name: "home"
  }
</script>