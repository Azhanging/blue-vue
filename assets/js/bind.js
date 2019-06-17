import config from '@config';
import store from '@store';
import router from '@router';
import { apiBindRelation } from '$api';
import RouterNext from '$use-in-vue-router/router-next';
import { $toast } from "../../use-in-vue/mint-ui/toast";

//bind (绑定的业务部分在路由next前处理完)
export function bind(opts) {
  const { to, from } = opts;
  const query = to.query;

  const routerNext = new RouterNext({
    to,
    from
  });

  //检测是否存在绑定关系（暂时不用这套业务逻辑）
  if (hasBindRelationParams(query) && false) {
    bindRelation(query);
  } else {
    //针对旧业务绑定关系
    routerNext.add(bindRelation(query));
  }

  //绑定手机
  if (false) {
    routerNext.add(bindPhone(opts));
  }

  return routerNext.nextStatus();

}

//绑定关系处理
function bindRelation(params) {
  if (false) {
    apiBindRelation(params).then((res) => {

    });
  } else {
    return true;
  }
}

//检查绑定关系参数
function hasBindRelationParams(query) {
  const bindParams = config.share.params;
  for (let key in bindParams) {
    if (!bindParams.hasOwnProperty(key)) continue;
    const param = bindParams[key];
    if (!(param in query)) return false;
  }
  return true;
}

//绑定手机
export function bindPhone(opts = {}) {
  const { to } = opts;
  const userInfo = store.state.userInfo;
  const phone = userInfo.phone;
  const bindPhonePath = config.path.bindPhone;

  //没有绑定手机跳转到指定的链接，指定的链接必须存在，业务待定，未开放（使用于新项目绑定内跳转）
  if (!phone && bindPhonePath && to && to.path !== bindPhonePath && false) {
    router.replace(`${bindPhonePath}?redirect_path=${encodeURIComponent(router.getHref())}`);
  } else if (!phone) {
    //老项目跳转绑定手机
    redirectBindPhone();
  }
  //针对router-next使用的return状态
  return false;
}

//重定向到绑定手机的页面
export function redirectBindPhone() {
  $toast({
    message: '跳转绑定手机中...',
    duration: 10000
  });
  setTimeout(() => {
    location.href = router.mixedDevelopmentPath('bindPhone');
  }, 500);
}