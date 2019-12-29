const basePath = `/scene/task`;

const task = [{
  path: `${basePath}/info`,
  component: () => import('@/views/scene/task/TaskInfo'),
  meta: {
    tabBar: false
  }
}];

export default task;