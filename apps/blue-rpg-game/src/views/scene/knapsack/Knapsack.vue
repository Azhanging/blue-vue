<!-- 背包 -->
<template>
  <BvView>
    <BvHeader :center-control="{
      title: `背包`
    }"/>
    <div class="ba-pd-lr-20rpx ba-f-b ba-t-c">
      <div>
        <div class="ba-flex ba-pd-28rpx ba-f-b ba-bd-b-e5e">
          已装备
        </div>
        <!-- 已使用装备 -->
        <template v-if="equipmentList.length > 0">
          <div class="ba-flex ba-flex-jc-c ba-pd-tb-20rpx ba-bd-b-e5e ba-t-base"
               v-for="resource in equipmentList">
            <div class="ba-flex-1 ba-t-333">
              {{resource.typeName}}
            </div>
            <div class="ba-flex-1">
              {{resource.name}}
            </div>
            <div class="ba-flex-1">
              <a href="javascript:;" class="ba-t-base" @click="unUseEquipment(resource)">
                卸下
              </a>
            </div>
          </div>
        </template>
        <div class="ba-t-c ba-pd-tb-20rpx ba-t-999" v-else>
          无
        </div>
      </div>

      <div>
        <div class="ba-flex ba-pd-28rpx ba-f-b ba-bd-b-e5e">
          背包 ({{knapsack.list.length}}/{{knapsack.capacity}})
        </div>
        <template v-if="knapsack.list.length > 0">
          <div class="ba-flex ba-flex-jc-c ba-pd-tb-20rpx ba-bd-b-e5e ba-t-base"
               v-for="resource in knapsack.list">
            <div class="ba-flex-1">
              {{resource.name}}
            </div>
            <div class="ba-flex-1">
              x{{resource.amount}}
            </div>
            <div class="ba-flex-1">
              <a href="javascript:;" class="ba-t-base" v-if="resource.type === 1" @click="useConsume(resource)">
                使用
              </a>
              <a href="javascript:;" class="ba-t-base" @click="useEquipment(resource)"
                 v-if="/^[3]$/.test(resource.type)">
                装备
              </a>
              <a href="javascript:;" class="ba-t-base" @click="discard(resource)">
                丢弃
              </a>
            </div>
          </div>
        </template>
        <div class="ba-t-c ba-pd-tb-20rpx ba-t-999" v-else>
          无
        </div>
      </div>
    </div>
  </BvView>
</template>

<script>
  export default {
    name: "knapsack",
    data() {
      return {
        //装备列表
        equipmentList: [],
        //背包
        knapsack: {
          list: [],
          capacity: '-'
        }
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
          this.knapsack = data;
        });
      }
      ,
      //使用消耗品
      useConsume(resource) {
        this.$axios.post(`/member/scene/knapsack/useConsume`, {
          id: resource.id
        }).then(() => {
          this.getKnapsack();
        });
      },

      //使用装备
      useEquipment(resource) {
        this.$axios.post(`/member/scene/knapsack/useEquipment`, {
          id: resource.id
        }).then(() => {
          this.getEquipment();
          this.getKnapsack();
        });
      },

      //卸下武器
      unUseEquipment(resource) {
        this.$axios.post(`/member/scene/knapsack/unUseEquipment`, {
          id: resource.id
        }).then(() => {
          this.getEquipment();
          this.getKnapsack();
        });
      },

      //丢弃物资
      discard(resource) {
        if (resource.type === 3 || resource.amount === 1) {
          this.discardResource({
            resource,
            amount: 1
          });
        } else {
          this.$messageBox({
            showInput: true,
            title: '丢弃提醒',
            message: `请输入丢弃的数量`,
            inputType: 'number',
            showCancelButton: true,
            $type: 'prompt'
          }).then(({ value }) => {
            this.discardResource({
              resource,
              amount: value
            });
          });
        }

      },

      //丢弃物资
      discardResource(opts = {}) {
        const { resource, amount } = opts;
        this.$axios.post(`/member/scene/knapsack/discard`, {
          id: resource.id,
          amount
        }).then(() => {
          this.getKnapsack();
        });
      }

    }
  }
</script>