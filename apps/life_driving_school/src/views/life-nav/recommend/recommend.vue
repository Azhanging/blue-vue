<template>
	<bv-home-view class='wap' :router-level='2'>
		<life_nav_tab :growIndex='3' :title='{
            title:{
                value: "健康导航"
            }
        }'></life_nav_tab>
		<recommend_list></recommend_list>

	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import recommend_list from "../components/recommend-list"

	export default {
		name: "index",
		components: {
			life_nav_tab,
			recommend_list
		},
	}
</script>

<style scoped>

</style>