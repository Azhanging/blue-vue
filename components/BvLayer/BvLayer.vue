<!-- 图层 -->
<template>
	<BvTransition transition-name="opacity">
		<div class="bv-layer-container" :class="{'no-tab-bar':!view.tabBar}" v-show="showStatus" @click.stop="click">
			<div class="bv-layer">
				<slot/>
			</div>
		</div>
	</BvTransition>
</template>

<script>

  import Vuex from 'vuex';

  const { mapState } = Vuex;

  export default {
    name: "bv-layer",
    computed: {
      ...mapState(['view'])
    },
    props: {
      showStatus: {
        default: false,
        type: Boolean
      }
    },
	  methods:{
      click(){
        this.$emit('click')
      }
	  }
  }
</script>

<style scoped lang="scss">
	.bv-layer-container {
		position: fixed;
		z-index: 10000;
		top: 0;
		left: 0;
		right: 0;
		bottom: 47px;
		bottom: calc(constant(safe-area-inset-bottom) + 47px);
		bottom: calc(env(safe-area-inset-bottom) + 47px);
		background-color: rgba(0, 0, 0, .6);
		//没有tab-bar
		&.no-tab-bar {
			bottom: 0;
		}
		.bv-layer {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>