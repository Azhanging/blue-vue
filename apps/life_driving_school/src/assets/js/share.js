/*
* 项目分享相关（现阶段只有微信分享调用了）
* */

import router from '@router';
import $Axios from '$axios';
import ecosystem from "../../router/ecosystem";

//项目分享
export function shareSuccess() {
  //分享添加积分
  shareAddAccumulatePoints();
}

//分享添加积分
export function shareAddAccumulatePoints() {
  //针对项目的指定路径分享，可以获得积分值
  if (router.matchRoutes([
      /^\/zixun/,
      /^\/grow\/\d+\/short\/\d+/g,
      /^\/ecosystem/
    ])) {
    $Axios({
      method: 'post',
      url: '/api/share/index',
      isLoading: false,
    }).then((res) => {
      const { data } = res.data;
      this.$toast({
        message: `${data.integral}积分`
      });
    });
  }
}