<!-- 统计选项 -->
<template>
	<div class="bc-row bc-bg-white" v-if="options">
		<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp" v-if="options.title && options.title.name">
			<div class="bc-flex-1 bc-f-b">
				<slot name="title-name" :name="options.title.name">
					{{options.title.name}} <i v-if="options.title.icon" class="icon icon-tishi1 bc-t-999"></i>
				</slot>
			</div>
			<div class="bc-flex-1 bc-t-999 bc-f-12rp bc-t-r" v-if="options.title.url">
				<a class="bc-t-999" href="javascript:;" @click="$router.routerTo(options.title.url)">
					{{options.title.urlName || '查看全部>'}}
				</a>
			</div>
		</div>
		<div class="bc-flex bc-flex-ai-c bc-pd-lr-16rp bc-pd-b-10rp" :class="[options.title.name && 'bc-pd-t-10rp']">
			<div class="bc-flex-1">
				<!-- num对应的插槽 -->
				<slot name="num">
					<div v-if="options.num.zsName" class="bc-f-15rp bc-f-b bc-mg-b-15rp">{{options.num.zsName}}</div>
					<div class="bc-f-12rp bc-t-999" v-if="options.num.name">
						{{options.num.name}}
					</div>
					<div class="bc-f-30rp">
						{{options.num.value || 0}}
					</div>
					<div v-if="options.num.prompt" class="bc-flex">
						<div class="bc-t-999 bc-mg-r-4rp"><i class="icon icon-icon"></i></div>
						<div class="bc-flex-1">
							备注:<span class="bc-t-999">3A属标签，不列入产品总数统计内</span>
						</div>
					</div>
				</slot>
			</div>
			<div class="bc-flex-1">
				<div class="bc-flex bc-flex-ai-c bc-t-c bc-flex-w-w">
					<div class="bc-flex-1 bc-mg-b-8rp bc-bd-r-e5e min-w45" v-for="(item,index) in options.otherNum"><!--:class="[options.otherNum.length - 1 !== index && 'bc-bd-r-e5e']"-->
						<div class="bc-f-12rp bc-t-999">
							{{item.name}}
						</div>
						<div class="bc-mg-t-2rp bc-f-16rp">
							{{item.num || 0}}
						</div>
					</div>
					<div v-if="options.cartogram" class="bc-flex-1 bc-t-c">
						<img class="cartogram-img" :src="`${staticPath}/cartogram-img.png`">
					</div>
				</div>
			</div>
		</div>
		<div class="bc-row bc-pd-lr-16rp" v-if="options.bottomNum">
			<div class="bc-flex bc-flex-ai-c bc-pd-5rp bc-mg-t-10rp" style="background-color: #F9F7EE;">
				<div class="bc-flex-2 bc-f-12rp bc-pd-lr-4rp">
					{{options.bottomNum.name}}<span class="bc-f-b">{{options.bottomNum.num || 0}}</span>
				</div>
				<div class="bc-flex-1 bc-t-r">
					<a @click="$router.routerTo(options.bottomNum.url)" class="bc-f-11rp bc-btn bc-btn-base">
						{{options.bottomNum.urlName}} >
					</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "statistics-item",
  props: ['options'],
	computed:{
		staticPath() {
			return `${this.config.path.static}/img/public`;
		}
	}
}
</script>
<style scoped lang="scss">
	.min-w45{
		min-width: 45%;
		&:nth-child(2n){
			border-right: 0;
		}
	}
	.cartogram-img{width: rem(100)}
</style>