<template>
	<bv-home-view class='bc-bg-f4f' :router-level='3'>
		
		<bv-header :header="{title:{value:'申请证书'}}"/>
		
		<div class="on-apply-for">
			<div class="on-apply-for-tit">
				您的申请已经提交
			</div>
			<div class="on-apply-for-wt">
				如有问题请拨打客服热线：
			</div>
			<div class="on-apply-for-phone"><a href="tel:4006843688">4006843688</a></div>
		</div>
		
	</bv-home-view>
</template>

<script>
	export default {
		name: "on-apply-for",
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{background: #F4F4F4;}
	.on-apply-for{overflow: hidden;padding-top: rem(150);text-align: center;font-weight: bold;}
	.on-apply-for .on-apply-for-tit{font-size: rem(32);}
	.on-apply-for .on-apply-for-wt{font-size: rem(20);font-weight: normal;}
	.on-apply-for .on-apply-for-phone{font-size: rem(30);margin-top: rem(60);color: #666;}
	.on-apply-for .on-apply-for-phone a{color: #666;}
</style>