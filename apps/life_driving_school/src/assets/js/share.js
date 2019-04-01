/*
* 项目分享相关（现阶段只有微信分享调用了）
* */

import router from '@router';
import $Axios from '$axios';

//项目分享
export function shareSuccess() {
  //分享添加积分
  shareAddAccumulatePoints();
}

//分享添加积分
export function shareAddAccumulatePoints() {
  $Axios.get('', {
    isLoading: false,
    params: {
      path: router.currentRoute.fullPath
    }
  }).then((res) => {

  });
}