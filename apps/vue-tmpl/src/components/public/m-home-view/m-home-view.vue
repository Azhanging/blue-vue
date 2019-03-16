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
      //路由层级，用于多个position fixed的时候使用
      routerLevel: {
        default: 1,
        type: Number
      },
      //是否有浮动的层级
      hasSuspend: {
        default: true,
        type: Boolean
      }
    }
  }
</script>