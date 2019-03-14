import $Axios from '$axios';
import config from '@config';

//设置手机号
export function apiBindPhone(params) {
  return $Axios
    .post(config.bind.phone.url, params)
    .then((result) => result);
}