const basePath = `/scene/resource`;
const resource = [{
	path: `${basePath}/info`,
	component: () => import('@/views/scene/resource/ResourceInfo')
}];

module.exports = resource;