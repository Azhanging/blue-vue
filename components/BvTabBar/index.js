import store from '@store';

//计算子菜单的位置
export function computSubMenuPosition(opts = {}) {
  const { menuElm } = opts;
  this.$nextTick(() => {
    //导航
    const tabBar = document.querySelector('#tabBar');
    //子菜单内容
    const tabBarSubmenuElm = tabBar.lastElementChild;
    //导航宽度
    const tabBarWidth = tabBar.offsetWidth;
    //item的宽度
    const menuElmWidth = menuElm.offsetWidth;
    //item的left
    const menuElmLeft = menuElm.offsetLeft;
    //子菜单
    const submenuElm = menuElm.lastElementChild;
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
export function setTabBarSubmenuIndex(opts = {}) {
  const { tabBarSubmenuIndex } = opts;
  store.commit('setTabBarSubmenuIndex', tabBarSubmenuIndex);
}