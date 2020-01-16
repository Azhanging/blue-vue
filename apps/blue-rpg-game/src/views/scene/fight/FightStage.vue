<!-- 战斗舞台 -->
<template>
	<BvView>
		<BvHeader :center-control="{
      title: `战斗场景`
    }"/>

		<div class="bz-flex bz-pd-20rpx bz-f-b bz-bd-b-e5e" v-if="fightData.enemy">
			<div class="bz-pd-r-28rpx">
				{{fightData.enemy.name}}
			</div>
			<div class="bz-flex-1 bz-t-base">
				HP:{{fightData.enemy.currentHp}}/{{fightData.enemy.hp}}
				<template v-if="fightData.enemy.harm">
					<span class="bz-t-red">(-{{fightData.enemy.harm}})</span>
				</template>
			</div>
		</div>

		<div class="bz-flex bz-pd-20rpx bz-f-b bz-bd-b-e5e" v-if="fightData.enemy">
			<div class="bz-pd-r-28rpx">
				{{$store.state.roleInfo.name}}
			</div>
			<div class="bz-flex-1 bz-t-base">
				HP:{{fightData.my.currentHp}}/{{fightData.my.hp}}
				<template v-if="fightData.my.harm">
					<span class="bz-t-red">(-{{fightData.my.harm}})</span>
				</template>
			</div>
			<div class="bz-flex-1 bz-t-base">
				MP:{{fightData.my.currentMp}}/{{fightData.my.mp}}
			</div>
		</div>

		<!-- 技能 -->
		<div class="bz-flex bz-pd-20rpx bz-f-b bz-bd-b-e5e" v-if="fightData.enemy && !isEnd">
			<div>技能：</div>
			<div class="bz-flex-1">
				<a href="javascript:;" v-for="item in skillList" :key="item.id" class="bz-t-base bz-mg-r-20rpx"
				   @click="useSkill(item)">
					{{item.name}}
				</a>
			</div>
		</div>

		<div class="bz-flex bz-pd-20rpx bz-f-b bz-bd-b-e5e" v-if="!isEnd">
			<div>背包：</div>
			<div class="bz-flex-1 bz-flex-jc-c bz-t-c bz-t-base">
				<template v-if="knapsackConsume.length > 0">
					<div class="bz-pd-b-4rpx bz-flex" v-for="resource in knapsackConsume">
						<div class="bz-flex-1">
							{{resource.name}}
						</div>
						<div class="bz-flex-1">
							x{{resource.amount}}
						</div>
						<div class="bz-flex-1">
							<a href="javascript:;" class="bz-t-base" @click="useConsume(resource)">使用</a>
						</div>
					</div>
				</template>
				<template v-else>
					暂无消耗物品
				</template>
			</div>
		</div>

		<div class="bz-flex bz-pd-20rpx bz-bd-b-e5e bz-f-b" v-if="fightData.reward && fightData.reward.length > 0">
			<div>奖励：</div>
			<div class="bz-flex-1 bz-t-base">
				<div class="bz-pd-b-4rpx" v-for="reward in fightData.reward">
					{{reward.name}} x{{reward.amount}}
				</div>
			</div>
		</div>

		<!--战斗结束-->
		<div v-if="isEnd" class="bz-pd-20rpx bz-t-c bz-f-b">
      <span>
        战斗结束->
      </span>
			<router-link to="/scene/map" class="bz-t-base">
				回到地图
			</router-link>
		</div>

	</BvView>
</template>

<script>
	export default {
		name: "fight-stage",
		data() {
			return {
				//地图数据
				fightData: {},
				//技能列表
				skillList: [],
				//背包消耗品
				knapsackConsume: []
			};
		},
		computed: {
			//是否战斗结束
			isEnd() {
				const fightData = this.fightData;
				const {my, enemy} = fightData;
				return ((my && my.currentHp === 0) || (enemy && enemy.currentHp === 0));
			}
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
					this.getSKillList();
					this.getKnapsackConsume();
				});
			},
			//获取战斗信息
			getFightInfo() {
				//获取战斗信息
				this.$axios.get(`/member/scene/fight/info`).then((res) => {
					const {data} = res;
					this.fightData = data;
				});
			},
			//获取技能列表
			getSKillList() {
				this.$axios.get(`/member/scene/skill/list`).then((res) => {
					const {data} = res;
					this.skillList = data;
				});
			},
			//获取背包的消耗品
			getKnapsackConsume() {
				this.$axios.get(`/member/scene/knapsack/resourceConsume`).then((res) => {
					const {data} = res;
					this.knapsackConsume = data;
				});
			},
			//使用技能
			useSkill(skill) {
				const {id} = skill;
				this.$axios.post(`/member/scene/skill/use`, {
					id
				}).then((res) => {
					const {data} = res;
					this.fightData = data;
				});
			},
			//使用消耗品
			useConsume(resource) {
				this.$axios.post(`/member/scene/knapsack/useConsume`, {
          id: resource.id
        }).then(()=>{
					this.getFightInfo();
					this.getKnapsackConsume();
				});
			}
		}
	}
</script>