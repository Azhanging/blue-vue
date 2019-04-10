<template>
	<bv-home-view class='wap' :router-level='3' style="background: #ededed;">

		<w-home-header :header='{
            title:{
                value: "提交问题"
            }
        }'></w-home-header>

		<div class="Submit-questions">
			<h3>选择问题分类</h3>
			<div>
				<select id="btnSelect" ref="btnSelect">
					<option v-for="item in classify" :value="item.id">
						{{ item.name }}
					</option>
				</select>
				<label for="btnSelect"><i class="iconfont iconxiangxia1"></i></label>
			</div>
			<h3>您要提问的内容（必填）</h3>
			<div>
				<textarea placeholder="输入内容" ref="question"></textarea>
			</div>
			<p>您的问题，我们收到后会尽快处理。</p>
			<input type="button" value="提交" @click="Submit_questions" class="Submit-sub">
		</div>


	</bv-home-view>
</template>

<script>
	import Index from "../question-answer";
	import store from '@store'
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "questions",
		components: {Index},
		data() {
			return {
				classify:[],
			}
		},
		methods: {
			classifySet() {
				return this.$axios.get('/api/feedback/cate',{
				}).then((res)=>{
					console.log(res)
					this.classify = res.data.data;
				}).catch((err)=>{
					console.log(err);
				})
			},

			Submit_questions() {
				if(this.$refs.question.value==''){
					$toast({
						message: '提问内容不能为空',
						duration: 3000
					});
					return;
				}
				//console.log(this.$refs.question.value)
				this.$axios.post('/api/feedback/question',{
					cate_id:this.$refs.btnSelect.value,//分类id
					question:this.$refs.question.value,//问题
					//phone:store.state.userInfo.id,//联系方式
				}).then((res)=>{
					console.log(res+'111')
					if(res.data.code==200){
						$toast({
							message: '提交成功',
							duration: 3000
						});
						this.$refs.question.value=''
						return;
					}
				});

			}
		},
		mounted(){
			this.classifySet();
		}
	}
</script>

<style scoped lang="scss">
	.Submit-questions {
		h3, p {
			margin: 0;
			padding: 0;
		}

		h3 {
			padding: rem(10) rem(15);
			font-size: rem(14);
			color: #999;
			font-weight: normal;
		}

		p {
			padding: rem(10) rem(15);
			font-size: rem(12);
			color: #a5a5a5;
			font-weight: normal;
		}

		div {
			background: #fff;
			padding: rem(15);
			position: relative;

			select {
				border: 0;
				width: 100%;
				font-size: rem(16);
				color: #333;
			}

			label {
				position: absolute;
				right: rem(20);
				top: 30%;
			}

			textarea {
				width: 100%;
				border: 0;
				font-size: rem(16);
				color: #333;
				outline: none;
			}
		}

		.Submit-sub {
			margin: 0 5%;
			width: 90%;
			box-sizing: border-box;
			border: 0;
			height: rem(45);
			background: rgba(202, 159, 117, 1);
			border-radius: rem(4);
			color: #fff;
			font-size: rem(18);
			font-weight: bold;
		}
	}
</style>
