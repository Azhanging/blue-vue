const home = require('./home');

function routes(app) {
  app.use(home.routes());
}

module.exports = routes;
