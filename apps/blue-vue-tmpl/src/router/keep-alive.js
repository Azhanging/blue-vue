export default [{
  path: `/keep-alive/page1`,
  component: () => import(`@/views/keep-alive/Page1`),
  meta: {
    name: `page1`
  }
}, {
  path: `/keep-alive/page2`,
  component: () => import(`@/views/keep-alive/Page2`),
  meta: {
    name: `page2`
  }
}, {
  path: `/keep-alive/page3`,
  component: () => import(`@/views/keep-alive/Page3`),
  meta: {
    name: `page3`
  }
}];