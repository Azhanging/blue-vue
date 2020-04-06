const basePath = `/scene/role`;
//角色管理
const role = [{
  //角色列表
  path: `${basePath}/list`,
  component: () => import(`@/views/scene/role/RoleList`),
  meta: {
    tabBar:{name:false}
  }
}, {
  //角色创建
  path: `${basePath}/create`,
  component: () => import(`@/views/scene/role/RoleCreate`),
  meta: {
    tabBar:{name:false}
  }
}];

export default role;