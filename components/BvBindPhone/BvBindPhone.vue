<!-- 绑定手机弹层 -->
<template>
	<div class="bv-bind-phone-container" :class="{'no-tab-bar':!view.tabBar}" v-if="showBindPhone">
		<div class="bv-bind-phone">
			<div class="bz-row bz-t-r bz-pd-t-17rpx bz-pd-b-14rpx bz-pd-lr-17rpx">
				<i class="iconfont iconclose bz-f-17rpx" @click.stop="closeBindPhone"></i>
			</div>
			<div class="bz-row  bz-t-base">
				<div class="bz-pd-lr-20rpx">
					<img :src="`${config.path.static}/img/public/bind-phone.png`" alt="" class="bv-bind-phone-img">
				</div>
				<div class="bz-mg-t-20rpx bz-f-18rpx">
					填写手机号码
				</div>
				<div class="bz-mg-t-16rpx bz-f-14rpx">
					让我们能够更好的为您提供服务
				</div>
				<div class="bz-mg-t-36rpx bz-mg-b-20rpx bz-f-14rpx">
					<a href="javascript:;" class="bz-btn bz-btn-base bz-bd-radius-5 bz-f-16rpx bz-w-60" @click="bindPhone">
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
  import Vuex from 'vuex';

  const { mapState } = Vuex;

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
        return (!this.$utils.isEmptyPlainObject(userInfo) &&
          !userInfo.phone &&
          this.showBindPhoneStatus
        );
      },
      ...mapState(['view'])
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
		right: 0;
		bottom: 47px;
		bottom: calc(constant(safe-area-inset-bottom) + 47px);
		bottom: calc(env(safe-area-inset-bottom) + 47px);
		background-color: rgba(0, 0, 0, .6);
		text-align: center;
		//没有tab-bar
		&.no-tab-bar {
			bottom: 0;
		}
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