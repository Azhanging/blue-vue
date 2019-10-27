import router from '@router';

const homeTabBar = {
  list: {
    items: [{
      content: {
        value: '测试首页',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bc-f-12 bp-icon-home',
        activeFont: 'bc-t-base',
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to: '/',
      className: 'bc-pd-5 bc-bd-r-e5e'
    }, {
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bc-f-12 bp-icon-home',
        activeFont: 'bc-t-base',
        style: 'width:20px;height:20px;',
        direction: 'bottom'
      },
      to: '/',
      className: 'bc-pd-5 bc-bd-r-e5e',
      fontSize: 10
    }, {
      content: {
        value: '组件',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bc-f-12 bp-icon-menu',
        activeFont: 'bc-t-base',
        direction: 'left',
        style: 'width:20px;height:20px;'
      },
      to: '/components',
      className: 'bc-pd-5'
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