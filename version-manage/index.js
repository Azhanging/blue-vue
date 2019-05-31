/*
* 版本管理
* */

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const utils = require('blue-utils');
const SVN_COMMAND = `TortoiseProc /command:`;

class VersionManage {
  constructor(opts) {
    this.opts = opts;
  }

  //读取文件
  readFiles() {
    //管理的地址和白名单
    const { filePath, whiteList } = this.opts;
    return utils.promise((resolve, reject) => {
      fs.readdir(filePath, (err, files) => {
        if (err) {
          console.log(`readdir:`, err);
          reject();
          return;
        }
        resolve(files);
      });
    }).then((files) => {
      return utils.promise((resolve, reject) => {
        const _files = [];
        //过滤白名单文件
        files.forEach((file) => {
          if (whiteList.indexOf(file) === -1) {
            //设置全路径
            _files.push(path.resolve(filePath, file));
          }
        });
        resolve(_files);
      });
    });
  }

  //获取指令
  getCommand(command) {
    return `${SVN_COMMAND}${command}`;
  }

  //删除
  remove(filePath) {
    return utils.promise((resolve) => {
      child_process.exec(this.getCommand(`remove /path:${filePath}`), (err) => {
        console.log(`版本删除成功...`);
        resolve();
      });
    });
  }

  //更新
  update(path) {
    return utils.promise((resolve) => {
      child_process.exec(this.getCommand(`update /path:${path}`), () => {
        resolve();
      });
    });
  }

  //执行
  build() {
    const { filePath } = this.opts;
    return this.update(filePath)
      .then(() => {
        return this.readFiles();
      })
      .then((files) => {
        files.forEach((file) => {
          this.remove(file);
        });
      });
  }
}

module.exports = VersionManage;




