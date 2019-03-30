<template>
	<bv-home-view class='wap' :router-level='2'>
		<growTab :growIndex='3' :title='{
            title:{
                value: "健康导航"
            }
        }'></growTab>
		<recommend_list></recommend_list>

	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import growTab from "../components/life_nav_tab"
	import recommend_list from "../components/recommend_list"

	export default {
		name: "index",
		components: {
			growTab,
			recommend_list
		},
	}
</script>

<style scoped>

</style>