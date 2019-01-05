<template>
	<m-view :style="!hasNav ? 'padding-bottom:0;': '' ">
		<slot></slot>
		<template slot="suspend" slot-scope="scope" v-if="hasSuspend">
			<m-suspend :scrollDistance="scope.scroll.top" :backElement="$parent.$el && $parent.$el.children[0]"></m-suspend>
		</template>
		<m-nav-home v-if="hasNav"></m-nav-home>
	</m-view>
</template>

<script>
export default {
  name: "m-view-home",
  props: {
    hasNav: {
      default: true,
      type: Boolean
    },
    hasSuspend: {
      default: true,
      type: Boolean
    }
  }
}
</script>

<style scoped lang="scss">

</style>