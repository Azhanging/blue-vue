<template>
	<BvView>
		<BvHeader :center-control="{
      title:`绑定手机`
    }"></BvHeader>
		<div class="bz-row bz-t-c">
			<div class="bz-row bz-mg-t-20rpx">
				绑定手机：<input type="text" class="bz-input" v-model="phone">
			</div>
			<div class="bz-row bz-mg-t-20rpx">
				<button class="bz-btn bz-btn-primary" @click="bind">绑定</button>
			</div>
		</div>
	</BvView>
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
          this.$store.commit('SET_PHONE', result.phone);
          router.replace(redirect_path);
        });
      }
    }
  }
</script>