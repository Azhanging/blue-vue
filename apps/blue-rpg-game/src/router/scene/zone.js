const basePath = `/scene/zone`;

const zone = [{
  path: `${basePath}/entry`,
  component: () => import('@/views/scene/zone/Entry'),
  meta: {
    tabBar:{name:false}
  }
}];

export default zone;