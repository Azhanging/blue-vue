import router from '@router';
import config from '@config';
import store from '@store';
import programUrl from '@config/program-url';

const officeTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/office/home.png`,
        activeSrc: `${config.path.static}/img/tab-bar/office/home-a.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to() {
        location.href = programUrl['gou-wu-bao'];
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '财务中心',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/office/caiwu.png`,
        activeSrc: `${config.path.static}/img/tab-bar/office/caiwu-a.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to() {
        location.href = `${programUrl['gou-wu-bao']}/servers/money/index`;
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '综合办公室',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/office/office.png`,
        activeSrc: `${config.path.static}/img/tab-bar/office/office-a.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to() {
        location.href = `${programUrl['gou-wu-bao']}/member/lianmeng/lm_center.html`;
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '课程活动',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/office/home.png`,
        activeSrc: `${config.path.static}/img/tab-bar/office/home-a.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to() {
        //location.href = `${config.path.base}`;
        location.href = `${programUrl['gou-wu-bao']}/enroll/index/course_activity`;
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '个人中心',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/office/grzx.png`,
        activeSrc: `${config.path.static}/img/tab-bar/office/grzx-a.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to() {
        location.href = `${programUrl['gou-wu-bao']}/member`;
      },
      className: 'bc-pd-5'
    }]
  },
  active() {
    if (router.matchRoutes([
      /^\/member\/creator/,    //组件路由
      /^\/member\/area-creator/,    //组件路由
      /^\/member\/product-angel/,    //组件路由
      /^\/member\/service-providers/,    //组件路由
      /^\/member\/branch-school/,    //组件路由
      /^\/member\/school-board/,    //组件路由
      /^\/member\/commercial-college/,    //组件路由
      /^\/member\/producers/,    //组件路由
      /^\/member\/owner/,    //组件路由
      /^\/member\/consumers/,    //组件路由
    ])) {
      this.activeIndex = 2;
    } else if (router.matchRoutes([
      /^\/member\/vip/,    //组件路由
      /^\/member\/tools/,    //组件路由
    ])) {
      this.activeIndex = 4;
    } else if (router.matchRoutes([
      /^\/member\/agent\//,    //组件路由
    ])) {
      this.activeIndex = -1;
    } else {
      this.activeIndex = 0;
    }
  }
};

export default officeTabBar;