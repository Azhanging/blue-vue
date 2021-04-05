import router from '@router';

const homeTabBar = {
  list: {
    items: [{
      text: '测试首页',
      icon: {
        font: 'bp-icon bp-icon-home',
        activeFont: 'ba-t-base'
      },
      to: '/'
    }, {
      text: '组件',
      icon: {
        font: 'bp-icon bp-icon-menu',
        activeFont: 'ba-t-base'
      },
      to: '/components'
    }]
  },
  active() {
    if (router.$matchRoutes([
      /^\/components.*/,    //组件路由
    ])) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 0;
    }
  }
};

export default homeTabBar;