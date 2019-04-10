<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "问题反馈"
            }
        }'
		>
		</w-home-header>

		<div class="contribute">
			<div class="contribute-title">您学习中遇到的问题（必填）</div>

			<div class="contribute-content">
				<div class="contribute-tet">
					<textarea placeholder="感谢您对点通宝平台的支持" ref="question"></textarea>
				</div>
			</div>
			<div class="contribute-prompt">您的问题，我们会尽快解决，如急需帮助，请联系我们的在线客
				服哦~</div>

			<div class="contribute-btn">
				<button @click="btn_Learning_problems">提交问题</button>
			</div>

		</div>

	</bv-home-view>
</template>

<script>
	import store from '@store'
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "contribute",
		methods: {
			btn_Learning_problems() {
				if(this.$refs.question.value==''){
					$toast({
						message: '问题不能为空',
						duration: 3000
					});
					return;
				}
				//console.log(this.$refs.question.value)
				this.$axios.post('/api/feedback/learn',{
					question:this.$refs.question.value,//问题
					//member_id:store.state.userInfo.id,//会员id
					//phone:store.state.userInfo.id,//联系方式
				}).then(res=>{
					if(res.data.code==200){
						$toast({
							message: '反馈成功',
							duration: 3000
						});
						this.$refs.question.value=''
						return;
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.contribute{
		overflow: hidden;
		.contribute-title{
			padding: rem(15);
			color: #666;
			font-size: rem(14);
		}
		.contribute-content{
			background: #fff;
			padding: rem(15);
			.contribute-tet{
				textarea{
					width: 100%;
					border: 0;
					font-size: rem(14);
					color: #666;
					outline: none;
					height: rem(80);
				}
			}
			.contribute-imgbox{
				overflow: hidden;
				.contribute-imgbox-item{
					width: rem(50);
					height: rem(50);
					overflow: hidden;
					border-radius: rem(5);
					float: left;
					margin-right: rem(10);
					img{width: 100%;min-height: 100%;vertical-align: top;}
				}
			}
		}
		.contribute-prompt{
			font-size: rem(12);
			color: #999;
			padding: rem(10) rem(15);
		}
		.contribute-btn{
			overflow: hidden;
			margin-top: rem(100);
			padding: 0 rem(15);
			button{
				display: block;
				background: #CA9F75;
				width: 100%;
				height: rem(50);
				color: #fff;
				font-size: rem(16);
				border-radius: rem(5);
			}
		}
	}
</style>
