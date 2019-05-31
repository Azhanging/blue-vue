const path = require('path');
const VersionManage = require('../../version-manage');
const vueConfig = require('./vue.config');

//静态路径
const assetsDir = path.join(vueConfig.assetsDir, '..');

const versionManage = new VersionManage({
  //svn的文件路径
  filePath: path.resolve(vueConfig.outputDir, assetsDir),
  whiteList: [      //白名单，不作为删除的文件
    'img'
  ]
});

//update -> remove 删除之前的版本
versionManage.build();
