<!-- 角色列表 -->
<template>
	<BvView>
		<BvHeader :center-control="{
      title: `${taskInfo.name}`
    }"/>

		<!-- 对话 -->
		<div class="bz-bd-b-e5e bz-pd-20rpx">
			<div class="bz-f-b bz-mg-b-20rpx">
				任务对话：
			</div>
			<div class="bz-mg-b-20rpx" v-for="(item ,index) in taskInfo.dialogue" :key="index">
				<template v-if="item.type === 1">
					NPC：
				</template>
				<template v-else-if="item.type === 2">
					我：
				</template>
				<template v-else-if="item.type === 3">
					盘白：
				</template>
				{{item.content}}
			</div>
		</div>

		<!-- 任务依赖 -->
		<div class="bz-bd-b-e5e bz-pd-20rpx" v-if="taskInfo.status !== 2">
			<div class="bz-f-b bz-mg-b-20rpx">
				任务需求：
			</div>
			<div class="bz-t-base bz-t-c">
				<template v-if="taskInfo.requirement && taskInfo.requirement.length > 0">
					<div class="bz-flex bz-mg-b-20rpx" v-for="(item ,index) in taskInfo.requirement" :key="index">
						<div class="bz-flex-1">
							{{item.typeName}}
						</div>
						<div class="bz-flex-1">
							{{item.bind ? item.bind.name : '-'}}
						</div>
						<div class="bz-flex-1">
							<template v-if="taskInfo.status === 0">
								{{item.amount}}
							</template>
							<template v-else>
								({{item.count}}/{{item.amount}})
							</template>
						</div>
					</div>
				</template>
				<template v-else>
					无
				</template>
			</div>
		</div>

		<!-- 任务奖励 -->
		<div class="bz-bd-b-e5e bz-pd-20rpx">
			<div class="bz-f-b bz-mg-b-20rpx">
				任务奖励：
			</div>
			<div class="bz-t-base bz-t-c">
				<template v-if="taskInfo.reward && taskInfo.reward.length > 0">
					<div class="bz-flex bz-mg-b-20rpx" v-for="(item ,index) in taskInfo.reward" :key="index">
						<div class="bz-flex-1">
							{{item.name}}
						</div>
						<div class="bz-flex-1">
							+{{item.amount}}
						</div>
					</div>
				</template>
				<template v-else>
					无
				</template>

			</div>
		</div>

		<!-- 下一个任务奖励 -->
		<div class="bz-bd-b-e5e bz-pd-20rpx" v-if="taskInfo.status === 2">
			<div class="bz-f-b bz-mg-b-20rpx">
				下一任务：
			</div>
			<div class="bz-t-base bz-t-c">
				<router-link :to="{
    	    path:`/scene/task/info`,
    	    query:{
            id: taskInfo.nextTask.id
    	    }
        }" class="bz-t-base">
					{{taskInfo.nextTask.name}}
				</router-link>
			</div>
		</div>

		<!-- 任务操作 -->
		<div class="bz-w-100 bz-ps-f bz-flex" style="bottom:0;left:0;">
			<button class="bz-w-100 bz-btn bz-btn-base bz-flex-1" @click="taskHandler(taskInfo.status)" v-if="taskInfo.status !== 2">
				<template v-if="taskInfo.status === 0">
					接受任务
				</template>
				<template v-else-if="taskInfo.status !== 2">
					提交任务
				</template>
			</button>
			<button class="bz-w-100 bz-btn bz-btn-danger bz-flex-1"
			        @click="taskHandler(-1)"
			        v-if="taskInfo.status !== 0 && taskInfo.status !== 2 ">
				放弃任务
			</button>
			<template v-if="taskInfo.status === 2">
				<button class="bz-btn bz-btn-base bz-flex-1">
					已完成
				</button>
			</template>
		</div>

	</BvView>
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
		beforeRouteUpdate(to, from, next) {
			next();
			this.getTaskInfo();
		},
		mounted() {
			this.getTaskInfo();
		},
		methods: {
			//获取任务详情
			getTaskInfo() {
				const {id} = this.$route.query;
				this.$axios.get(`/member/scene/task/info`, {
					params: {id}
				}).then((res) => {
					const {data} = res;
					this.taskInfo = data;
				});
			},
			//任务处理
			taskHandler(status) {
				let _status = status || this.taskInfo.status;
				const {id} = this.$route.query;
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