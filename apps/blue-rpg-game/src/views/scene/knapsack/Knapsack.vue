<!-- 背包 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: `背包`
    }"/>
    <div class="bc-pd-lr-10rp bc-f-b bc-t-c">
      <div>
        <div class="bc-flex bc-pd-14rp bc-f-b bc-bd-b-e5e">
          已装备
        </div>
        <!-- 已使用装备 -->
        <div class="bc-flex bc-flex-jc-c bc-pd-tb-10rp bc-bd-b-e5e bc-t-base" v-for="resource in equipmentList">
          <div class="bc-flex-1">
            {{resource.name}}
          </div>
          <div class="bc-flex-1">
            卸下
          </div>
        </div>
      </div>

      <div>
        <div class="bc-flex bc-pd-14rp bc-f-b bc-bd-b-e5e">
          背包
        </div>
        <div class="bc-flex bc-flex-jc-c bc-pd-tb-10rp bc-bd-b-e5e bc-t-base" v-for="resource in knapsackList">
          <div class="bc-flex-1">
            {{resource.name}}
          </div>
          <div class="bc-flex-1">
            x{{resource.amount}}
          </div>
          <div class="bc-flex-1">
            <a href="javascript:;" class="bc-t-base" v-if="resource.type === 1" @click="useConsume(resource)">
              使用
            </a>
            <a href="javascript:;" class="bc-t-base" @click="useEquipment(resource)" v-if="/^[3]$/.test(resource.type)">
              装备
            </a>
          </div>
        </div>
      </div>
    </div>
  </BvLayoutView>
</template>

<script>
  export default {
    name: "knapsack",
    data() {
      return {
        //装备列表
        equipmentList: [],
        //背包列表
        knapsackList: []
      };
    },
    created() {
      this.getEquipment();
      this.getKnapsack();
    },
    methods: {
      //获取装备列表
      getEquipment() {
        this.$axios.get('/member/scene/knapsack/equipment').then((res) => {
          const { data } = res;
          this.equipmentList = data.list;
        });
      },
      getKnapsack() {
        this.$axios.get(`/member/scene/knapsack/resource`).then((res) => {
          const { data } = res;
          this.knapsackList = data.list;
        });
      }
      ,
      //使用消耗品
      useConsume(resource) {
        this.$axios.get(`/member/scene/knapsack/useConsume`, {
          params: {
            id: resource.id
          }
        }).then(() => {
          this.getKnapsack();
        });
      },

      //使用装备
      useEquipment(resource) {
        this.$axios.get(`/member/scene/knapsack/useEquipment`, {
          params: {
            id: resource.id
          }
        }).then(() => {
          this.getEquipment();
          this.getKnapsack();
        });
      }
    }
  }
</script>