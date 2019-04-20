import router from '@router';
import config from '@config';
import programUrl from '@config/program-url';

const homeTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/home/home.png`,
        activeSrc: `${config.path.static}/img/tab-bar/home/home-active.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to() {
        location.href = `${config.path.base}`;
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '创业中心',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/home/cy-center.png`,
        activeSrc: `${config.path.static}/img/tab-bar/home/cy-center-active.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to: `/join/creator`,
      className: 'bc-pd-5'
    }, {
      content: {
        value: '购物车',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/home/cart.png`,
        activeSrc: `${config.path.static}/img/tab-bar/home/cart-active.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to(){
        location.href = `${config.path.base}/home/cart`;
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '生命驾校',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/home/life-school.png`,
        activeSrc: `${config.path.static}/img/tab-bar/home/life-school-active.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to(){
        //跳转到生命驾校
        console.log(programUrl);
        location.href = programUrl.lifeSchool;
      },
      className: 'bc-pd-5'
    }, {
      content: {
        value: '个人中心',
        fontSize: 10
      },
      icon: {
        src: `${config.path.static}/img/tab-bar/home/member.png`,
        activeSrc: `${config.path.static}/img/tab-bar/home/member-active.png`,
        style: 'width:20px;height:20px;',
        direction: 'top'
      },
      to(){
        location.href = `${programUrl['gou-wu-bao']}/member`;
      },
      className: 'bc-pd-5'
    }]
  },
  active() {
    if (router.matchRoutes([
        /^\/component.*/,    //组件路由
      ])) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 0;
    }
  }
};

export default homeTabBar;