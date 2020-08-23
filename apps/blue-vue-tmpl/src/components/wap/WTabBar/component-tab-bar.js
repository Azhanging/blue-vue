import router from '@router';

const componentTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bp-icon-home',
        activeFont: 'bz-t-base'
      },
      to: '/'
    }, {
      content: {
        value: 'scroll',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bp-icon-home',
        activeFont: 'bz-t-base'
      }
    }, {
      content: {
        value: '组件',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bp-icon-menu',
        activeFont: 'bz-t-base'
      },
      to: `/components`
    }]
  },
  active() {
    if (router.$matchRoutes([
      /^\/components\/scroll/,    //组件滑动路由
    ])) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 2;
    }
  }
};

export default componentTabBar;