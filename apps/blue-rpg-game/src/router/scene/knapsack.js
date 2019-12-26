const basePath = `/scene/knapsack`;
//背包
const knapsack = [{
  path: `${basePath}`,
  component: () => import('@/views/scene/knapsack/Knapsack')
}];

export default knapsack;