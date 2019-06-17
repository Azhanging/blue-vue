<template>
	<bv-header :header="header" :leftControl="leftControl">
		<!--广告位-->
		<div slot='advertisement'>
			<template v-if="$store.state.userInfo.subscribe">
				<div class='bc-pd-tb-10rp bc-pd-lr-5rp bd-adver bc-mg-tb-10rp bc-mg-lr-5rp bc-bd-radius-6 bc-flex bc-flex-jc-sb bc-flex-ai-c'
				     v-if='$store.state.userInfo.subscribe != 1 && config.device.isWeChat && advertise'
				>
					<div>
						<i class='iconfont iconguanbi1 t-adver' @click='advertise = false'></i>
						<span>
	            关注点通宝公众号，实现智慧财富人生
	        </span>
					</div>
					<a :href='$store.state.userInfo.followUrl' class='bc-btn bg-adver bc-f-12rp bc-t-white bc-bd-radius-4'>关注</a>
				</div>
			</template>
		</div>
		

		<slot></slot>
		
		<!--0返回  1点通宝图标 2无 -->
		<template v-if="type !== 0">
			<template slot="left-control">
				<slot name="left-control">
					<div v-if="type === 1" class='bc-v-m'>
						<img class='logo' :src="config.path.static+'/img/public/logo.png'" alt=''>
					</div>
					<div v-else></div>
				</slot>
			</template>
		</template>


		<template slot="right-control">
			<slot name="right-control">
				<div class="bc-t-r">
					<!--<i class='iconfont iconliaotian bc-t-base bc-f-20rp bc-mg-r-10rp'></i>-->
					<router-link to="/search">
						<i class='iconfont iconicon-test bc-t-base bc-f-20rp bc-mg-r-10rp'></i>
					</router-link>
					<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10rp' @click='$share'  v-if="config.device.isApp"></i>
				</div>
			</slot>
		</template>

	</bv-header>
</template>

<script>
	import store from '@store';

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
		data(){
    	return{
		    advertise:true
	    }
		},
    methods: {
      //左边控制的方法
      leftControlHandler() {
        this.$router.routerBack(this.leftControl);
      }
    }
  }

</script>

<style lang='scss' scoped>
	@import '@css/index.scss';

	.logo {
		width: rem(40);
		margin-left: rem(10);
	}
	
	.t-adver{
		color: #d73e36;
	}
	.bg-adver{
		background-color: #d73e36;
	}
	.bd-adver{
		border:1px #d73e36 solid
	}
	
	
	
</style>
