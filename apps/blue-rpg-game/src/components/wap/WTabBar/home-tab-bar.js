import router from '@router';

const homeTabBar = {
  list: {
    items: [{
      content: {
        value: '主页',
        fontSize: 10
      },
      to: '/',
      className: 'ba-pd-10 ba-bd-r-e5e'
    }, {
      content: {
        value: '背包',
        fontSize: 10
      },
      to: '/scene/knapsack',
      className: 'ba-pd-10 ba-bd-r-e5e',
      fontSize: 10
    }, {
      content: {
        value: '我的',
        fontSize: 10
      },
      to: '/components',
      className: 'ba-pd-10'
    }]
  },
  active() {
    if (router.$matchRoutes([
        /^\/component.*/,    //组件路由
      ])) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 0;
    }
  }
};

export default homeTabBar;