<!-- 战斗舞台 -->
<template>
	<BvLayoutView>
		<BvHeader :center-control="{
      title: `战斗舞台`
    }"/>

		<div class="bc-flex bc-pd-14rp bc-f-b bc-bd-b-e5e">
			<div>周边：</div>
			<div class="bc-flex-10">

			</div>
		</div>

	</BvLayoutView>
</template>

<script>
	export default {
		name: "fight-stage",
		data() {
			return {
				//地图数据
				fightData: {}
			};
		},
		created() {
			//获取战斗信息
			this.entryFight();
		},
		methods: {
			//战斗开始
			entryFight() {
				const query = this.$route.query;
				this.$axios.post(`/member/scene/fight/entry`, query).then(() => {
					this.getFightInfo();
				});
			},
			//获取战斗信息
			getFightInfo() {
				this.$axios.get(`/member/scene/fight/info`).then((res) => {
					const {data} = res;
					this.fightData = data;
				});
			}
		}
	}
</script>