import router from '@router';

const homeTabBar = {
  list: {
    items: [{
      content: {
        value: '测试首页',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bz-f-12 bp-icon-home',
        activeFont: 'bz-t-base',
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to: '/',
      className: 'bz-pd-5 bz-bd-r-e5e'
    }, {
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bz-f-12 bp-icon-home',
        activeFont: 'bz-t-base',
        style: 'width:20px;height:20px;',
        direction: 'bottom'
      },
      to: '/',
      className: 'bz-pd-5 bz-bd-r-e5e',
      fontSize: 10
    }, {
      content: {
        value: '组件',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bz-f-12 bp-icon-menu',
        activeFont: 'bz-t-base',
        direction: 'left',
        style: 'width:20px;height:20px;'
      },
      to: '/components',
      className: 'bz-pd-5'
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