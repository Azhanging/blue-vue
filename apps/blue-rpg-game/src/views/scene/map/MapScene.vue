<!-- 地图场景 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: mapData.name
    }"/>

    <div class="bc-pd-14rpx bc-f-b bc-bd-b-e5e">
      地图简介：{{mapData.description}}
    </div>

    <div class="bc-flex bc-pd-14rpx bc-f-b bc-bd-b-e5e" v-if="mapData.map && mapData.map.length > 0">
      <div>周边：</div>
      <div class="bc-flex-10">
        <router-link :to="`/scene/map?id=${item.id}`" v-for="(item) in mapData.map" :key="item.id"
                     class="bc-t-base bc-mg-r-10rpx">
          {{item.name}}
        </router-link>
      </div>
    </div>

    <div class="bc-flex bc-pd-14rpx bc-f-b bc-bd-b-e5e" v-if="mapData.npc && mapData.npc.length > 0">
      <div>NPC：</div>
      <div class="bc-flex-10">
        <router-link :to="`/scene/npc/info?id=${item.id}`" v-for="(item) in mapData.npc" :key="item.id"
                     class="bc-t-base bc-mg-r-10rpx">
          {{item.name}}
        </router-link>
      </div>
    </div>

    <div class="bc-flex bc-pd-14rpx bc-f-b bc-bd-b-e5e" v-if="mapData.monster && mapData.monster.length > 0">
      <div>怪物：</div>
      <div class="bc-flex-10">
        <a href="javascript:;" @click="entryFight({
					path: `/scene/fight/stage`,
					query:{
						id:item.id,
						type:1
					}
				})" v-for="item in mapData.monster" :key="item.id" class="bc-t-base">
          {{item.name}}
        </a>
      </div>
    </div>

  </BvLayoutView>
</template>

<script>
  export default {
    name: "map-scene",
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
    beforeRouteUpdate(to, from, next) {
      //获取角色列表
      next();
      this.getMapData();
    },
    methods: {
      //获取地图信息
      getMapData() {
        const { query } = this.$route;
        this.$axios.get(`/member/scene/map/go`, {
          params: query
        }).then((res) => {
          const { data } = res;
          this.mapData = data;
        });
      },
      entryFight(routeOpts) {
        this.$axios.get(`/member/scene/fight/isLive`).then(() => {
          this.$router.push(routeOpts);
        });
      }
    }
  }
</script>