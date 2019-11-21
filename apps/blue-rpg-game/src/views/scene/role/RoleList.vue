<!-- 角色列表 -->
<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title: `角色列表`
    }"/>
    <div class="bc-pd-14rp bc-bd-b-e5e">
      <div class="bc-t-primary bc-f-b">
        用户：{{userInfo.username}}
      </div>
    </div>
    <div class="bc-pd-14rp">
      请选择角色：
      <template v-if="roleList.length > 0">
        <ul class="bc-reset-ul bc-t-c">
          <li class="bc-pd-tb-6rp">
            <a href="javascript:;" class="bc-t-primary bc-flex bc-flex-jc-c bc-flex-ai-c"
               v-for="(item,index) in roleList" :key="index">
              <div class="bc-flex-1">
                {{item.name}}
              </div>
              <div class="bc-flex-1">
                {{`Level:${item.level}`}}
              </div>
              <div class="bc-flex-1">
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
    <div class="bc-t-c" v-if="roleList.length < 3">
      <router-link to="/scene/role/create" class="bc-btn bc-btn-primary">
        创建角色
      </router-link>
    </div>
  </BvLayoutView>
</template>

<script>
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
    },
    methods: {
      //获取角色列表
      getRoleList() {
        this.$axios.get(`/member/scene/role/list`).then((res) => {
          const { data } = res;
          this.roleList = data.list;
        });
      }
    }
  }
</script>