import router from '@router';
import $Axios from '$axios';

//项目分享
export function programShare() {
  shareAddAccumulatePoints();
}

//分享添加积分
export function shareAddAccumulatePoints() {
  $Axios.get('', {
    params: {
      path: router.currentRoute.fullPath
    }
  }).then((res) => {

  });
}