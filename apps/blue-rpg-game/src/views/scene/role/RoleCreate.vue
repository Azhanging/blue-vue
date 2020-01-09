<template>
  <BvView>
    <BvHeader :center-control="{
      title: `创建角色`
    }"/>
    <div class="bc-row bc-pd-lr-14rpx">
      <form ref="form">
        <div class="bc-mg-t-14rpx">
          <label class="bc-flex bc-flex-ai-c">
            <span>昵称：</span>
            <input type="text" name="email" v-model="form.name" class="bc-input"
                   v-blue-validate="validate.name"/>
          </label>
        </div>
        <div class="bc-mg-t-16rpx">
          <label class="bc-flex bc-flex-ai-c">
            <span>简介：</span>
            <input type="text" name="description" v-model="form.description" class="bc-input"/>
          </label>
        </div>
        <div class="bc-mg-t-16rpx">
          <label class="bc-flex bc-flex-ai-c">
            <span>职业：</span>
            <SelectToApi api="/member/scene/occupation/list" v-model="form.occupationId" name="occupationId"
                         v-blue-validate="validate.occupationId"/>
          </label>
        </div>
        <div class="bc-mg-t-16rpx bc-t-c">
          <button type="button" class="bc-btn bc-btn-base" @click="create">
            创建角色
          </button>
        </div>
      </form>
    </div>
  </BvView>
</template>

<script>

  function getValidate() {
    return {
      name: {
        validate: [{
          exp: /.+/,
          message: '用户名输入有误'
        }]
      },
      occupationId: {
        validate: [{
          exp: /.+/,
          message: '请选择职业'
        }]
      }
    }
  }

  function getForm() {
    return {
      name: '',
      description: '',
      occupationId: ''
    };
  }

  export default {
    name: "role-create",
    data() {
      return {
        form: getForm(),
        validate: getValidate()
      };
    },
    methods: {
      //创建角色
      create() {
        const validated = this.$validate(this.$refs['form']);
        validated.status && this.$axios.post(`/member/scene/role/create`, this.form).then(() => {
          this.$router.$goBack();
        });
      }
    }
  }
</script>