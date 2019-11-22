<!-- NPC信息 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: mapData.name
    }"/>

    <div class="bc-pd-14rp bc-f-b bc-bd-b-e5e">
      NPC简介：{{mapData.description}}
    </div>

    <div class="bc-pd-14rp bc-f-b bc-bd-b-e5e" v-if="mapData.npc && mapData.npc.length > 0">
      商品：
      <router-link to="" v-for="(item) in mapData.npc" :key="item.id" class="bc-t-primary">
        {{item.name}}
      </router-link>
    </div>

    <div class="bc-pd-14rp bc-f-b bc-bd-b-e5e" v-if="mapData.monster && mapData.monster.length > 0">
      任务：
      <router-link to="" v-for="(item) in mapData.monster" :key="item.id" class="bc-t-primary">
        {{item.name}}
      </router-link>
    </div>

  </BvLayoutView>
</template>

<script>
  export default {
    name: "npc-info",
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    data() {
      return {
        //地图数据
        mapData: {}
      };
    },
    created() {
      //获取角色列表
      this.getMapData();
    },
    methods: {
      //获取地图信息
      getMapData() {
        this.$axios.get(`/member/scene/map/go`).then((res) => {
          const { data } = res;
          this.mapData = data;
        });
      }
    }
  }
</script>