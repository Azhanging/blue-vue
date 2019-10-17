const list = [{
  path: '/scroll/:id',
  component: () => import(`../../views/components/scroll/scroll.vue`),
  meta: {
    title: '/scroll',
    tabBar: 'components'
  }
}, {
  path: `/load-more/:id`,
  component: () => import(`../../views/components/load-more/load-more.vue`),
  meta: {
    title: '上拉刷新，下拉加载',
    refresh: {
      unforcedList: [
        '/a'
      ]
    }
  }
}];

export default list;