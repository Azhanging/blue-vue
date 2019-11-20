const mockServer = require('blue-mock-server');
const path = require('path');
const port = process.env.port || process.env.npm_config_port || 996;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const devServer = {
  port,
  //根据环境配置相关代理
  open: false,
  before(app) {
    //mock-server
    mockServer({
      app,
      mockDir: resolve('./mock'),          //mock路径，用于更新path使用,
      apiFilePath: resolve('./mock/api')     //api路径，用于更新path使用
    });
  },
  proxy: {
    '/mock': {
      target: `http:localhost:${port}/mock`,
    },
    '/api': {
      ws: false,      //避免把hot代理了
      target: `http://localhost:3000`,
      changeOrigin: true
    }
  }
};


module.exports = devServer;