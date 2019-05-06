const Koa = require('koa');
const app = new Koa();
const blueTmplViews = require('blue-tmpl-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const routes = require('./routes');

// error handler
onerror(app);

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}));

app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname));

app.use(blueTmplViews({
  path: '/views'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
routes(app);

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
