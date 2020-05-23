const error = [{
  path: '*',
  name: "error-page-404",
  component: () => import(`$components/BvErrorPage/ErrorPage404.vue`),
  meta: {
    tabBar:{name:false}
  }
}];

export default error;