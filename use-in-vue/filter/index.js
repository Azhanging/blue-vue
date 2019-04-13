//公共的过滤器

export function useFilter(Vue) {
  Vue.filter('timeFilter', timeFilter);
  Vue.filter('backTimeFilter', backTimeFilter);
  Vue.filter('cutImage', cutImage);
}

//时间过滤器("Y-M-D h:min:s")
export function timeFilter(time, val = 'Y-M-D') {
  let d = new Date(time);
  let year = d.getFullYear();
  let month = (d.getMonth() + 1) < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  let hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  let minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  let seconds = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

  let value = val.replace(/Y/g, year).replace(/M/g, month).replace(/D/g, day).replace(/h/g, hours).replace(/min/g, minutes).replace(/s/g, seconds);

  return value
}

//倒计时
export function backTimeFilter(time, val = 'D天 h小时 min分 s秒') {
  let backTime = parseInt(time / 1000);
  let day = Math.floor(backTime / (60 * 60 * 24));
  let hour = Math.floor((backTime - day * 24 * 60 * 60) / 3600);
  let minutes = Math.floor((backTime - day * 24 * 60 * 60 - hour * 3600) / 60);
  let seconds = Math.floor(backTime - day * 24 * 60 * 60 - hour * 3600 - minutes * 60);


  if (day < 10) day = "0" + day;
  if (hour < 10) hour = "0" + hour;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;


  let value = val.replace(/D/g, day).replace(/h/g, hour).replace(/min/g, minutes).replace(/s/g, seconds);

  return value
}

//裁剪过滤器
export function cutImage(val, w, h) {
  if (!val) return val;
  var url = '',
    hasParme = (val.indexOf('?') == -1);
  if (w && h) {
    url = val + (hasParme ? '?' : '&') + 'val=Thumb_' + w + '_' + h;
  } else {
    url = val + (hasParme ? '?' : '&') + 'val=Thumb';
  }
  return url;
}

//发布时间
/*
1、5分钟内：刚刚 ； 5~10分钟：5分钟前； 10~15分钟：10分钟前
2、15分钟~60分钟：1小时前  ； 1小时~2小时：2小时前
3、两小时~当天内：XX时XX分（24小时制）；
4、超过一天：2018-01-01 xx时xx分
* */
export function sendTime(time) {

  const currentTime = new Date().getTime();

  //1分钟
  const inMin1 = 1000 * 60;

  function inTime(min) {
    return (currentTime - time < (inMin1 * min));
  }

  function ood(num) {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  }

  //5分钟
  const inMin5 = inTime(5);
  //10分钟
  const inMin10 = inTime(10);
  //15分钟
  const inMin15 = inTime(15);
  //60分钟
  const inH1 = inTime(60);
  //2小时
  const inH2 = inTime(60 * 2);
  //1天
  const otherDay = (new Date(time).getDate() !== new Date().getDate());

  if (inMin5) {
    return '刚刚';
  } else if (!inMin5 && inMin10) {
    return '5分钟前';
  } else if (!inMin10 && inMin15) {
    return '10分钟前';
  } else if (!inMin15 && inH1) {
    return '1小时前';
  } else if (!inH1 && inH2) {
    return '2小时前';
  } else if (!inH2 && !otherDay) {
    const date = new Date(time);
    let hours = date.getHours();
    let min = date.getMinutes();
    return `${ood(hours)}时${ood(min)}分`;
  } else if (otherDay) {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hours = date.getHours();
    const min = date.getMinutes();
    return `${year}-${month + 1}-${day} ${hours}时${min}分`;
  }
}
