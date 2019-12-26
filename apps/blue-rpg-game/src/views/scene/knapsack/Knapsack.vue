<!-- 背包 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: `背包`
    }"/>
    <div class="bc-pd-lr-10rp bc-f-b bc-t-c">
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
          <template v-if="/^[3]$/.test(resource.type)">
            <a href="javascript:;" class="bc-t-base" @click="useEquipment(resource)">
              装备
            </a>
          </template>

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
        //背包列表
        knapsackList: []
      };
    },
    created() {
      this.getKnapsack();
    },
    methods: {
      getKnapsack() {
        this.$axios.get(`/member/scene/knapsack/resource`).then((res) => {
          const { data } = res;
          this.knapsackList = data.list;
        });
      },
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
        this.$axios.get(`/member/scene/knapsack/useEquipment`,{
          params: {
            id: resource.id
          }
        }).then(() => {

        });
      }
    }
  }
</script>