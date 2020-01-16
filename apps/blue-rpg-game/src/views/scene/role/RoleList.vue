<!-- 角色列表 -->
<template>
  <BvView>
    <BvHeader :center-control="{
      title: `角色列表`
    }"/>
    <div class="bz-pd-28rpx bz-bd-b-e5e">
      <div class="bz-t-base bz-f-b">
        用户：{{userInfo.username}}
      </div>
    </div>
    <div class="bz-pd-28rpx">
      请选择角色：
      <template v-if="roleList.length > 0">
        <ul class="bz-reset-ul bz-t-c">
          <li class="bz-pd-tb-6rpx">
            <a href="javascript:;" class="bz-t-base bz-flex bz-flex-jc-c bz-flex-ai-c"
               v-for="(item,index) in roleList" :key="index" @click="useRole(item)">
              <div class="bz-flex-1">
                {{item.name}}
              </div>
              <div class="bz-flex-1">
                {{`Level:${item.level}`}}
              </div>
              <div class="bz-flex-1">
                {{`职业:${item.occupationName}`}}
              </div>
            </a>
          </li>
        </ul>
      </template>
      <template v-else>
        无
      </template>
    </div>
    <div class="bz-t-c" v-if="roleList.length < 3">
      <router-link to="/scene/role/create" class="bz-btn bz-btn-base">
        创建角色
      </router-link>
    </div>
  </BvView>
</template>

<script>

  import user from '$assets/js/user';
  import { apiRoleList, apiRoleInfo } from '@api';

  export default {
    name: "role-list",
    computed: {
      userInfo() {
        return this.$store.state.userInfo;
      }
    },
    data() {
      return {
        //角色列表
        roleList: []
      };
    },
    created() {
      //获取角色列表
      this.getRoleList();
      //获取用户信息
      user();
    },
    methods: {
      //获取角色列表
      getRoleList() {
        const { query } = this.$route;
        return this.$axios.get(`/member/scene/role/list`, {
          params: {
            zoneId: query.zoneId
          }
        }).then((res) => {
          const { data } = res;
          this.roleList = data.list;
        });
      },
      //使用角色
      useRole(item) {
        apiRoleInfo({
          secretKey: item.secretKey
        }).then(() => {
          this.$router.replace({
            path: `/scene/map`,
            query: {
              id: item.mapId
            }
          });
        });
      }
    }
  }
</script>