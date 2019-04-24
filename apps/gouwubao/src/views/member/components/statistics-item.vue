<!-- 统计选项 -->
<template>
	<div class="bc-row bc-bg-white bc-pd-b-10rp" v-if="options">
		<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp">
			<div class="bc-flex-1  bc-f-b">
				{{options.title.name}}
			</div>
			<div class="bc-flex-1 bc-t-999 bc-f-12rp bc-t-r" v-if="options.title.url">
				<a class="bc-t-999" href="javascript:;" @click="$router.routerBack(options.title.url)">
					查看全部>
				</a>
			</div>
		</div>
		<div class="bc-flex bc-flex-ai-c bc-pd-lr-16rp">
			<div class="bc-flex-1 bc-f-30rp">
				{{options.num || 0}}
			</div>
			<div class="bc-flex-1">
				<div class="bc-flex bc-flex-ai-c bc-t-c">
					<div class="bc-flex-1" :class="[options.otherNum.length - 1 !== index && 'bc-bd-r-e5e']" v-for="(item,index) in options.otherNum">
						<div class="bc-f-12rp bc-t-999">
							{{item.name}}
						</div>
						<div class="bc-mg-t-2rp bc-f-16rp">
							{{item.num || 0}}
						</div>
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
					<a @click="$router.routerBack(options.bottomNum.url)" class="bc-f-11rp bc-btn bc-btn-base">
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
  props: ['options']
}
</script>