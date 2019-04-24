<template>
	<div>
		<template v-if='type==1'>
			<div class="bc-bg-base selfMsg bc-t-666  row bc-pd-tb-15 bc-pd-lr-10   bc-flex bc-flex-ai-s">
				<div class='bc-mg-lr-10'>
					<template v-if="!personalData.memberImg">
						<img class="bc-radius-50prec bc-bd-white bc-bd-w-3" style='border-radius: 50%'  :src="`${config.path.static}/img/member/area-creator.png` | cutImage(64,64)" alt="默认头像">
					</template>
					<img class=" bc-bd-white bc-bd-w-3" style='width: 64px;border-radius: 50%' :src="personalData.memberImg">
				</div>
				<div class='bc-flex-1'>
					<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c'>
						<div class="bc-mg-tb-5 ">级别：<span class='t-C4962E'>{{personalData.level}}</span></div>
						<!--<template v-if="$role18 == 1">-->
						<template v-if="personalData.role18 == 1">
							<a class="bc-t-333 bc-f-12rp reset-a"  href="javascript:;" @click="$toast({message: '敬请期待!',});">国际{{personalData.level}}说明 ></a>
						</template>
						<template v-else>
							<a class="bc-t-333 bc-f-12rp reset-a"  href="javascript:;" @click="$toast({message: '敬请期待!',});">{{personalData.level}}说明 ></a>
						</template>
					</div>
					<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c'>
						<div class="bc-flex-5">代理费用：<span class='t-C4962E'>{{personalData.capital}}元</span></div>
							<!--<a class="t-333 f-0_7 reset-a" href="/member/office_president/not_sign_smart_contract.html" >我的智能合约></a>-->
							<a class="bc-t-333 bc-f-12rp reset-a"  @click="$toast({message: '敬请期待!',});"  href="javascript:;" >我的智能合约></a>
					</div>
					<div class="bc-mg-tb-5 bc-g-flex">
						<div class="g-flex-5">入驻日期：<span class='t-C4962E'>{{personalData.instanceTime}}</span></div>
					</div>
					<template  v-if="personalData.role18 == 1">
						<div class="bc-mg-tb-5">特别奖学金发放日期
							<div class="percent-bar bc-mg-tb-5">
								<div class="percent-bar-bg bc-bg-white"></div>
								<div class="percent-bar-val" :style='{width:personalData.newTimes}'  style="background: #ffd900;"></div>
							</div>
						</div>
						<div class="bc-flex bc-flex-jc-sb bc-mg-tb-5 bc-f-12rp"><span>{{personalData.start_time}}至{{personalData.end_time}}</span>
							<template v-if="personalData.termTime == 0">
								<span>已到期</span>
							</template>
							<template v-else><span>还差{{personalData.termTime}}天到期</span></template>
						</div>
					</template>
				</div>
				
			</div>
		</template>
		
	</div>
</template>

<script>
	export default {
		props:['personalData','type'],
		data() {
			return {
			
			}
		},
	}
</script>

<style scoped lang="scss">
	.t-C4962E{
		color:#C4962E
	}
	.fweight{
		font-weight: 500;
	}
	.selfMsg{
		background: url(#{$base-static-path + "/img/member/area-creator/bg.png"}) no-repeat 0 0 / 100% 100%;
	}
	
	
	// 进度条
	.percent-bar{
		position: relative;
		.percent-bar-bg{
			height: 10px;
			border-radius: 20px;
		}
		.percent-bar-val{
			height: 10px;
			border-radius: 20px;
			position: absolute;
			left: 0px;
			top: 0px;
		}
	}
</style>