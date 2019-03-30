const life_nav = {
    path: '/life_nav',
    name: 'life-nav',
    meta:{
        tabBar: false
    },
    component: () => import("@views/life-nav/index.vue"),
    children: [{
        path: 'fitness_test',
        component: () => import("@views/life-nav/fitness-test/fitness-test"),
        meta: {
            tabBar: false
        },
        children: [{
            path: 'test_results',
            component: () => import("@views/life-nav/fitness-test/test-results"),
            meta: {
                tabBar: false
            }
        }]
    },{
        path: 'driving_license',
        component: () => import("@views/life-nav/driving-license/driving-license"),
        meta: {
            tabBar: false
        }
    },{
        path: 'question_answer',
        component: () => import("@views/life-nav/question-answer/question-answer"),
        meta: {
            tabBar: false
        },
        children: [{
            path: 'detail',
            component: () => import("@views/life-nav/question-answer/detail"),
            meta: {
                tabBar: false
            }
        }]
    },{
        path: 'recommend',
        component: () => import("@views/life-nav/recommend/recommend"),
        meta: {
            tabBar: false
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