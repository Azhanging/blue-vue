import router from "@router";
import { activeTabBar } from '@assets/js/activePath';
import utils from 'blue-utils';

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
      className: 'bc-pd-tb-17',
      link: {
        className: 'bc-bd-r-e5e'
      },
      to: '/'
    }, {
      content: {
        value: '三大体系',
        fontSize: 11
      },
      icon: subMenuIcon,
      className: 'bc-pd-tb-17',
      link: {
        className: 'bc-bd-r-e5e'
      },
      to: '/'
    }, {
      content: {
        value: '五本驾照',
        fontSize: 11
      },
      icon: subMenuIcon,
      className: 'bc-pd-tb-17',
      link: {
        className: 'bc-bd-r-e5e'
      },
      children: getChildren({
        items: [{
          value: '健康驾照',
          to: '/'
        }, {
          value: '财富驾照',
          to: '/'
        }, {
          value: '婚姻驾照',
          to: '/'
        }, {
          value: '育子驾照',
          to: '/'
        }, {
          value: '心灵驾照',
          to: '/'
        }]
      })
    }, {
      content: {
        value: '购物宝',
        fontSize: 11
      },
      className: 'bc-pd-tb-17',
      link: {
        className: 'bc-bd-r-e5e'
      },
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
          value: '我是学员员',
          to: '/'
        }, {
          value: '我是教练',
          to: '/'
        }, {
          value: '我是分校',
          to: '/'
        }, {
          value: '办公室',
          to: '/'
        }]
      }),
      icon: subMenuIcon,
      className: 'bc-pd-tb-17'
    }]
  },
  active() {
    const path = router.currentRoute.fullPath;
    this.activeIndex = activeTabBar(path)
  }
};

export default homeTabBar;