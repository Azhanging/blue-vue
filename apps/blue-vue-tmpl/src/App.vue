<template>
  <div
    id="app"
    class="ba-t-666 ba-f-28rpx"
  >

    <keep-alive
      :exclude="exclude"
      ref="keepAlive"
    >
      <router-view />
    </keep-alive>

    <!-- 浮动状态 -->
    <BvSuspend
      :scrollDistance="view.suspend.distance"
      :show="view.suspend.status"
    >
      <i
        class="bp-icon bp-icon-go-top ba-f-20 ba-t-666"
        slot="backToTop"
      ></i>
    </BvSuspend>

    <!-- 底部导航 -->
    <WTabBar />

    <!-- 图片预览的组件 -->
    <BvPhotoSwipe />
  </div>
</template>

<script>
import Vuex from "vuex";
import { blueRetreat } from "@router";
import config from "@config";

const { mapState } = Vuex;

export default {
  name: "app",
  computed: {
    ...mapState(["view"]),
    //不进行缓存
    exclude() {
      const exclude = blueRetreat.getExcludeState();
      return exclude.concat(config.app.keepAlive.exclude);
    },
  },
};
</script>
