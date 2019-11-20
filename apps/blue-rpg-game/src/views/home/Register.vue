<template>
	<BvLayoutView>
		<BvHeader :center-control="{
      title:`注册`
    }"/>

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