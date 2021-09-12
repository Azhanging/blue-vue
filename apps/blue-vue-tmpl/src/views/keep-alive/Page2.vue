<template>
  <BvView>
    <div class="ba-t-c ba-f-b">
      Page2 {{random}}
    </div>
    <div class="ba-t-c">
      <router-link :to="`/keep-alive/page1`">
        Page1
      </router-link>
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
  name: `page2`,
  data() {
    return {
      random: Math.random(),
    };
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
