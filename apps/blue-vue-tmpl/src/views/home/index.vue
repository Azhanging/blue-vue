<template>
  <bv-home-view>
    <bv-header :header="{title:{value:'首页'}}"/>
    <div class="bc-t-c bc-pd-10 bc-overflow-hide">
      <div class="bc-t-c bc-mg-t-10rp">
        <router-link to="/components" class="bc-btn bc-btn-primary bc-btn-line">
          components
        </router-link>
      </div>

      <div class="bc-t-c bc-mg-t-10rp">
        <router-link to="/test-scroll" class="bc-btn bc-btn-danger bc-btn-line">
          test-scroll
        </router-link>
      </div>

      <div class="bc-t-c bc-mg-t-10rp">
        <router-link to="/test-login" class="bc-btn bc-btn-danger bc-btn-line">
          test-login
        </router-link>
      </div>

      <div v-for="i in 10" class="bc-t-c">
        <div class="bc-pd-10rp">
          <router-link to="/components/scroll/1" class="bc-t-base">
            测试keep-alive scroll
          </router-link>
        </div>

        <div class="bc-pd-10rp">
          <router-link to="/components" class="bc-t-base">
            测试keep-alive components
          </router-link>
        </div>
      </div>
    </div>
  </bv-home-view>
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