const basePath = `/scene/npc`;

const npc = [{
	path: `${basePath}/info`,
	component:()=>import('@/views/scene/npc/NpcInfo')
}];

export default npc;