//服务器端入口
import { createApp } from "./main";

export default function (opts) {

  return (ctx, next) => {

    return new Promise((resolve, reject) => {

      const url = ctx.url;

      const { app, router } = createApp();

      router.push(url);

      router.onReady(() => {

        const matchedComponents = router.matchedComponents();

        //匹配不到路由
        if (!matchedComponents.length) {
          return reject({ code: 404 })
        }

      });

      return resolve(app);

    }, reject);

  }

}