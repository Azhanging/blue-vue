import upload from 'vue-upload-component';
import { hideLoading } from "../../use-in-vue/mint-ui/indicator";

export function useUpload(Vue) {
  Vue.component('Upload', upload);
}

//默认上传配置信息
const uploadConfig = {
  eventArgs: {
    newFile: null,
    oldFile: null
  },
  hooks: {
    success(res) {
    },
    error(res) {
    }
  }
};

function uploadError(opts) {
  const { type, maxCount } = opts;
  let info = '';
  switch (type) {
    case 'size':
      info = `文件过大，已移除文件`;
      break;
    case 'denied':
      info = `上传失败`;
      break;
    case 'timeout':
      info = `上传超时`
      break;
    case 'max-count':
      info = `文件最多可上传${maxCount}个`
      break;
  }
  return info;
}

//upload mixin
export function uploadMixin() {
  return {
    methods: {
      $upload(upload, _opts = {}) {

        const utils = this.$utils;

        //初始化数量
        if (upload.currentNum === undefined) {
          if (utils.isArray(upload.uploadData)) {
            upload.currentNum = upload.uploadData.length;
          } else if (upload.uploadData && utils.isStr(upload.uploadData)) {
            upload.currentNum = 1;
          } else {
            upload.currentNum = 0;
          }
        }

        const opts = utils.extend(uploadConfig, _opts);

        let { newFile, oldFile } = opts.eventArgs;

        //删除
        if(newFile !== undefined){
          this.$showLoading({
            text: '上传中...'
          });
        }

        //添加
        if (oldFile === undefined) {
          if (upload.currentNum >= upload.maximum) {
            upload.remove(newFile);
            hideLoading(true);
            return;
          } else {
            ++upload.currentNum;
          }
        }

        if (upload.tips == undefined) {
          upload.tips = true;
        }

        //上传错误
        if (newFile && newFile.error) {

          upload.remove(newFile);

          if (!upload.tips) return;

          upload.tips = false;

          this.$toast(uploadError({
            type: newFile.error,
            maxCount: opts.maxCount
          }));

          setTimeout(() => {
            upload.tips = true;
          }, 4000);

          upload.remove(newFile);

          --upload.currentNum;

          this.$hideLoading(true);

          utils.hook(this, opts.hooks.error);
        }

        if (newFile && newFile.success) {
          this.$hideLoading(true);
          const res = JSON.parse(newFile.response || "{}");
          if (res.info) {
            this.$toast({
              message: '上传失败!'
            });
            upload.remove(newFile);
            this.$hideLoading(true);
            --upload.currentNum;
          } else {
            this.$toast({
              message: '上传成功!'
            });
            utils.hook(this, opts.hooks.success, [res]);
          }
        }

        upload.active = true;

      },
      $removeFile(upload, index) {
        upload.files.splice(index, 1);
        --upload.currentNum;
      }
    }
  }
}