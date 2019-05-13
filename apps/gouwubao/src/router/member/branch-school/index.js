//公益分校
const BranchSchool = {
  path: 'branch-school',
  component: () => import("@/views/member/branch-school/branch-school"),
  meta: {
    tabBar: 'office'
  },
  children: [
    {
      path: 'release-course',
      component: () => import("@/views/member/branch-school/release-course"),
    },
    {
      path: 'material',
      component: () => import("@/views/member/branch-school/material"),
      meta: {
        tabBar: false
      },
    },
    {
      path: 'apply-for',
      component: () => import("@/views/member/branch-school/apply-for"),
      meta: {
        tabBar: false
      },
    }
  ]
};
export default BranchSchool;
