<template>
	<m-view :has-nav="view.navigator" :router-level="routerLevel">

		<slot></slot>

		<template slot="suspend" slot-scope="scope">
			<m-suspend :scrollDistance="scope.scroll.top" :backElement="$parent.$el && $parent.$el.children[0]"></m-suspend>
		</template>

		<template slot="footer">
			<slot name="footer"></slot>
		</template>

	</m-view>
</template>

<script>

  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "m-home-view",
    computed: {
      ...mapState(['view'])
    },
    props: {
      routerLevel: {
        default: 1,
        type: Number
      },
      hasSuspend: {
        default: true,
        type: Boolean
      },
      routerLevel: {
        default: 1,
        type: Number
      }
    }
  }
</script>

<style scoped lang="scss">
	.no-nav {

	}
</style>