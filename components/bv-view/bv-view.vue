<!-- 每个页面的主视图组件 必须使用 -->
<template>
	<div class="bv-view" :class="{'no-tab-bar':!view.tabBar}" :style="`z-index:${100 * routerLevel};`" @click="hideTabBarSubMenu" @input="input">

		<!-- scroll 层 -->
		<div class="bv-view-scroll">
			<slot :scroll="scroll"></slot>
		</div>

		<!-- 公共的view层子路由 -->
		<bv-view-transition>
			<router-view/>
		</bv-view-transition>

		<!-- 浮层 -->
		<slot name="suspend" :scroll="scroll"></slot>

		<!-- 其他的 -->
		<slot name="other"></slot>

		<!-- 底部 -->
		<slot name="footer"></slot>

	</div>
</template>

<script>

  import { setViewEvent, setParentViewScroll, findParentView , inputEvent } from './index';
  import { setTabBarSubmenuIndex } from '$components/bv-tab-bar';
  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "bv-view",
    props: {
      routerLevel: {
        default: 1,
        type: Number
      },
      hasTabBar: {
        default: true,
        type: [Boolean, String]
      }
    },
    computed: {
      ...mapState(['view'])
    },
    data() {
      return {
        scroll: {
          top: 0
        }
      }
    },
    methods: {
      hideTabBarSubMenu() {
        //设置子菜单的状态
        setTabBarSubmenuIndex({
          tabBarSubMenuStatus: -1
        });
      },
      input(){
        inputEvent.call(this);
      }
    },
    mounted() {
      setViewEvent.call(this);
    },
    destroyed() {
      setParentViewScroll({
        scrollElm: findParentView.call(this),
        type: 'destroyed'
      });
    }
  }
</script>

<style scoped lang="scss">

	.bv-view {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 47px;
		bottom: calc(constant(safe-area-inset-bottom) + 47px);
		bottom: calc(env(safe-area-inset-bottom) + 47px);
		left: 0;
		z-index: 100;
		background-color: rgba(255, 255, 255, 1);
		&.no-tab-bar {
			bottom: 0;
		}

		.bv-view-scroll {
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			-webkit-overflow-scrolling: touch;
		}
	}

</style>