<template>
  <BvView>
    <BvHeader :center-control="{
      title: `注册`
    }"/>
    <div class="ba-t-c">
      <form ref="form">
        <div class="ba-mg-t-32rpx">
          <label>
            账号：<input type="text" name="email" v-model="form.username" class="ba-input"
                      v-blue-validate="validate.username"/>
          </label>
        </div>
        <div class="ba-mg-t-32rpx">
          <label>
            邮箱：<input type="text" name="email" v-model="form.email" class="ba-input" v-blue-validate="validate.email"/>
          </label>
        </div>
        <div class="ba-mg-t-32rpx">
          <label>
            密码：<input type="password" name="password" v-model="form.password" class="ba-input"
                      v-blue-validate="validate.password"/>
          </label>
        </div>
        <div class="ba-mg-t-32rpx">
          <button type="button" class="ba-btn ba-btn-base" @click="register">
            注册
          </button>
        </div>
      </form>
    </div>
  </BvView>
</template>

<script>

  function getValidate() {
    return {
      username: {
        validate: [{
          exp: /.+/,
          message: '用户名输入有误'
        }]
      },
      email: {
        validate: [{
          exp: /.+/,
          message: '邮箱输入有误'
        }]
      },
      password: {
        validate: [{
          exp: /.+/,
          message: '密码输入有误'
        }]
      }
    }
  }

  function getForm() {
    return {
      username: '',
      email: '',
      password: '',
      type: 'member'
    };
  }

  export default {
    name: "register",
    data() {
      return {
        form: getForm(),
        validate: getValidate()
      };
    },
    methods: {
      register() {
        const validated = this.$validate(this.$refs['form']);
        validated.status && this.$axios.post(`/member/register`, this.form).then(() => {
          this.$router.$goBack();
        });
      }
    }
  }
</script>