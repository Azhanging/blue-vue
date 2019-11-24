const basePath = `/scene/fight`;

const fight = [{
	path: `${basePath}/stage`,
	component: () => import('@/views/scene/fight/FightStage')
}];

export default fight;