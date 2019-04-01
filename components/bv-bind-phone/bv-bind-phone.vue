<!-- 绑定手机弹层 -->
<template>
	<div class="bv-bind-phone-container" v-if="showBindPhone">
		<div class="bv-bind-phone">
			<div class="bc-row bc-t-r bc-pd-t-17rp bc-pd-b-14rp bc-pd-lr-17rp">
				<i class="iconfont iconclose bc-f-17rp" @click.stop="closeBindPhone"></i>
			</div>
			<div class="bc-row  bc-t-base">
				<div class="bc-pd-lr-20rp">
					<img :src="`${$config.path.static}/img/public/bind-phone.png`" alt="" class="bv-bind-phone-img">
				</div>
				<div class="bc-mg-t-20rp bc-f-18rp">
					填写手机号码
				</div>
				<div class="bc-mg-t-16rp bc-f-14rp">
					让我们能够更好的为您提供服务
				</div>
				<div class="bc-mg-t-36rp bc-mg-b-20rp bc-f-14rp">
					<a href="javascript:;" class="bc-btn bc-btn-base bc-bd-radius-5 bc-f-16rp bc-w-60" @click="bindPhone">
						立即填写
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import store from '@store';
  import { bindPhone } from '$assets/js/bind';

  export default {
    name: "bv-bind-phone",
    props: {
      //显示的状态，props设置为false是时候适用于点击判断带入状态来显示绑定手机号
      showBindPhoneStatus: {
        default: true,
        type: Boolean
      }
    },
    computed: {
      //是否显示绑定手机
      showBindPhone() {
        const state = store.state;
        const userInfo = state.userInfo;
        return (!this.$utils.nullPlainObject(userInfo) &&
          !userInfo.phone &&
          this.showBindPhoneStatus
        );
      }
    },
    methods: {
      //跳转绑定手机
      bindPhone() {
        bindPhone();
      },
      //关闭绑定手机
      closeBindPhone() {
        this.$emit('close-bind-phone');
      }
    }
  }
</script>

<style scoped lang="scss">
	.bv-bind-phone-container {
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		bottom: 47px;
		bottom: calc(constant(safe-area-inset-bottom) + 47px);
		bottom: calc(env(safe-area-inset-bottom) + 47px);
		right: 0;
		background-color: rgba(0, 0, 0, .6);
		text-align: center;
		.bv-bind-phone {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			border-radius: 10px;
			width: rem(250);
			background-color: white;
			.bv-bind-phone-img {
				width: rem(150);
				max-width: 300px;
			}
		}
	}
</style>