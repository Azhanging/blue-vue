<template>
  <BvView>
    <BvHeader :centerControl="{
      title:`BLUE-RPG-GAME`
    }">
      <div slot="left-control"></div>
      <div slot="right-control">
        <router-link to="/setting" class="bz-pd-30rpx bz-f-28rpx bz-t-base">
          设置
        </router-link>
      </div>
    </BvHeader>

    <!-- GAME NAME -->
    <div class="bz-t-c bz-t-base bz-pd-tb-40rpx game-name">
      BLUE-RPG-GAME ->
    </div>

    <!-- 登录注册 -->
    <div class="bz-t-c">
      <template v-if="!$store.getters.isLogin">
        <button class="bz-btn bz-btn-base" @click="$router.replace(`/login`)">
          登录
        </button>
        <button class="bz-btn" @click="$router.replace(`/register`)">
          注册
        </button>
      </template>
      <template v-else>
        <router-link to="/scene/zone/entry" class="bz-btn bz-btn-base">
          进入游戏
        </router-link>
      </template>
    </div>

    <!-- 回到 -->
    <div class="bz-t-c" v-show="false">
      <button class="bz-btn bz-btn-base">
        回到游戏
      </button>
    </div>

  </BvView>
</template>

<script>
  export default {
    name: "home"
  }
</script>

<style lang="scss" scoped>
  @keyframes game-name-animate {
    10% {
      transform: rotate(-5deg);
      transform-origin: 0;
    }
    40% {
      transform: translateX(60px);
    }
    100% {
      transform: translateX(-60px);
    }
  }

  .game-name {
    animation: game-name-animate 3s ease infinite alternate;
  }
</style>