const ecosystem = {
    path: '/ecosystem',
    name: 'ecosystem',
    meta:{
        tabBar: false
    },
    component: () => import("@views/ecosystem/ecosystem.vue"),
};

export default ecosystem;