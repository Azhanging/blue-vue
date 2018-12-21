import { afterEachHooks } from '../router-hooks';

export function afterEach(router) {
  router.afterEach((to, form) => {
    afterEachHooks(to, form);
  });
}