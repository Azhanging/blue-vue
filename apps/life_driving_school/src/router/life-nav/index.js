const life_nav = {
    path: '/life-nav',
    name: 'life-nav',
    meta:{
        tabBar: false,
        pathID:4,
    },
    component: () => import("@views/life-nav/life-nav.vue"),
    children: [{
        path: 'driving-license',
        component: () => import("@views/life-nav/driving-license/driving-license"),
        meta: {
            tabBar: false,
            pathID:38,
        },
        children: [{
            path: 'fitness-test',
            component: () => import("@views/life-nav/driving-license/fitness-test/fitness-test"),
            meta: {
                tabBar: false
            },
            children: [{
                path: 'test-results',
                component: () => import("@views/life-nav/driving-license/fitness-test/test-results"),
                meta: {
                    tabBar: false
                }
            }]
        }]
    },{
        path: 'question-answer',
        component: () => import("@views/life-nav/question-answer/question-answer"),
        meta: {
            tabBar: false,
            pathID:42,
        },
        children: [{
            path: 'questions',
            component: () => import("@views/life-nav/question-answer/questions/questions"),
            meta: {
                tabBar: false
            }
        },{
            path: 'detail',
            component: () => import("@views/life-nav/question-answer/detail/detail"),
            meta: {
                tabBar: false
            }
        }]
    },{
        path: 'recommend',
        component: () => import("@views/life-nav/recommend/recommend"),
        meta: {
            tabBar: false,
            pathID:43,
        },
        children: [{
            path: 'detail',
            component: () => import("@views/life-nav/recommend/detail"),
            meta: {
                tabBar: false
            }
        }]
    }]
};

export default life_nav;
