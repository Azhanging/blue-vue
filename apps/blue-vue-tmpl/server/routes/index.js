const home = require('./home');

function routes(app) {

  app.use(async (ctx, next) => {
    console.log(ctx.method);
    return next();
  });

  app.use(home.routes());
}

module.exports = routes;
