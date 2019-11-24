<!-- 角色列表 -->
<template>
	<BvLayoutView>
		<BvHeader :center-control="{
      title: `任务：${taskInfo.name}`
    }"/>
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
			//获取角色列表
			getTaskInfo() {
				this.$axios.get(`/member/scene/task/info`).then((res) => {
					const {data} = res;
					this.taskInfo = data;
				});
			}
		}
	}
</script>