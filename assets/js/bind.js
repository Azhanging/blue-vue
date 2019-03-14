import config from '@config';
import $Axios from '$axios';
import store from '@store';
import router from '@router';

//bind rela
export function bind(opts) {
  const { to } = opts;
  const query = to.query;

  //has bind rela params
  if (hasBindRelationParams(query)) {
    bindRelation(query);
  }

  //bind phone
  if (false) {
    bindPhone(opts);
  }
}

//绑定关系处理
function bindRelation(params) {
  const bindConfig = config.bind.relation;
  const shareParams = config.share.params;
  $Axios.post(bindConfig.url, {
    [shareParams.phone]: params[shareParams.phone]
  }).then((res) => {
    console.log(res.data);
  });
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
function bindPhone(opts) {
  const { to } = opts
  const userInfo = store.state.userInfo;
  const phone = userInfo.phone;
  const bindPhonePath = config.bind.phone.path;
  //没有绑定手机跳转到指定的链接，指定的链接必须存在
  if (!phone && bindPhonePath && to.path !== bindPhonePath) {
    router.replace(`${bindPhonePath}?redirect_path=${encodeURIComponent(to.fullPath)}`);
  }
}