(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-10"],{3022:function(t,i,a){"use strict";a.r(i);var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("bv-home-view",{attrs:{"router-level":2}},[a("bv-header",{attrs:{header:{title:{value:"上传图片"}}}}),a("div",{staticClass:"bc-pd-10"},[a("div",{staticClass:"bc-row"},[a("div",{staticClass:"bc-pd-b-5"},[t._v("单个")]),a("div",{staticClass:"bc-row"},t._l(t.uploadImg,function(i,e){return a("span",[a("img",{attrs:{src:i,alt:"",width:"50",height:"50"}}),a("a",{on:{click:function(i){t.removeUpload(t.$refs["oneUpload"],t.uploadImg,e)}}},[t._v("删除")])])})),a("div",[a("upload",{ref:"oneUpload",attrs:{accept:"image/png,image/gif,image/jpeg,image/webp","input-id":"input",name:"imgFile","post-action":"/Upload/index_img","upload-data":t.uploadImg},on:{"input-file":t.inputOneFile}},[a("button",{staticClass:"bc-btn bc-btn-primary bc-bd-radius-4"},[t._v("\n\t\t\t\t\t\t单张图片\n\t\t\t\t\t")])])],1)]),a("div",{staticClass:"bc-row"},[a("div",{staticClass:"bc-pd-b-5"},[t._v("多个")]),a("div",[a("div",{staticClass:"bc-row"},t._l(t.uploadImgs,function(i,e){return a("span",[a("img",{attrs:{src:i,alt:"",width:"50",height:"50"}}),a("a",{on:{click:function(i){t.removeUpload(t.$refs["upload"],t.uploadImgs,e)}}},[t._v("删除")])])})),a("upload",{ref:"upload",attrs:{multiple:!0,accept:"image/png,image/gif,image/jpeg,image/webp","input-id":"inputs",name:"imgFile","post-action":"/Upload/index_img",maximum:5,"upload-data":t.uploadImgs},on:{"input-file":t.inputFile}},[a("button",{staticClass:"bc-btn bc-btn-primary"},[t._v("上传图片")])])],1)])])],1)},n=[],o=a("8d26"),l={name:"vue-upload-componet",mixins:[Object(o["a"])()],data:function(){return{uploadImg:[],uploadImgs:[]}},methods:{inputFile:function(t,i,a){this.$upload(a,{eventArgs:{newFile:t,oldFile:i},hooks:{success:function(t){a.uploadData.push(t.url)}}})},inputOneFile:function(t,i,a){this.$upload(a,{eventArgs:{newFile:t,oldFile:i},hooks:{success:function(t){a.uploadData.splice(0,1,t.url)}}})},removeUpload:function(t,i,a){this.$removeFile(t,a),i.splice(a,1)}}},s=l,u=a("2877"),p=Object(u["a"])(s,e,n,!1,null,null,null);p.options.__file="vue-upload-component.vue";i["default"]=p.exports}}]);
//# sourceMappingURL=chunk-10.js.map