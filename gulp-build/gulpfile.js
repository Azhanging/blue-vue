const gulp = require('gulp');

const child_process = require('child_process');

//vue文件表达式
const vueFiles = [
  //避免node_modules
  "!./apps/*/node_modules",
  "./apps"
];

//打包
gulp.task('build', () => {
  //执行命令
  child_process.exec('');
});

//监听文件
gulp.task('watchFile', () => {
  const vueFile = gulp.watch(vueFiles, ['build']);
  vueFile.on('change', () => {
    console.log(`打包中...   打包时间：${new Date().toLocaleTimeString()}`);
  });
});

gulp.task('default', ['watchFile']);