<template>
  <BvLayoutView>
    <div>
      <div v-for="i in 30" class="bc-pd-10rpx">
        {{i}}
      </div>
    </div>

    <BvScroll @scrolltolower="scrollToLower" @scroll="scroll" :disabled="disabled" :immediate="true">
      <div>
        <router-link to="/scroll2">---</router-link>
      </div>
      <div v-for="i in list" class="bc-t-c bc-pd-tb-20rpx">
        -
      </div>
    </BvScroll>
  </BvLayoutView>
</template>

<script>
  export default {
    name: "scroll1",
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
      },
      scroll(res) {
        console.log(res);
      }
    }
  }
</script>