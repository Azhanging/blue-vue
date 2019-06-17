import $Axios from '$axios';
import config from '@config';

//设置手机号
export function apiBindPhone(params) {
  return $Axios.post(config.bind.phone.url, params);
}

//绑定角色
export function apiBindRelation(params) {
  const bindConfig = config.bind.relation;
  const shareParams = config.share.params;
  return $Axios.post(bindConfig.url, {
    [shareParams.phone]: params[shareParams.phone]
  });
}