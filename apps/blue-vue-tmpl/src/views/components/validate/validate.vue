<template>
  <BvView :keep-alive="false">
    <BvHeader :center-control="{
      title:`验证相关`
    }"/>

    <form action="" class="ba-v-m">

      <div class="ba-pd-10">
        <span>textarea：</span>
        <textarea name="textarea" class="ba-input" cols="30" rows="10"
                  v-blue-validate="validate.textarea"
                  v-model="input"></textarea>
        <a @click="change">
          change
        </a>
      </div>

      <div class="ba-pd-10">
        <span>input-text：</span>
        <input type="text"
               name="text"
               class="ba-input"
               v-blue-validate="validate.text">
      </div>

      <div class="ba-pd-10 v-m">
        <span>radio：</span>
        <label>
          <input type="radio" v-blue-validate name="radio0" v-model="radio0" value="1">
          <span>radio1</span>
        </label>
        <label>
          <input type="radio" v-blue-validate name="radio0" v-model="radio0" value="2">
          <span>radio2</span>
        </label>
      </div>

      <div class="ba-pd-10">
        <span>checked：</span>
        <label>
          <input type="checkbox" v-blue-validate name="checkbox0" v-model="checkbox" value="1" id="checkbox"
                 class="ba-checkbox">
          <span>checkbox1</span>
        </label>
        <label>
          <input type="checkbox" v-blue-validate name="checkbox0" v-model="checkbox" value="2">
          <span>checkbox2</span>
        </label>
      </div>

      <div class="ba-pd-10">

        <span>select：</span>

        <span class="ba-select-down-icon">
					<select name="select0" class="ba-input" v-model="select">
						<option value="">请选择</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</span>

        <span class="ba-select-down-icon ba-mg-l-10">
					<select name="select1" v-blue-validate class="ba-input" v-model="select">
						<option value="">请选择</option>
						<option value="1">111111111111111111111111111111</option>
						<option value="2">2</option>
					</select>
				</span>

        <span class="ba-select-down-icon ba-mg-l-10">
					<select name="select2" v-blue-validate class="ba-input">
						<option value="">请选择</option>
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
				</span>

      </div>

      <div class="ba-pd-10">
        <input type="text" value="123" class="ba-input">
      </div>

      <div class="ba-pd-10">
        <input type="text" value="456" class="ba-input">
      </div>

    </form>

    <!-- 固定到底部提交按钮 -->
    <div class="ba-ps-f ba-row" style="left:0;bottom:0;" v-show="pageFixed">
      <button class="ba-btn ba-btn-success ba-w-100" style="padding-top:12px;padding-bottom:12px;" @click="submit">
        提交
      </button>
    </div>

  </BvView>
</template>

<script>

  import store from '@store';

  export default {
    name: "validate",
    data() {
      return {
        input: '',
        radio0: '',
        checkbox: [],
        select: '',
        validate: {
          textarea: {
            validate: [{
              exp: '*'
            }]
          },
          text: {
            validate: [{
              exp: (value) => {
                return {
                  message: '输入有误有问题',
                  status: value.length === 11
                };
              }
            }, {
              exp: 'm'
            }, {
              exp: /.+/,
              message: '不能为空不能为空不能为空不能为空不能为空不能为空'
            }]
          },
        }
      }
    },
    computed: {
      pageFixed() {
        return store.state.view.pageFixed;
      }
    },
    methods: {
      change() {
        const parent = this.$parent.$el;
        const form = parent.querySelectorAll('form')[0];
        this.input = `aaaaaaaaaaa`;
        this.radio0 = 1;
        this.checkbox = [1];
        this.select = 1;
        this.select = 1;
        this.$nextTick(() => {
          this.$validate(form);
        });
      },
      submit(event) {
        const parent = this.$el;
        const form = parent.querySelectorAll('form')[0];
        const result = this.$validate(form);
        if (result.status) {
          this.$axios.post('/aa', {
            data: 1
          }).then((result) => {
            console.log(result);
          });
        }
      },
      console(args) {
        console.log(args);
      }
    }
  };

</script>