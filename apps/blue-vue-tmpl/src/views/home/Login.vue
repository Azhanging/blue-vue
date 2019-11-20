<template>
	<BvLayoutView>
		<div class="bc-t-c">
			测试登录跳转
		</div>
	</BvLayoutView>
</template>

<script>
	export default {
	  name: "test-login",
	  created(){
	    //测试登录跳转
	    this.$axios.get('/api/test/index').then((result) => result);
	  }
	}
</script>