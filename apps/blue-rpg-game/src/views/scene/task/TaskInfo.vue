<!-- 角色列表 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: `${taskInfo.name}`
    }"/>

    <!-- 对话 -->
    <div class="bc-bd-b-e5e bc-pd-10rpx">
      <div class="bc-f-b bc-mg-b-10rpx">
        任务对话：
      </div>
      <div class="bc-mg-b-10rpx" v-for="(item ,index) in taskInfo.dialogue" :key="index">
        <template v-if="item.type === 1">
          NPC：
        </template>
        <template v-if="item.type === 2">
          我：
        </template>
        {{item.content}}
      </div>
    </div>

    <!-- 任务依赖 -->
    <div class="bc-bd-b-e5e bc-pd-10rpx" v-if="taskInfo.status !== 2">
      <div class="bc-f-b bc-mg-b-10rpx">
        任务需求：
      </div>
      <div class="bc-t-base bc-t-c">
        <div class="bc-flex bc-mg-b-10rpx" v-for="(item ,index) in taskInfo.requirement" :key="index">
          <div class="bc-flex-1">
            {{item.typeName}}
          </div>
          <div class="bc-flex-1">
            {{item.bind ? item.bind.name : '-'}}
          </div>
          <div class="bc-flex-1">
            <template v-if="taskInfo.status === 0">
              {{item.amount}}
            </template>
            <template v-else>
              ({{item.count}}/{{item.amount}})
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- 任务奖励 -->
    <div class="bc-bd-b-e5e bc-pd-10rpx">
      <div class="bc-f-b bc-mg-b-10rpx">
        任务奖励：
      </div>
      <div class="bc-t-base bc-t-c">
        <div class="bc-flex bc-mg-b-10rpx" v-for="(item ,index) in taskInfo.reward" :key="index">
          <div class="bc-flex-1">
            {{item.name}}
          </div>
          <div class="bc-flex-1">
            +{{item.amount}}
          </div>
        </div>
      </div>
    </div>

    <!-- 任务操作 -->
    <div class="bc-w-100 bc-ps-f bc-flex" style="bottom:0;left:0;" slot="other">
      <button class="bc-w-100 bc-btn bc-btn-base bc-flex-1" @click="taskHandler(taskInfo.status)" v-if="taskInfo.status !== 2">
        <template v-if="taskInfo.status === 0">
          接受任务
        </template>
        <template v-else-if="taskInfo.status !== 2">
          提交任务
        </template>
      </button>
      <button class="bc-w-100 bc-btn bc-btn-danger bc-flex-1" @click="taskHandler(-1)"
              v-if="taskInfo.status !== 0 && taskInfo.status !== 2 ">
        放弃任务
      </button>
      <template v-if="taskInfo.status === 2">
        <div class="bc-t-c bc-bg-base bc-pd-4rpx bc-t-white bc-flex-1">
          已完成
        </div>
      </template>
    </div>

  </BvLayoutView>
</template>

<script>

  export default {
    name: "task-info",
    data() {
      return {
        //角色列表
        taskInfo: {}
      };
    },
    created() {
      this.getTaskInfo();
    },
    methods: {
      //获取任务详情
      getTaskInfo() {
        const { id } = this.$route.query;
        this.$axios.get(`/member/scene/task/info`, {
          params: { id }
        }).then((res) => {
          const { data } = res;
          this.taskInfo = data;
        });
      },
      //任务处理
      taskHandler(status) {
        let _status = status || this.taskInfo.status;
        const { id } = this.$route.query;
        this.$axios.post(`/member/scene/task/handler`, {
          id,
          status: _status
        }).then(() => {
          this.getTaskInfo();
        });
      }
    }
  }
</script>