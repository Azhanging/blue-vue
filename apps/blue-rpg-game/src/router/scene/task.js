const basePath = `/scene/task`;

const task = [{
  path: `${basePath}/info`,
  component: () => import('@/views/scene/task/TaskInfo'),
  meta: {
    tabBar:{name:false}
  }
}];

export default task;