const router = require('koa-router')();

router.get('*', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  });
});

router.post('*', async (ctx, next) => {
  ctx.body = {
    code: 200
  };
});

router.put('*', async (ctx, next) => {

});

module.exports = router;