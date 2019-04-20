import { activeTabBar } from './active-path';
import utils from 'blue-utils';
import programUrl from '@config/program-url';


const subMenuColor = `#ca9f75`;

//生成children-item
function getChildrenItem(opts = {}) {
  const { value, to, itemClassName = true } = opts;
  return {
    content: {
      value,
      fontSize: 12
    },
    link: {
      style: 'color:white;'
    },
    to,
    className: itemClassName ? 'bc-bd-b-white' : false
  };
}

//生成children
function getChildren(opts = {}) {
  const { items } = opts;
  const _items = [];
  utils.each(items, (item, index) => {
    _items.push(getChildrenItem({
      value: item.value,
      to: item.to,
      itemClassName: (index !== items.length - 1)
    }));
  });
  return {
    list: {
      items: _items,
      style: `border:1px solid white;border-radius:4px;`
    },
    arrow: {
      background: subMenuColor
    },
    style: `background:${subMenuColor};border-radius:4px;`
  }
}

//子菜单的icon属性
const subMenuIcon = {
  direction: 'left',
  style: 'font-size:7px;',
  font: `iconfont iconsanhengxian`,
  activeFont: `iconfont iconsanhengxian`
};

const homeTabBar = {
  list: {
    items: [{
      content: {
        value: '首页',
        fontSize: 13
      },
      className: 'bc-pd-tb-17 bc-bd-r-e5e',
      to: '/'
    }, {
      content: {
        value: '三大系统',
        fontSize: 11
      },
      icon: subMenuIcon,
      className: 'bc-pd-tb-17 bc-bd-r-e5e',
      children: getChildren({
        items: [{
          value: '成长系统',
          to: '/grow/12'
        }, {
          value: '播种系统',
	        to(){
		        location.href = programUrl['ji-fu-bao'];  //跳到积福宝
	        }
        }
        // , {
        //   value: '收获系统',
        //   to: '/'
        // }
        ]
      })
    }, {
      content: {
        value: '五本驾照',
        fontSize: 11
      },
      icon: subMenuIcon,
      className: 'bc-pd-tb-17 bc-bd-r-e5e',
      children: getChildren({
        items: [{
          value: '健康驾照',
          to: '/life-nav/32'
        }, {
          value: '心灵驾照',
          to: '/life-nav/33'
        }, {
          value: '财富驾照',
          to: '/life-nav/34'
        }, {
          value: '婚姻驾照',
          to: '/life-nav/35'
        }, {
          value: '育子驾照',
          to: '/life-nav/36'
        }]
      })
    }, {
      content: {
        value: '购物宝',
        fontSize: 11
      },
      className: 'bc-pd-tb-17 bc-bd-r-e5e',
      to() {
        location.href = 'https://www.dtb315.com';
      }
    }, {
      content: {
        value: '我的',
        fontSize: 11
      },
      children: getChildren({
        items: [{
          value: '我是学员',
          to: '/students'
        }
        // , {
        //   value: '我是教练',
        //   to: '/'
        // }, {
        //   value: '我是分校',
        //   to: '/'
        // }
        , {
          value: '办公室',
          to(){
	          location.href = `${programUrl['gou-wu-bao']}/member`;
          }
        }]
      }),
      icon: subMenuIcon,
      className: 'bc-pd-tb-17'
    }]
  },
  active() {
    this.activeIndex = activeTabBar()
  }
};

export default homeTabBar;
