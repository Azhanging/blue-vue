//router after each 相关的业务

import config from '@config';
import utils from 'blue-utils';
import { navigator } from "$assets/js/navigator";
import { $closeLoadding } from "$use-in-vue/mint-ui/indicator";

//main
export function routerAfterEach(opts) {
  const { router, unAfterHook, afterEach } = opts;
  router.afterEach((to, form) => {
    $closeLoadding();
    //项目内使用的after each
    utils.hook(null, afterEach, [to, form]);
    //公共的after hook
    routerAfterHook({
      to,
      form,
      unAfterHook
    });
  });
}

//hook
export function routerAfterHook(opts) {
  const { to, unAfterHook } = opts;
  const { title, afterHook, navigator: navigatorName } = to.meta;
  docTitle(title);
  navigator(navigatorName);
  if (afterHook) {
    utils.hook(null, afterHook);
  } else {
    utils.hook(null, unAfterHook);
  }
}

//document title
function docTitle(title) {
  document.title = title || config.view.title;
}