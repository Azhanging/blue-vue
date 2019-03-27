const ErrorPage404 = () => import(`$components/bv-error-page/404.vue`);

const error = {
  path: '/404',
  name: "404",
  component: ErrorPage404,
  meta: {
    tabBar: false
  }
};

export default error;