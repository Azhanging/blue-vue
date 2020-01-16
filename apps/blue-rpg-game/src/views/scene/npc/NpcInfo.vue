<!-- NPC信息 -->
<template>
  <BvView>
    <BvHeader :center-control="{
      title: `NPC:${npcData.name}`
    }"/>

    <div class="bz-pd-28rpx bz-f-b bz-bd-b-e5e">
      NPC简介：{{npcData.description}}
    </div>

    <div class="bz-flex bz-pd-28rpx bz-f-b bz-bd-b-e5e" v-if="npcData.resource && npcData.resource.length > 0">
      <div>商品：</div>
      <div class="bz-flex-10">
        <router-link :to="`/scene/resource/info?id=${item.id}`" v-for="(item) in npcData.resource" :key="item.id"
                     class="bz-t-base bz-mg-r-20rpx">
          {{item.name}}
        </router-link>
      </div>
    </div>

    <div class="bz-flex bz-pd-28rpx bz-f-b bz-bd-b-e5e" v-if="npcData.task && npcData.task.length > 0">
      <div>任务：</div>
      <div class="bz-flex-10">
        <router-link :to="`/scene/task/info?id=${item.id}`" v-for="(item) in npcData.task" :key="item.id"
                     class="bz-t-base bz-mg-r-20rpx">
          {{item.name}}
        </router-link>
      </div>
    </div>

  </BvView>
</template>

<script>
  export default {
    name: "npc-info",
    data() {
      return {
        //地图数据
        npcData: {}
      };
    },
    created() {
      //获取角色列表
      this.getMapData();
    },
    methods: {
      //获取地图信息
      getMapData() {
        const { id } = this.$route.query;
        this.$axios.get(`/member/scene/npc/info`, {
          params: {
            id
          }
        }).then((res) => {
          const { data } = res;
          this.npcData = data;
        });
      }
    }
  }
</script>