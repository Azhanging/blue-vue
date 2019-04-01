<template>
	<bv-home-view class='wap' :router-level='2' style="background:rgba(244,244,244,1);">
		<form id="form" action="" method="" @keypress="search($event)">
			<div id="search" class="bc-row bc-bg-white v-m" style="z-index:4000;max-width:30rem;" >
				<div class="search-header bc-flex bc-flex-jc-c bc-flex-ai-c bc-pd-tb-10rp bc-pd-lr-10rp">
					<div class="bc-flex-10">
						<input class="search-input  bc-bd-none bc-bd-e5e bc-bd-radius-5"  style="" type="text" placeholder="搜索" name="keywords" >
					</div>
					<div class="bc-flex-1" style="color:#CA9F75" @click="goBack">
						取消
					</div>
				</div>
			</div>
		</form>

		<div class="search-content bc-mg-t-20rp">
			<div class="" v-if="infoShow.status === -1">
				<img class="bc-w-100" :src="`${$config.path.static}/img/home/search/404.png`" alt="">
			</div>
			<div class="" v-else-if="infoShow.status === 1">
			<img class="bc-w-100" :src="`${$config.path.static}/img/home/search/default.png`" alt="">
			</div>
			<div class="" v-else-if="infoShow.status === 0">
				<img class="bc-w-100" :src="`${$config.path.static}/img/home/search/unresult.png`" alt="">
			</div>
			<div class="" v-else>
				搜索内容
			</div>

		</div>


	</bv-home-view>
</template>

<script>
export default {
  name: "search",
	data() {
    return {
      infoShow: {
        status: 1
      }
    }
	},
	methods: {
    search(event) {
      if (event.keyCode === 13) { //如果按的是enter键
        // this.$axios.post('')
	      //   .then(res => {
				//
	      //   });
				document.getElementById('form').submit();
        event.preventDefault(); //禁止默认事件（默认是换行）
      }
    },
    goBack() {
      this.$router.go(-1);
    }
	}
}
</script>

<style scoped lang="scss">
#search {
	.search-header {
		height: rem(30);
		.search-input {
			width: 90%;
			padding: rem(5) 0 rem(5) rem(15);
			background:rgba(244,244,244,1);
			/*color:#CA9F75;*/
		}
	}
}
</style>