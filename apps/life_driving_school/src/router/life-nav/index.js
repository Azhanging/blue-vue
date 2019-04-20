const life_nav = {
    path: '/life-nav/:nav_id',
    name: 'life-nav',
    meta:{
        tabBar: false,
        pathID:[32,33,34,35,36],
    },
    component: () => import("@views/life-nav/life-nav.vue"),
    children: [
        {
            path: 'life-index/:id',
            component: () => import("@views/life-nav/life-index/life-index"),
            meta: {
                tabBar: false,
                pathID:[37,57,64,71,78],
            },
            children: [
                {
                    path: 'detail/:article_id',
                    component: () => import("@views/life-nav/life-index/detail"),
                    meta: {
                        tabBar: false,
                    },
                },
                {
                    path: 'introduce-detail',
                    component: () => import("@views/life-nav/life-index/introduce-detail"),
                    meta: {
                        tabBar: false,
                    },
                }
            ]
        },
      {
        path: 'driving-license/:id',
        component: () => import("@views/life-nav/driving-license/driving-license"),
        meta: {
            tabBar: false,
            pathID:[38,58,65,72,79],
        },
        children: [{
            path: 'detail/:article_id',
            component: () => import("@views/life-nav/driving-license/course-list/detail"),
            meta: {
                tabBar: false,
            },
        },{
            path: 'fitness-test/:record_id',
            component: () => import("@views/life-nav/driving-license/fitness-test/fitness-test"),
            meta: {
                tabBar: false
            },
            children: [],

        },{
            path: 'test-results/:record_id',
            component: () => import("@views/life-nav/driving-license/fitness-test/test-results"),
            meta: {
                tabBar: false
            }
        }]
    },{
        path: 'question-answer/:id',
        component: () => import("@views/life-nav/question-answer/question-answer"),
        meta: {
            tabBar: false,
            pathID:[42,62,69,76,83],
        },
        children: [{
            path: 'questions',
            component: () => import("@views/life-nav/question-answer/questions/questions"),
            meta: {
                tabBar: false
            }
        },{
            path: 'detail/:circle_id',
            component: () => import("@views/life-nav/question-answer/detail/detail"),
            meta: {
                tabBar: false
            }
        }]
    },{
        path: 'recommend/:id',
        component: () => import("@views/life-nav/recommend/recommend"),
        meta: {
            tabBar: false,
            pathID:[43,63,70,77,84],
        },
        children: [{
            path: 'detail/:circle_id',
            component: () => import("@views/life-nav/recommend/detail"),
            meta: {
                tabBar: false
            }
        }]
    }]
};

export default life_nav;
