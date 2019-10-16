//路由的刷新状态,这里涉及到beforeRouteUpdate的情况下需要使用
//避免keep-alive的缓存机制
export function matchParamsRefresh({
  route
}) {
  const { params, query } = route;
  const { params: metaParams, query: metaQuery } = route.meta;

  //检查params一致性
  if (metaParams !== null) {
    for (let key in params) {
      if (!params.hasOwnProperty(key)) continue;
      if (metaParams[key] !== params[key]) {
        return true;
      }
    }
  }

  //检查query一致性
  if (metaQuery !== null) {
    for (let key in query) {
      if (!query.hasOwnProperty(key)) continue;
      if (metaQuery[key] !== query[key]) {
        return true;
      }
    }
  }

  return false;
}

//匹配强制刷新的列表
export function matchUnforcedListRefresh({
  fromRoute,
  toRoute
}) {
  const { refresh } = fromRoute.meta;
  const { unforcedList } = refresh;
  const { fullPath: toRouteFullPath } = toRoute;
  for (let i = 0; i < unforcedList.length; i++) {
    const path = unforcedList[i];
    //如果匹配的是字符串，那需要全等匹配
    if (utils.isStr(path) && (path === toRouteFullPath)) {
      return false;
    } else if ((path instanceof RegExp) && (path.test(toRouteFullPath))) {
      return false;
    }
  }
  return true;
}