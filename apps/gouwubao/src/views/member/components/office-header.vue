<template>
	<div class="bc-row" v-if="memberInfo">
		<div class=" offset-header" :class="[
		  type === 'creator' ? 'creator-bg' : 'agent-bg'
		]">
			<slot name="area"/>
			<div class="bc-flex bc-flex-ai-c bc-pd-lr-15rp  bc-pd-tb-30rp">
				<!-- 头像 -->
				<div class="bc-pd-r-15rp">
					<img :src="memberInfo.head_img" alt="" class="head-img">
				</div>

				<!-- 用户信息 -->
				<div class="bc-flex-3">
					<div class="bc-f-18rp">
						{{memberInfo.nickname}}
					</div>
					<div class="offset-color bc-f-12rp bc-mg-t-4rp">
						账号：{{memberInfo.username}}
					</div>
					<div class="offset-color bc-f-12rp bc-mg-t-4rp" v-if="memberInfo.ck_level">
						创客等级：{{ memberInfo.ck_level }}
					</div>
					<div class="offset-color bc-f-12rp bc-mg-t-4rp" v-if="memberInfo.area_level">
						代理级别：{{memberInfo.area_level}}
					</div>
					<div class="offset-color bc-f-12rp bc-mg-t-4rp" v-if="memberInfo.area">
						代理区域：{{memberInfo.area}}
					</div>
				</div>

				<!-- 证书 -->
				<div>
					<template v-if="is_buy_ck == 1">
						<template v-if="is_apply!=1">
							<router-link to="/member/creator/apply-for" v-if="type === 'creator'">
								<img :src="`${staticPath}/creator/creator-certificate.png`"
								     class="certificate"
								>
							</router-link>
						</template>
						<template v-else>
						<router-link to="/member/creator/on-apply-for" v-if="type === 'creator'">
							<img :src="`${staticPath}/creator/creator-certificate.png`"
									 class="certificate"
							>
						</router-link>
						</template>
					</template>
					
					
					
					<template v-if="type === 'agent'">
						<img :src="`${staticPath}/agent/shen-certificate.png`"
						     class="certificate"
						     v-if="memberInfo.level == 1"
						>
						<img :src="`${staticPath}/agent/xian-certificate.png`"
						     class="certificate"
						     v-if="memberInfo.level == 3"
						>
					</template>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "office-header",
  props: ['member-info','type','is_buy_ck','is_apply'],
  computed: {
    staticPath(){
      return `${this.config.path.static}/img/member/`;
    }
  }
}
</script>

<style scoped lang="scss">
	.offset-header {
		position: relative;
		&.creator-bg{
			background: #F1DFB6 url($base-static-path + '/img/member/creator/header-bg.png') right bottom no-repeat;
			background-size: auto 100%;
		}
		&.agent-bg{
			background: #F1DFB6 url($base-static-path + '/img/member/agent/header-bg.png') right bottom no-repeat;
			background-size: auto 100%;
		}
		.head-img {
			width: rem(60);
			height: rem(60);
			border-radius: 50%;
		}
		.certificate {
			width: rem(52);
			height: rem(75);
		}
	}

	.offset-color {
		color: #A86F2F;
	}
</style>