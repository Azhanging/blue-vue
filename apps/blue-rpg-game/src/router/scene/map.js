const basePath = `/scene/map`;
const map = [{
  //地图场景
  path: `${basePath}`,
  component: () => import(`@/views/scene/map/MapScene`)
}];

export default map;