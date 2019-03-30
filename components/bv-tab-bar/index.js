import store from '@store';

//匹配的路由
export function matchRouter(routesRegExp = [], path) {
  for (let i = 0; i < routesRegExp.length; i++) {
    const routerRegExp = routesRegExp[0];
    routerRegExp.lastIndex = 0;
    if (routerRegExp.test(path)) {
      return true;
    }
  }
  return false;
}

//计算子菜单的位置
export function computSubMenuPosition(opts = {}) {
  const { menuElm } = opts;
  this.$nextTick(() => {
    //导航
    const tabBar = document.querySelector('#tabBar');
    //导航宽度
    const tabBarWidth = tabBar.offsetWidth;
    //item的宽度
    const menuElmWidth = menuElm.parentNode.offsetWidth;
    //item的left
    const menuElmLeft = menuElm.parentNode.offsetLeft;
    //子菜单
    const submenuElm = document.querySelector('#tarBarSubMenu');
    //子菜单的宽度
    const submenuElmWidth = submenuElm.offsetWidth;

    let left = menuElmLeft + (menuElmWidth - submenuElmWidth) / 2;
    if (left + submenuElmWidth > tabBarWidth) {
      submenuElm.style.left = 'initial';
      submenuElm.style.right = 0;
    } else {
      submenuElm.style.right = 'initial';
      submenuElm.style.left = `${left}px`;
    }
  });
}

//设置导航子菜单状态
export function setTabBarSubMenuStatus(opts = {}) {
  const { tabBarSubMenuStatus } = opts;
  store.commit('setTabBarSubMenu', tabBarSubMenuStatus);
}