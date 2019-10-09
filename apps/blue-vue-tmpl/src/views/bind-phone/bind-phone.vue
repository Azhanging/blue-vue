<template>
	<bv-home-view>
		<BvHeader :center-control="{
      title:`绑定手机`
    }"></BvHeader>
		<div class="bc-row bc-t-c">
			<div class="bc-row bc-mg-t-10rp">
				绑定手机：<input type="text" class="bc-input" v-model="phone">
			</div>
			<div class="bc-row bc-mg-t-10rp">
				<button class="bc-btn bc-btn-primary" @click="bind">绑定</button>
			</div>
		</div>
	</bv-home-view>
</template>

<script>

	import { apiBindPhone } from '$api';

  export default {
    name: "bind-phone",
    data() {
      return {
        phone: ''
      }
    },
    methods: {
      bind() {
        const router = this.$router;
        const query = router.currentRoute.query;
        const redirect_path = query.backUrl || '/';
        console.log(query);
        //绑定手机
        this.$axios.get(``).then((result) => {
          this.$store.commit('setPhone', result.phone);
          router.replace(redirect_path);
        });
      }
    }
  }
</script>