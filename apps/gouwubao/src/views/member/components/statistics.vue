<!-- 统计显示组件 -->
<template>
	<!-- 统计 -->
	<div class="bc-row">
		<div class="bc-flex bc-flex-ai-c bc-f-b bc-f-15rp bc-pd-16rp bc-bg-white bc-bd-b-e5e">
			统计<i class="icon icon-wenti bc-inline-block bc-pd-l-5rp bc-f-14rp" style="color:#AEAEAE;" @click="showStatus = true;"></i>
		</div>

		<bv-transition transition-name="opacity">
			<bv-layer :show-status="showStatus" @click="showStatus = !showStatus;">
				<div class="bv-row bc-bg-white bc-ps-r" style="border-radius: 10px;">
					<div class="bc-pd-t-28rp bc-f-b bc-t-c bc-f-18rp">
						统计说明
					</div>
					
					<!--内容-->
					<template v-if='textType == "content_one"'>
						<div class="bc-t-999 bc-f-14rp">
							<div class="bc-pd-t-20rp bc-pd-lr-14rp">
								我的会员: 显示您创客下级会员数量
							</div>
							<div class="bc-pd-t-20rp bc-pd-lr-14rp">
								招募收益: 您招募创客和VIP获得的收益
							</div>
							<div class="bc-pd-t-20rp bc-pd-lr-14rp">
								商城收益: 您分享产品获得的收益，商城
								收益不包含待结算收益
							</div>
						</div>
					</template>
					
					<template v-if='textType == "content_two"'>
						<div class="bc-t-999 bc-f-14rp">
							<div class="bc-pd-t-20rp bc-pd-lr-14rp">
								渠道会员：显示您渠道下级会员数量
							</div>
							<div class="bc-pd-t-20rp bc-pd-lr-14rp">
								商城收益：您分享产品获得的收益，商城
								收益不包含待结算收益
							</div>
						</div>
					</template>
					<div class="bc-row bc-t-c bc-mg-t-29rp ">
						<button
							type="button"
							class="bc-btn bc-btn-base bc-f-18rp bc-mg-b-18rp "
							style="padding:3px 3rem;border-radius: 20px;"
							@click.stop="showStatus = false"
						>
							确定
						</button>
					</div>
				</div>
			</bv-layer>
		</bv-transition>

	</div>
</template>

<script>
export default {
  name: "statistics",
	props:['textType'],
  data() {
    return {
      showStatus: false
    };
  }
}
</script>