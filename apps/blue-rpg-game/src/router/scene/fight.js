const basePath = `/scene/fight`;

const fight = [{
	path: `${basePath}/stage`,
	component: () => import('@/views/scene/fight/FightStage'),
	meta: {
		tabBar:{name:false}
	}
}];

export default fight;