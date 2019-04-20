<template>
	<bv-home-view :router-level="2">
		<bv-header :header="{title:{value:'上传图片'}}"/>
		<div class="bc-pd-10">
			<div class="bc-row">
				<div class="bc-pd-b-5">单个</div>
				<div class="bc-row">
					<span v-for="(img,index) in uploadImg">
						<img :src="img" alt="" width="50" height="50">
						<a @click="removeUpload($refs['oneUpload'],uploadImg,index)">删除</a>
					</span>
				</div>
				<div>
					<upload
						accept="image/png,image/gif,image/jpeg,image/webp"
						ref="oneUpload"
						input-id="input"
						name="imgFile"
						post-action="/Upload/index_img"
						@input-file="inputOneFile"
						:upload-data="uploadImg"
					>
						<button class="bc-btn bc-btn-primary bc-bd-radius-4">
							单张图片
						</button>
					</upload>
				</div>
			</div>

			<div class="bc-row">
				<div class="bc-pd-b-5">多个</div>
				<div>

					<div class="bc-row">
					<span v-for="(img,index) in uploadImgs">
						<img :src="img" alt="" width="50" height="50">
						<a @click="removeUpload($refs['upload'],uploadImgs,index)">删除</a>
					</span>
					</div>

					<upload
						:multiple="true"
						accept="image/png,image/gif,image/jpeg,image/webp"
						ref="upload"
						input-id="inputs"
						name="imgFile"
						post-action="/Upload/index_img"
						@input-file="inputFile"
						:maximum="5"
						:upload-data="uploadImgs"
					>
						<button class="bc-btn bc-btn-primary">上传图片</button>
					</upload>
				</div>
			</div>
		</div>
	</bv-home-view>
</template>

<script>

	import { uploadMixin } from "$upload";

  export default {
    name: "vue-upload-componet",
    mixins: [uploadMixin()],
    data() {
      return {
        uploadImg: [],
        uploadImgs: []
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
              upload.uploadData.push(res.url);
            }
          }
        });
      },
      inputOneFile(newFile, oldFile, upload) {
        this.$upload(upload, {
          eventArgs: {
            newFile,
            oldFile
          },
          hooks: {
            success(res) {
              upload.uploadData.splice(0, 1, res.url);
            }
          }
        });
      },
      removeUpload(upload, lists, index) {
        this.$removeFile(upload,index);
        lists.splice(index, 1);
      }
    }
  }
</script>