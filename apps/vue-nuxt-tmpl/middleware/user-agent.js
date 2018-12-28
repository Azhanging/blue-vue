export default function (ctx) {
  if (!global.navigator) {
    global.navigator = {
      userAgent: process.server ? ctx.req.headers['user-agent'] : navigator.userAgent
    }
  }
}
