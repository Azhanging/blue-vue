<template>
  <BvView>
    <BvHeader :centerControl="{
      title:`BLUE-RPG-GAME`
    }">
      <div slot="left-control"></div>
      <div slot="right-control">
        <router-link to="/setting" class="bc-pd-15rpx bc-f-14rpx">
          设置
        </router-link>
      </div>
    </BvHeader>

    <!-- GAME NAME -->
    <div class="bc-t-c bc-t-base bc-pd-tb-40rpx bc-f-20rpx game-name">
      <- BLUE-TEXT-RPG-GAME ->
    </div>

    <!-- 登录注册 -->
    <div class="bc-t-c">
      <template v-if="!$store.getters.isLogin">
        <button class="bc-btn bc-btn-base" @click="$router.replace(`/login`)">
          登录
        </button>
        <button class="bc-btn" @click="$router.replace(`/register`)">
          注册
        </button>
      </template>
      <template v-else>
        <router-link to="/scene/role/list" class="bc-btn bc-btn-base">
          进入游戏
        </router-link>
      </template>
    </div>

    <!-- 回到 -->
    <div class="bc-t-c" v-show="false">
      <button class="bc-btn bc-btn-base">
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