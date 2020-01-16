<template>
  <BvView>
    <BvHeader :center-control="{
      title: `创建角色`
    }"/>
    <div class="bz-row bz-pd-lr-28rpx">
      <form ref="form">
        <div class="bz-mg-t-28rpx">
          <label class="bz-flex bz-flex-ai-c">
            <span>昵称：</span>
            <input type="text" name="email" v-model="form.name" class="bz-input"
                   v-blue-validate="validate.name"/>
          </label>
        </div>
        <div class="bz-mg-t-32rpx">
          <label class="bz-flex bz-flex-ai-c">
            <span>简介：</span>
            <input type="text" name="description" v-model="form.description" class="bz-input"/>
          </label>
        </div>
        <div class="bz-mg-t-32rpx">
          <label class="bz-flex bz-flex-ai-c">
            <span>职业：</span>
            <SelectToApi api="/member/scene/occupation/list" v-model="form.occupationId" name="occupationId"
                         v-blue-validate="validate.occupationId"/>
          </label>
        </div>
        <div class="bz-mg-t-32rpx bz-t-c">
          <button type="button" class="bz-btn bz-btn-base" @click="create">
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