<template>
  <BvView>
    <BvHeader :center-control="{
      title:`首页`
    }"/>

    <div class="ba-t-c ba-pd-10 ba-overflow-hide">
      <div class="ba-t-c ba-mg-t-20rpx">
        <router-link to="/components" class="ba-btn ba-btn-primary ba-btn-plain">
          components
        </router-link>
      </div>

      <div v-for="i in 10" class="ba-t-c">
        <div class="ba-pd-20rpx">
          <router-link to="/components/scroll/1" class="ba-t-base">
            测试keep-alive scroll
          </router-link>
        </div>

        <div class="ba-pd-20rpx">
          <router-link to="/components" class="ba-t-base">
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