<template>
  <BvView>
    <div class="ba-t-c ba-f-b">
      Page1 {{random}}
    </div>
    <div class="ba-t-c">
      <div
        v-for="item in count"
        :key="item"
        class="ba-pd-30rpx"
      >
        {{item}}
      </div>
      <a @click="routerToPage1">
        Page1
      </a>
      <router-link to="/keep-alive/page2">
        Page2
      </router-link>
      <router-link to="/keep-alive/page3">
        Page3
      </router-link>
    </div>
  </BvView>
</template>

<script>
export default {
  name: `page1`,
  beforeCreate() {
    debugger;
    console.log(this);
  },
  data() {
    return {
      random: Math.random(),
      count: Math.ceil(Math.random() * 10 + 1),
    };
  },
  methods: {
    routerToPage1() {
      this.$router.push(`/keep-alive/page1?time=${+new Date()}`);
    },
  },
  mounted() {
    console.log(`mounted`, this.$options.name);
  },
  activated() {
    console.log(`activated`, this.$options.name);
  },
  beforeRouteUpdate(to, form, next) {
    console.log(`beforeRouteUpdate`, this.$options.name);
    this.random = Math.random();
    next();
  },
};
</script>
