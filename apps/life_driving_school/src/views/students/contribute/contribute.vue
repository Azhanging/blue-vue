<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "我要投稿"
            }
        }'
		>
		</w-home-header>

		<div class="contribute">
			<div class="contribute-title">解释说明</div>
			<div class="contribute-txt">
				<input type="text" placeholder="标题" v-model="contribute[0].question">
			</div>
			<div class="contribute-content">
				<div class="contribute-tet">
					<textarea placeholder="内容" v-model="contribute[0].content"></textarea>
				</div>
				<div class="contribute-imgbox">

					<div class="contribute-imgbox-item" v-if="uploadImgs.length>0">
						<span v-for="(img,index) in uploadImgs">
							<img :src="img.url"/>
							<a @click="removeUpload($refs['upload'],uploadImgs,index)" class="icon-close iconfont iconiconfontclose"></a>
						</span>
					</div>

					<upload
						:multiple="true"
						accept="image/png,image/gif,image/jpeg,image/webp"
						ref="upload"
						input-id="inputs"
						name="imgFile"
						post-action="/api/upload/index"
						@input-file="inputFile"
						:maximum="5"
						:upload-data="uploadImgs"
					>
						<button class="contribute-imgbox-btn">
							<i class="iconfont iconxiangji"></i>
						</button>
					</upload>

				</div>



			</div>

			<div class="contribute-btn">
				<button @click="btn_fabu">发布</button>
			</div>

		</div>

	</bv-home-view>
</template>

<script>
	import { uploadMixin } from "$upload";
	import store from '@store';
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "contribute",
		mixins: [uploadMixin()],
		data() {
			return {
				uploadImgs: [],
				contribute: [
					{
						question:'',
						content:'',
					}
				],
			}
		},
		methods: {
			inputFile(newFile, oldFile, upload) {
				this.$upload(upload, {
					eventArgs: {
						newFile,
						oldFile
					},
					hooks: {
						success(res) {
							console.log(res.data)
							this.$removeFile(upload);
							upload.uploadData.push(res.data);
						}
					}
				});
			},
			removeUpload(upload, lists, index) {
				lists.splice(index, 1);
			},

			btn_fabu() {
				if(this.contribute[0].question==''){
					$toast({
						message: '标题不能为空',
						duration: 3000
					});
					return;
				}
				if(this.contribute[0].content==''){
					$toast({
						message: '内容不能为空',
						duration: 3000
					});
					return;
				}
				this.$axios.post('/api/feedback/submission',{
					question:this.contribute[0].question,//标题
					content:this.contribute[0].content,//内容
					//member_id:store.state.userInfo.id,//会员id
					//phone:store.state.userInfo.id,//联系方式
				}).then(res=>{
					if(res.data.code==200){
						$toast({
							message: '投稿成功',
							duration: 3000
						});
						this.contribute[0].question=''
						this.contribute[0].content=''
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
	.contribute-txt{
		background: #fff;
		padding: 0 rem(15);
		input[type="text"]{
			width: 100%;
			border: 0;
			height: rem(45);
			font-size: rem(14);
			color: #666;
		}
	}
	.contribute-content{
		background: #fff;
		padding: rem(15);
		margin-top: rem(10);
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
				position: relative;
				img{width: 100%;min-height: 100%;vertical-align: top;}
				.icon-close{
					position: absolute;
					right: 2px;
					top:0;
					color: #f5f5f5;
				}
			}
			.contribute-imgbox-btn{
				width: rem(50);
				height: rem(50);
				overflow: hidden;
				border-radius: rem(5);
				float: left;
				background: #e5e5e5;
				position: relative;
				text-align: center;
				line-height: rem(50);
				i{
					color: #fff;
					font-size: rem(20);
				}

			}
		}
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
