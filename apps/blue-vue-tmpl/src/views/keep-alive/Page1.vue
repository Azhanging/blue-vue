<template>
  <BvView>
    <div class="ba-t-c ba-f-b">
      Page1 {{random}}
    </div>
    <div class="ba-t-c">
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
  data() {
    return {
      random: Math.random(),
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
  beforeRouteUpdate(to,form,next) {
    console.log(`beforeRouteUpdate`, this.$options.name);
    this.random = Math.random();
    next();
  },
};
</script>
