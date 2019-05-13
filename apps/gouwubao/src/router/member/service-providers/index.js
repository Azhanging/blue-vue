const ServiceProviders = {
  //服务商
  path: 'service-providers',
  component: () => import("@/views/member/service-providers/service-providers"),
  meta: {
    tabBar: 'office'
  },
};

export default ServiceProviders;
