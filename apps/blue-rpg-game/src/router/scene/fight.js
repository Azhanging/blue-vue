const basePath = `/scene/fight`;

const fight = [{
	path: `${basePath}/stage`,
	component: () => import('@/views/scene/fight/FightStage'),
	meta: {
		tabBar: false
	}
}];

export default fight;