<template>
  <BvView>
    <BvHeader :centerControl="{
      title: `游戏选区`
    }"/>
    <div class="bz-flex bz-pd-28rpx">
      <div>
        请选择游戏区：
      </div>
      <div class="bz-flex-1">
        <router-link v-for="item in zoneList" :to="{
          path: `/scene/role/list`,
          query: {
            zoneId: item.id
          }
        }">
          {{item.name}}
        </router-link>
      </div>
    </div>
  </BvView>
</template>

<script>
  export default {
    name: "entry",
    data() {
      return {
        zoneList: []
      };
    },
    created() {
      this.getZoneList();
    },
    methods: {
      getZoneList() {
        this.$axios.get(`/member/scene/zone/list`).then((res) => {
          const { data } = res;
          this.zoneList = data.list;
        });
      }
    }
  }
</script>