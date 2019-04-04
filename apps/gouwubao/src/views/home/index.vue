<template>
	<bv-home-view>
		<bv-header :header="{title:{value:'首页'}}"/>
		<div class="bc-t-c bc-pd-10 bc-overflow-hide">
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-primary bc-btn-line">
					components
				</router-link>
			</div>

			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/test-scroll" class="bc-btn bc-btn-danger bc-btn-line">
					test-scroll
				</router-link>
			</div>

			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/test-login" class="bc-btn bc-btn-danger bc-btn-line">
					test-login
				</router-link>
			</div>

		</div>
	</bv-home-view>
</template>

<script>
  export default {
    name: "home"
  }
</script>