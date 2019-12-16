<!-- 战斗舞台 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: `战斗场景`
    }"/>

    <div class="bc-flex bc-pd-10rp bc-f-b bc-bd-b-e5e" v-if="fightData.enemy">
      <div class="bc-pd-r-14rp">
        {{fightData.enemy.name}}
      </div>
      <div class="bc-flex-1 bc-t-primary">
        HP:{{fightData.enemy.currentHp}}/{{fightData.enemy.hp}}
        <template v-if="fightData.enemy.harm">
          <span class="bc-t-red">(-{{fightData.enemy.harm}})</span>
        </template>
      </div>
    </div>

    <div class="bc-flex bc-pd-10rp bc-f-b bc-bd-b-e5e" v-if="fightData.enemy">
      <div class="bc-pd-r-14rp">
        {{$store.state.roleInfo.name}}
      </div>
      <div class="bc-flex-1 bc-t-primary">
        HP:{{fightData.my.currentHp}}/{{fightData.my.hp}}
        <template v-if="fightData.my.harm">
          <span class="bc-t-red">(-{{fightData.my.harm}})</span>
        </template>
      </div>
      <div class="bc-flex-1 bc-t-primary">
        MP:{{fightData.my.currentMp}}/{{fightData.my.mp}}
      </div>
    </div>

    <!-- 技能 -->
    <div class="bc-flex bc-pd-10rp bc-f-b bc-bd-b-e5e" v-if="fightData.enemy && !isEnd">
      <div>技能：</div>
      <div class="bc-flex-1">
        <a href="javascript:;" v-for="item in skillList" :key="item.id" class="bc-t-base bc-mg-r-10rp"
           @click="useSkill(item)">
          {{item.name}}
        </a>
      </div>
    </div>

    <div class="bc-flex bc-pd-10rp bc-bd-b-e5e bc-f-b" v-if="fightData.reward && fightData.reward.length > 0">
      <div>奖励：</div>
      <div class="bc-flex-1 bc-t-primary">
        <div class="bc-pd-b-2rp" v-for="reward in fightData.reward">
          {{reward.name}} x{{reward.amount}}
        </div>
      </div>
    </div>

    <!--战斗结束-->
    <div v-if="isEnd" class="bc-pd-10rp bc-t-c bc-f-b">
      <span>
        战斗结束->
      </span>
      <router-link to="/scene/map" class="bc-t-base">
        回到地图
      </router-link>
    </div>

  </BvLayoutView>
</template>

<script>
  export default {
    name: "fight-stage",
    data() {
      return {
        //地图数据
        fightData: {},
        //技能列表
        skillList: []
      };
    },
    computed: {
      //是否战斗结束
      isEnd() {
        const fightData = this.fightData;
        const { my, enemy } = fightData;
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
        });
      },
      //获取战斗信息
      getFightInfo() {
        //获取战斗信息
        this.$axios.get(`/member/scene/fight/info`).then((res) => {
          const { data } = res;
          this.fightData = data;
        });
      },
      //获取技能列表
      getSKillList() {
        this.$axios.get(`/member/scene/skill/list`).then((res) => {
          const { data } = res;
          this.skillList = data;
        });
      },
      //使用技能
      useSkill(skill) {
        const { id } = skill;
        this.$axios.post(`/member/scene/skill/use`, {
          id
        }).then((res) => {
          const { data } = res;
          this.fightData = data;
        });
      }
    }
  }
</script>