const ecosystem = {
    path: '/ecosystem/:ecosystem_id',
    name: 'ecosystem',
    meta:{
        tabBar: false,
        pathID:[44,47,48,87,93],
    },
    component: () => import("@views/ecosystem/ecosystem"),
    children: [
        {
            path: 'detail/:article_id',
            component: () => import("@views/ecosystem/components/detail"),
            meta: {
                tabBar: false,
            },
        }
    ]
};

export default ecosystem;
