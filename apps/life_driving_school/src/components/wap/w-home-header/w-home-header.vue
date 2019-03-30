<template>
	<bv-header :header="header">

		<!--0返回  1点通宝图标 2无 -->

		<slot></slot>

		<template v-if="type !== 0">
			<template slot="left-control">
				<slot name="left-control">
					<div v-if="type === 1" class='bc-v-m'>
						<img class='logo' :src="$config.path.static+'/img/public/logo.png'" alt=''>
					</div>
					<div v-else></div>
				</slot>
			</template>
		</template>


		<template slot="right-control">
			<slot name="right-control">
				<div class="bc-t-r">
					<!--<i class='iconfont iconliaotian bc-t-base bc-f-20rp bc-mg-r-10rp'></i>-->
					<i class='iconfont iconicon-test bc-t-base bc-f-20rp bc-mg-r-10rp'></i>
					<!--<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp' v-if="$config.device.isApp" @click='$share'></i>-->
					<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp' @click='$share'></i>
				</div>
			</slot>
		</template>

	</bv-header>
</template>

<script>
	export default {
    name: "w-home-header",
    props: {
      //左边控制
      leftControl: {
        default: '',
        type: String
      },
      type: {
        type: Number,
        default: 0  //0返回 1点通宝图标， 2返回箭头，
      },
      header: {
        default() {
          return {}
        },
        type: Object
      }
    },
    methods: {
      //左边控制的方法
      leftControlHandler() {
        this.$router.$routerBack(this.leftControl);
      }
    },
    mounted() {
      console.log(this.$config)
    }
  }

</script>

<style lang='scss' scoped>
	@import '@css/index.scss';

	.logo {
		width: rem(40);
		margin-left: rem(10);
	}
</style>