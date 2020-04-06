import router from '@router';

const componentTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bz-f-12 bp-icon-home',
        activeFont: 'bz-t-base',
        direction: 'left',
        style: 'width:20px;height:20px;',
      },
      to: '/',
      className: 'bz-pd-6'
    }, {
      content: {
        value: 'scroll',
        fontSize: 10
      },
      icon: {
        font: 'bp-icon bz-f-12 bp-icon-home',
        activeFont: 'bz-t-base',
        direction: 'right',
        style: 'width:20px;height:20px;',
      },
      className: 'bz-pd-6',
      children: {
        style: 'background:#0f8cca;',
        unActiveClassName: 'bz-t-white',
        list: {
          items: [{
            content: {
              value: '子菜单子菜单1'
            },
            className: 'bz-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单2'
            }
          }],
          style: 'border:1px solid white;'
        },
        arrow: {
          background: '#0f8cca'
        }
      }
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
      className: 'bz-pd-6',
      children: {
        style: 'background:white;border:1px solid #e5e5e5;',
        unActiveClassName: 'bz-t-danger',
        list: {
          items: [{
            content: {
              value: '子菜单子菜单4'
            },
            className: 'bz-bd-b-white',
            to: '/'
          }, {
            content: {
              value: '子菜单子菜单5',
            },
            to: '/',
            className: 'bz-bd-b-white'
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