<template>
  <BvView>
    <BvHeader :center-control="{
      title:`首页`
    }"/>

    <div class="bz-t-c bz-pd-10 bz-overflow-hide">
      <div class="bz-t-c bz-mg-t-20rpx">
        <router-link to="/components" class="bz-btn bz-btn-primary bz-btn-plain">
          components
        </router-link>
      </div>

      <div class="bz-t-c bz-mg-t-20rpx">
        <router-link to="/test-scroll" class="bz-btn bz-btn-danger bz-btn-plain">
          test-scroll
        </router-link>
      </div>

      <div class="bz-t-c bz-mg-t-20rpx">
        <router-link to="/test-login" class="bz-btn bz-btn-danger bz-btn-plain">
          test-login
        </router-link>
      </div>

      <div v-for="i in 10" class="bz-t-c">
        <div class="bz-pd-20rpx">
          <router-link to="/components/scroll/1" class="bz-t-base">
            测试keep-alive scroll
          </router-link>
        </div>

        <div class="bz-pd-20rpx">
          <router-link to="/components" class="bz-t-base">
            测试keep-alive components
          </router-link>
        </div>
      </div>
    </div>
  </BvView>
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