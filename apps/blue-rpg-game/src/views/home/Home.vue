<template>
  <BvView>
    <BvHeader :centerControl="{
      title:`BLUE-RPG-GAME`
    }">
      <div slot="left-control"></div>
      <div slot="right-control">
        <router-link to="/setting" class="ba-pd-30rpx ba-f-28rpx ba-t-base">
          设置
        </router-link>
      </div>
    </BvHeader>

    <!-- GAME NAME -->
    <div class="ba-t-c ba-t-base ba-pd-tb-40rpx game-name">
      BLUE-RPG-GAME ->
    </div>

    <!-- 登录注册 -->
    <div class="ba-t-c">
      <template v-if="!$store.getters.isLogin">
        <button class="ba-btn ba-btn-base" @click="$router.replace(`/login`)">
          登录
        </button>
        <button class="ba-btn" @click="$router.replace(`/register`)">
          注册
        </button>
      </template>
      <template v-else>
        <router-link to="/scene/zone/entry" class="ba-btn ba-btn-base">
          进入游戏
        </router-link>
      </template>
    </div>

    <!-- 回到 -->
    <div class="ba-t-c" v-show="false">
      <button class="ba-btn ba-btn-base">
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