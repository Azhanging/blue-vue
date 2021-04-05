<template>
  <BvView>
    <BvHeader :center-control="{
      title: `登录`
    }"/>
    <div class="ba-t-c">
      <form ref="form">
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
          <button type="button" class="ba-btn ba-btn-base" @click="login">
            登录
          </button>
          <button type="button" class="ba-btn" @click="$router.push('/register')">
            注册
          </button>
        </div>
      </form>
    </div>
  </BvView>
</template>

<script>

  import { apiLoginIn } from '$api';

  function getValidate() {
    return {
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
      email: '',
      password: '',
      type: 'member'
    };
  }

  export default {
    name: "login",
    data() {
      return {
        form: getForm(),
        validate: getValidate()
      };
    },
    methods: {
      login() {
        const validated = this.$validate(this.$refs['form']);
        validated.status && apiLoginIn({
          method: 'post',
          data: this.form
        }).then(() => {
          this.$router.replace('/scene/zone/entry');
        });
      }
    }
  }
</script>