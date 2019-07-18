const list = [{
  path: 'scroll/:id',
  component: import(`../../views/components/scroll/scroll`),
  meta: {
    title: '/scroll',
    tabBar: 'components',
    afterHook() {
      weChatShare({
        title: 'scroll'
      });
    }
  }
}, {
  path: `/load-more/:id`,
  component: () => import(`../../views/components/load-more/load-more.vue`),
  meta: {
    title: '上拉刷新，下拉加载'
  }
}];

export default list;