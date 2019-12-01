<!-- 战斗舞台 -->
<template>
	<BvLayoutView>
		<BvHeader :center-control="{
      title: `战斗`
    }"/>

		<div class="bc-pd-14rp bc-f-b bc-bd-b-e5e" v-if="fightData.enemy">
			<div class="bc-mg-b-4rp">{{fightData.enemy.name}}</div>
			<div>
				HP:{{fightData.enemy.hp}}
			</div>
		</div>

		<div class="bc-pd-14rp bc-f-b bc-bd-b-e5e" v-if="fightData.enemy">
			<div class="bc-mg-b-4rp">{{fightData.my.name}}</div>
			<div>
				HP:{{fightData.my.hp}}
			</div>
		</div>

		<div class="bc-flex bc-pd-14rp bc-f-b bc-bd-b-e5e" v-if="fightData.enemy">
			<div>技能：</div>
			<div class="bc-flex-1">
				<a href="javascript:;" v-for="(item,index) in fightData.skill" :key="item.id" class="bc-t-primary bc-mg-r-10rp" @click="useSkill(item)">
					{{item.name}}
				</a>
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
				this.$axios.post(`/member/scene/fight/enter`, query).then(() => {
					this.getFightInfo();
				});
			},
			//获取战斗信息
			getFightInfo() {
				this.$axios.get(`/member/scene/fight/info`).then((res) => {
					const {data} = res;
					this.fightData = data;
				});
			},
			//使用技能
			useSkill(skill) {
				const {id} = skill;
				this.$axios.get(`/member/scene/skill/use`, {
					params: {
						id
					}
				}).then(() => {

				});
			}
		}
	}
</script>