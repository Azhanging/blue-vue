//路由id
class RouterID {
  constructor(opts = {}) {
    this.id = 0;
  }

  //设置添加当前id
  setCurrentID() {
    ++this.id;
  }

  //获取当前id
  getCurrentID() {
    return this.id;
  }

  //判断是否符合当前id
  isCurrentID(id) {
    return this.id === id;
  }

}

export default RouterID;