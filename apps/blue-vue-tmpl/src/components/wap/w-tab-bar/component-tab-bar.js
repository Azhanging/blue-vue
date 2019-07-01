import router from '@router';

const componentTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',                       //没选中的src图片
        /*fontClassName:''  font icon class name*/
        /*activeFontClassName:'' active font icon class name*/
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
        direction: 'left',
        style: 'width:20px;height:20px;',
      },
      to: '/',
      className: 'bc-pd-6'
    }, {
      content: {
        value: 'scroll',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',                       //没选中的src图片
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
        direction: 'right',
        style: 'width:20px;height:20px;',
      },
      className: 'bc-pd-6',
      children: {
        style: 'background:#ca9f75;',
        unActiveClassName: 'bc-t-white',
        list: {
          items: [{
            content: {
              value: '子菜单子菜单1'
            },
            className: 'bc-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单2'
            }
          }],
          style: 'border:1px solid white;'
        },
        arrow: {
          background: '#ca9f75'
        }
      }
    }, {
      content: {
        value: '组件',
        fontSize: 10
      },
      icon: {
        src: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass.png',                       //没选中的src图片
        activeSrc: 'https://www.dtb315.com/Static/wap/home/images/bottom_btn/allclass-active.png',
        direction: 'left',
        style: 'width:20px;height:20px;'
      },
      className: 'bc-pd-6',
      children: {
        style: 'background:white;border:1px solid #e5e5e5;',
        unActiveClassName: 'bc-t-danger',
        list: {
          items: [{
            content: {
              value: '子菜单子菜单4'
            },
            className: 'bc-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单子菜单5',
            },
            to: '/',
            className: 'bc-bd-b-white'
          }, {
            content: {
              value: '子菜单6'
            },
            to: '/'
          }],
          style: 'border:1px solid #e5e5e5;'
        },
        arrow: {
          background: '#333'
        }
      }
    }]
  },
  active() {
    if (router.matchRoutes([
        /^\/components\/scroll/,    //组件滑动路由
      ])) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 2;
    }
  }
};

export default componentTabBar;