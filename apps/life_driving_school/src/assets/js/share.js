/*
* 项目分享相关（现阶段只有微信分享调用了）
* */

import router from '@router';
import $Axios from '$axios';
import { $toast } from '$use-in-vue/mint-ui/toast';

//项目分享
export function shareSuccess() {
  //分享添加积分
  shareAddAccumulatePoints();
}

//分享添加积分
export function shareAddAccumulatePoints() {
  //针对项目的指定路径分享，可以获得积分值

    $Axios({
      method: 'post',
      url: '/api/share/index',
      isLoading: false,
      params: {
        url: router.currentRoute.fullPath
      }
    }).then((res) => {
      const { data } = res;
      if (data.integral > 0) {
        $toast({
          message: `+${data.integral}积分`
        });
      }
    });

}