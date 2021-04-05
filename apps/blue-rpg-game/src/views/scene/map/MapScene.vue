<!-- 地图场景 -->
<template>
	<BvView>
		<BvHeader :center-control="{
      title: mapData.name
    }"/>

		<div class="ba-pd-28rpx ba-f-b ba-bd-b-e5e">
			地图简介：{{mapData.description}}
		</div>

		<div class="ba-flex ba-pd-28rpx ba-f-b ba-bd-b-e5e" v-if="mapData.map && mapData.map.length > 0">
			<div>周边：</div>
			<div class="ba-flex-10">
				<router-link :to="`/scene/map?id=${item.id}`" v-for="(item) in mapData.map" :key="item.id"
				             class="ba-t-base ba-mg-r-20rpx">
					{{item.name}}
				</router-link>
			</div>
		</div>

		<div class="ba-flex ba-pd-28rpx ba-f-b ba-bd-b-e5e" v-if="mapData.npc && mapData.npc.length > 0">
			<div>NPC：</div>
			<div class="ba-flex-10">
				<router-link :to="`/scene/npc/info?id=${item.id}`" v-for="(item) in mapData.npc" :key="item.id"
				             class="ba-t-base ba-mg-r-20rpx">
					<!-- NPC任务状态 -->
					<template v-for="status in item.taskStatus">
						<span class="ba-t-warning" v-if="status === 0">? </span>
						<span class="ba-t-999" v-if="status === 1">! </span>
						<span class="ba-t-warning" v-if="status === 2">! </span>
					</template>

					<span>{{item.name}}</span>
				</router-link>
			</div>
		</div>

		<div class="ba-flex ba-pd-28rpx ba-f-b ba-bd-b-e5e" v-if="mapData.monster && mapData.monster.length > 0">
			<div>怪物：</div>
			<div class="ba-flex-10">
				<a href="javascript:;" @click="entryFight({
					path: `/scene/fight/stage`,
					query:{
						id:item.id,
						type:1
					}
				})" v-for="item in mapData.monster" :key="item.id" class="ba-t-base">
					{{item.name}}
				</a>
			</div>
		</div>

	</BvView>
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
				const {query} = this.$route;
				this.$axios.get(`/member/scene/map/go`, {
					params: query
				}).then((res) => {
					const {data} = res;
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