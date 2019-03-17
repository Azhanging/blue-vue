//客户端入口

import { createApp } from './main';

const { app, router } = createApp();

router.onReady(() => {
  app.$mount('#app');
});

