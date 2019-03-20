<template>
	<bv-home-view>
		<bv-header :title="'首页'"></bv-header>
		<div class="bc-t-c bc-pd-10 bc-overflow-hide">
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-primary bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-success bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-info bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-333 bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-666 bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-999 bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-red bc-btn-line">
					components
				</router-link>
			</div>
			<div class="bc-t-c bc-mg-t-10rp">
				<router-link to="/components" class="bc-btn bc-btn-danger bc-btn-line">
					components
				</router-link>
			</div>

			<div v-for="i in 30" class="bc-t-c bc-mg-t-10rp">
				<router-link to="/test-scroll" class="bc-btn bc-btn-danger bc-btn-line">
					test-scroll
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