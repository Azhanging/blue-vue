<!-- 添加社群 -->
<template>
	<bv-home-view :router-level="3">
		<bv-header :header="{title:{value:'添加社群'}}"/>
		<div class="bc-row">
			<!-- 微信群名称 -->
			<div class="bc-row bc-pd-15rp bc-bd-b-e5e">
				<div class="bc-flex">
					<div class="bc-t-999">
						微信群名称：
					</div>
					<div class="bc-flex-1">
						<input type="text" class="bc-bd-none" v-model="name">
					</div>
				</div>
			</div>

			<!-- 上传群二维码 -->
			<div class="bc-row bc-pd-15rp bc-bd-b-e5e">
				<div class="bc-row">
					<div class="bc-t-999">
						上传群二维码：
					</div>
					<div class="bc-row bc-mg-t-10rp">
						<span class="upload-img" v-for="(item,index) in imgs" :style="`background-image:url(${item});`">
							<i class="remove icon icon-close" @click="removeUpload($refs['imgs'],imgs,index)"></i>
						</span>
						<upload
							accept="image/png,image/gif,image/jpeg,image/webp"
							input-id="input0"
							ref="imgs"
							name="imgFile"
							post-action="/Upload/index_img"
							@input-file="inputFile"
							:multiple="true"
							:upload-data="imgs"
							:maximum="5"
							style="font-size:0;"
						>
							<span class="upload-img upload-img-add" v-show="imgs.length === 0"></span>
						</upload>
					</div>
				</div>
			</div>

			<!-- 说明 -->
			<div class="bc-row bc-pd-15rp">
				<div class="bc-flex">
					<div class="bc-t-999">
						说明：
					</div>
					<div class="bc-flex-1">
						<textarea type="text" v-model="intro" class="bc-bd-none bc-w-100" rows="5" placeholder="请添加说明"></textarea>
					</div>
				</div>
			</div>
		</div>

		<template slot="other">
			<div class="bc-row bc-pd-lr-20rp bc-pd-b-15rp bc-ps-f bc-bg-white" style="bottom:0;left:0;">
				<button
					type="button"
					@click="submit"
					class="bc-btn bc-btn-base bc-bd-radius-8 bc-w-100 join-btn bc-f-18rp"
				>
					添加
				</button>
			</div>
		</template>

	</bv-home-view>
</template>

<script>
	import { uploadMixin } from "$upload";

  export default {
    name: "association-add",
    mixins: [uploadMixin()],
    data() {
      return {
        imgs: [],
        name: '',
        intro: ''
      };
    },
    methods: {
      //删除上传的图片
      removeUpload(upload, lists, index) {
        lists.splice(index, 1);
      },
      //上传图片
      inputFile(newFile, oldFile, upload) {
        this.$upload(upload, {
          eventArgs: {
            newFile,
            oldFile
          },
          hooks: {
            success(res) {
              upload.uploadData.push(res.url);
            }
          }
        });
      },
      //提交
      submit() {
        let message = '';
        if (this.name.trim() === '') {
          message = '微信群名不能为空';
        } else if (this.imgs.length === 0) {
          message = '请添加二维码图';
        }
        if (message) {
          this.$toast({
            message
          });
        } else {
          this.$axios({
            url: '/member/association/add',
            method: 'post',
            data: {
              name: this.name,
              ercode: this.imgs[0],
              intro: this.intro
            }
          }).then((res) => {
            const { data } = res.data;
            if (data.status == 0) {
              this.$toast({
                message: data.message
              });
            } else {
              this.$router.push(`/member/creator/association`);
            }
          });
        }
      }
    }
  }
</script>

<style scoped lang="scss">
	//上传图片
	.upload-img {
		position: relative;
		display: inline-block;
		background-repeat: no-repeat;
		background-size: 100%;
		background-position: center;
		font-size: 0;
		width: rem(98);
		height: rem(98);
		&.upload-img-add {
			background: url($base-static-path + '/img//home/upload.png') no-repeat center #EDEDED;
			background-size: 20%;
		}
		.remove {
			position: absolute;
			right: 0;
			top: 0;
			background-color: rgba(0, 0, 0, .4);
			color: white;
			padding: rem(2);
			font-size: rem(18);
		}
	}

	//加入按钮
	.join-btn {
		padding-top: rem(14) !important;
		padding-bottom: rem(14) !important;
		font-size: rem(18);
	}

</style>