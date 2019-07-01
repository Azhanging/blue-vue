const ErrorPage404 = () => import(`$components/bv-error-page/error-page-404.vue`);

const error = {
  path: '/error-page/error-page-404',
  name: "error-page-404",
  component: ErrorPage404,
  meta: {
    tabBar: false
  }
};

export default error;