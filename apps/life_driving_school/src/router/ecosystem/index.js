const ecosystem = {
    path: '/ecosystem',
    name: 'ecosystem',
    meta:{
        tabBar: false,
        pathID:5,
    },
    component: () => import("@views/ecosystem/ecosystem"),
};

export default ecosystem;
