import { matchRouter } from '$components/bv-tab-bar';

const componentTabBar = {
  list: {
    items: [{
      content: {
        value: '组件',
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
      to: '/components',
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
              value: '子菜单1'
            },
            className: 'bc-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单1'
            }
          }]
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
              value: '子菜单4'
            },
            className: 'bc-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单5',
            },
            className: 'bc-bd-b-white'
          }, {
            content: {
              value: '子菜单6'
            }
          }]
        },
        arrow: {
          background: '#333'
        }
      }
    }]
  },
  active() {
    const currentRouter = this.$router.currentRoute;
    const path = currentRouter.fullPath;
    if (matchRouter([
        /^\/components\/scroll/,    //组件滑动路由
      ], path)) {
      this.activeIndex = 1;
    } else {
      this.activeIndex = 0;
    }
  }
};

export default componentTabBar;