<!-- NPC信息 -->
<template>
	<BvView>
		<BvHeader :center-control="{
      title: `资源`
    }"/>

		<div class="bc-pd-14rpx bc-f-b bc-bd-b-e5e">
			资源名称：{{resourceData.name}}
		</div>

		<div class="bc-pd-14rpx bc-f-b bc-bd-b-e5e">
			资源简介：{{resourceData.description}}
		</div>

		<div class="bc-pd-12rpx bc-f-b bc-bd-b-e5e">
			<div class="bc-pd-tb-2rpx">
				属性：
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.type === 3">
				适用职业：{{resourceData.occupationName}}
			</div>

			<div class="bc-pd-tb-2rpx">
				售价：{{resourceData.price}}
			</div>

			<div class="bc-pd-tb-2rpx">
				出售价：{{resourceData.marketPrice}}
			</div>

			<div class="bc-pd-tb-2rpx">
				时效类型：{{resourceData.durationTypeText}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.durationType === 3">
				时效：{{resourceData.duration}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.hp">
				hp：{{resourceData.hp}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.mp">
				mp：{{resourceData.mp}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.exp">
				exp：{{resourceData.exp}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.physicalAttack">
				物理攻击：{{resourceData.physicalAttack}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.physicalDefense">
				物理防御：{{resourceData.physicalDefense}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.magicAttack">
				法术攻击：{{resourceData.magicAttack}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.magicDefense">
				法术防御：{{resourceData.magicDefense}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.crit">
				暴击率:{{resourceData.crit}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.hit">
				命中率:{{resourceData.hit}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.dodge">
				闪避率:{{resourceData.dodge}}
			</div>

			<div class="bc-pd-tb-2rpx" v-if="resourceData.critResistance">
				暴抗率:{{resourceData.critResistance}}
			</div>

		</div>

	</BvView>
</template>

<script>
	export default {
		name: "resource-info",
		data() {
			return {
				//地图数据
				resourceData: {}
			};
		},
		created() {
			//获取角色列表
			this.getResourceData();
		},
		methods: {
			//获取地图信息
			getResourceData() {
				const {id} = this.$route.query;
				this.$axios.get(`/member/scene/resource/info`, {
					params: {
						id
					}
				}).then((res) => {
					const {data} = res;
					this.resourceData = data;
				});
			}
		}
	}
</script>