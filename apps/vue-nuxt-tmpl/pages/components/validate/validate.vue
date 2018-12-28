<template>
	<div class="row">

		<form action="" @submit="submit" class="v-m" id="form">

			<div class="pd-10">
				<span>textarea:</span><textarea name="textarea" class="g-input" id="" cols="30" rows="10" v-blue-validate="valid" v-model="input"></textarea>
				<a @click="change">
					change
				</a>
			</div>

			<div class="pd-10">
				<span>input-text:</span><input type="text" name="text" class="g-input"
				                               v-blue-validate="{validate:[{type:()=>textValidate(input)},{type:'m'},{type:/.+/,info:'不能为空不能为空不能为空不能为空不能为空不能为空'}],name:'文本框'}">
			</div>

			<div class="pd-10 v-m">
				<span>radio:</span>
				<label>
					<input type="radio" v-blue-validate name="radio0" v-model="radio0" value="1">
					<span>radio1</span>
				</label>
				<label>
					<input type="radio" v-blue-validate name="radio0" v-model="radio0" value="2">
					<span>radio2</span>
				</label>
			</div>

			<div class="pd-10">
				<span>checked:</span>
				<label>
					<input type="checkbox" v-blue-validate name="checkbox0" v-model="checkbox" value="1">
					<span>checkbox1</span>
				</label>
				<label>
					<input type="checkbox" v-blue-validate name="checkbox0" v-model="checkbox" value="2">
					<span>checkbox2</span>
				</label>
			</div>

			<div class="pd-10">

				<span>select:</span>

				<select name="select0" v-blue-validate="{validated:function(args){console(args)}}" class="g-input" v-model="select">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>

				<select name="select1" v-blue-validate class="g-input" v-model="select">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>

				<select name="select2" v-blue-validate class="g-input">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>

				<select name="select3" v-blue-validate class="g-input">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
				<select name="select4" v-blue-validate class="g-input">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>

				<select name="select5" v-blue-validate class="g-input">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>
				<select name="select6" v-blue-validate class="g-input">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>

				<select name="select1" v-blue-validate class="g-input">
					<option value="">请选择</option>
					<option value="1">1</option>
					<option value="2">2</option>
				</select>

			</div>
			<div class="pd-10">
				<input type="text" value="123" class="g-input">
			</div>
			<div class="pd-10">
				<input type="text" value="456" class="g-input">
			</div>

			<div class="pd-10">
				<button class="g-btn g-btn-success">提交</button>
			</div>

		</form>
	</div>
</template>

<script>
export default {
  name: "validate",
  data() {
    return {
      input: '',
      radio0: '',
      checkbox: '',
      select: '',
      valid: {
        validate: [{ type: '*' }]
      }
    }
  },
  methods: {
    change() {
      this.input = `aaaaaaaaaaa`;
      this.radio0 = 1;
      this.checkbox = [1];
      this.select = 1;
      this.$nextTick(()=>{
        this.$validate(document.querySelector('#form'));
      });
      //this.valid = { validate: [] };
    },
    textValidate(data) {
      return {
        info: '输入有误有问题',
        status: data.length === 11
      };
    },
    submit($event) {
      const result = this.$validate($event);
      if(!result.status){
        event.preventDefault();
      }
      console.log(result);
    },
	  console(args){
      console.log(args);
	  }
  }
}
</script>