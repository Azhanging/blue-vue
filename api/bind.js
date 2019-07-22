import $axios from '$axios';
import config from '@config';

//设置手机号
export function apiBindPhone(params) {
  return $axios.post(config.bind.phone.url, params);
}

//绑定角色
export function apiBindRelation(params) {
  const bindConfig = config.bind.relation;
  const shareParams = config.share.params;
  return $axios.post(bindConfig.url, {
    [shareParams.phone]: params[shareParams.phone]
  });
}