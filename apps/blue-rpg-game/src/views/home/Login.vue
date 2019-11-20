<template>
  <BvLayoutView>
    <BvHeader :center-control="{
      title:`登录`
    }"/>
    <div class="bc-t-c">
      <form ref="form">
        <div class="bc-mg-t-16rp">
          <label>
            账号：<input type="text" name="username" class="bc-input" v-blue-validate="validate.username"/>
          </label>
        </div>
        <div class="bc-mg-t-16rp">
          <label>
            密码：<input type="password" name="password" class="bc-input" v-blue-validate="validate.password"/>
          </label>
        </div>
        <div class="bc-mg-t-16rp">
          <button type="button" class="bc-btn bc-btn-primary" @click="login">
            登录
          </button>
          <button type="button" class="bc-btn">
            注册
          </button>
        </div>
      </form>
    </div>
  </BvLayoutView>
</template>

<script>

  import { apiLoginIn } from '$api';

  export default {
    name: "login",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        validate: {
          username: {
            validate: [{
              exp: /.+/,
              message: '账号输入有误'
            }]
          },
          password: {
            validate: [{
              exp: /.+/,
              message: '密码输入有误'
            }]
          }
        }
      };
    },
    methods: {
      login() {
        const validated = this.$validate(this.$refs['form']);
        validated.status && this.$axios.post(``, this.form).then(() => {

        });
      }
    }
  }
</script>