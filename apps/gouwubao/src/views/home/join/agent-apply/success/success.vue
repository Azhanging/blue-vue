<template>
	<bv-home-view :router-level="4" style="background-color: #EDEDED;">
		<bv-header :header="{
	    title: {
	      value: '申请代理'
	    },
		}" :left-control="goMember" />
		<div class="bc-row bc-bg-white">
			<div class="bc-row bc-t-c bc-mg-t-29rp">
				<img :src="`${$config.path.static}/img/member/join/agent/success/success-icon.png`" alt=""
				     style="width: 4.666666666666667rem;height:4.666666666666667rem;"
				>
			</div>
			<div class="bc-t-c bc-f-16rp bc-mg-t-14rp">
				申请代理成功
			</div>
			<div class="bc-row bc-mg-t-13rp bc-pd-17rp">
				<div class="bc-row bc-f-b">
					温馨提示：
				</div>
				<div class="bc-row bc-f-12rp bc-t-999" style="line-height: 1.33333rem;">
					<div class="bc-row bc-mg-t-14rp">
						1.平台将会在7个工作日内审核完成
					</div>
					<div class="bc-row bc-mg-t-2rp">
						2.审核成功后，您即可使用点通宝账号进入代理后台
					</div>
					<div class="bc-row bc-mg-t-2rp">
						3.审核成功后，您即获得代理身份徽章，点击徽章即可进入代理后台
					</div>
				</div>
			</div>
		</div>

		<div class="bc-row bc-t-c bc-mg-t-30">
			<a href="javascript:;" class="bc-btn bc-bd-radius-4 bc-btn-base bc-w-90 bc-f-16rp"
			   style="padding-top:0.7rem;padding-bottom:0.7rem;"
			   @click="goMember"
			>
				确定
			</a>
		</div>

	</bv-home-view>
</template>

<script>
export default {
  name: "agent-success",
  methods: {
    goMember() {
      location.href = '/member';
    }
  }
}
</script>