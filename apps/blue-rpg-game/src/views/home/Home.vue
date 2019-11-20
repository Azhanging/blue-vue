<template>
  <BvLayoutView>
    <BvHeader :centerControl="{
      title:`BLUE-RPG-GAME`
    }">
      <div slot="left-control"></div>
      <div slot="right-control">
        <router-link to="/setting" class="bc-pd-15rp bc-f-14rp" >
          设置
        </router-link>
      </div>
    </BvHeader>

    <!-- GAME NAME -->
    <div class="bc-t-c bc-t-primary bc-pd-tb-40rp bc-f-20rp game-name">
      TEXT "BLUE-RPG" GAME
    </div>

    <!-- 登录注册 -->
    <div class="bc-t-c">
      <button class="bc-btn bc-btn-primary" @click="$router.push(`/login`)">
        登录
      </button>
      <button class="bc-btn" @click="$router.push(`/register`)">
        注册
      </button>
    </div>

    <!-- 回到 -->
    <div class="bc-t-c" v-show="false">
      <button class="bc-btn bc-btn-primary">
        回到游戏
      </button>
    </div>

  </BvLayoutView>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        showStatus: false
      }
    },
    activated() {
      this.$axios.post(`/mock/data1`, {
        data: 1
      });
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes game-name-animate {
    10% {
      transform: rotate(-5deg);
      transform-origin: 0;
    }
    40% {
      transform: translateX(50px);
    }
    100% {
      transform: translateX(-50px);
    }
  }

  .game-name {
    animation: game-name-animate 3s ease infinite alternate;
  }
</style>