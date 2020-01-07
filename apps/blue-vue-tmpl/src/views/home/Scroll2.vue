<template>
  <BvLayoutView>
    <div>
      <div v-for="i in 30" class="bc-pd-10rpx">
        {{i}}
      </div>
    </div>

    <BvScroll @scrolltolower="scrollToLower" :disabled="disabled" :immediate="true" style="height:200px;overflow:scroll;">
      <div>
        <router-link to="/scroll1">---</router-link>
      </div>
      <div v-for="i in list" class="bc-t-c bc-pd-tb-20rpx">
        -
      </div>
    </BvScroll>
  </BvLayoutView>
</template>

<script>
  export default {
    name: "scroll2",
    data() {
      return {
        list: [],
        disabled: false
      }
    },
    methods: {
      scrollToLower() {
        this.$axios.get(`/mock/list`).then((res) => {
          const { data } = res;
          this.list = this.list.concat(data.list);
          if (this.list.length > 30) {
            this.disabled = true;
          }
        });
      }
    }
  }
</script>