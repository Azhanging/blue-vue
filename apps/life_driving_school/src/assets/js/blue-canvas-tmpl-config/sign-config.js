import config from '@config';

let data = ` 5000 `;
let position = ` 600 `;
let date;
const studyText = `坚持学习了`;
const signText = ` 天   今日签到第`;


function font(size) {
  return `${size}px bold arial, 微软雅黑, sans-serif`;
}

function getChineNum() {
  const num = {};
}

function formatTime(time) {
  let month = time.slice(5, 7);
  let day = time.slice(8, 10);
  let week = time.slice(11, 14);
  switch (month) {
    case '01':
      month = '一月';
      return {
        month,
        day,
        week
      };
    case '02':
      month = '二月';
      return {
        month,
        day,
        week
      };
    case '03':
      month = '三月';
      return {
        month,
        day,
        week
      };
    case '04':
      month = '四月';
      return {
        month,
        day,
        week
      };
    case '05':
      month = '五月';
      return {
        month,
        day,
        week
      };
    case '06':
      month = '六月';
      return {
        month,
        day,
        week
      };
    case '07':
      month = '七月';
      return {
        month,
        day,
        week
      };
    case '08':
      month = '八月';
      return {
        month,
        day,
        week
      };
    case '09':
      month = '九月';
      return {
        month,
        day,
        week
      };
    case '10':
      month = '十月';
      return {
        month,
        day,
        week
      };
    case '11':
      month = '十一月';
      return {
        month,
        day,
        week
      };
    case '12':
      month = '十二月';
      return {
        month,
        day,
        week
      }
  }

}

export default function canvasTmplConfig(opts = {}) {

  let tipsX = 0;

  const vm =this;
  const {
    nickname, // 昵称
    head_img, // 头像
    even_sum, // 坚持学习天数  对应data
    time, // 日期 2019:04:13星期六   => 四月 13 星期六
    ranking // 第几名  对应position
  } = opts;
  data = even_sum;
  position = ranking;

 date = formatTime(time);
 const {month, day, week} = date;

  return {
    renderList: [{
      type: 'img',
      src: `${config.path.static}/img/home/sign/sign_bg_img.png`,
      width: 600,
      height: 728,
      x: 0,
      y: 0
    }, {
      type: 'img',
      src: `${config.path.static}/img/home/sign/date.png`,
      width: 140,
      height: 236,
      x: 42,
      y: 33
    }, {
      type: 'text',
      content: month,
      font: font(24),
      style: 'white',
      x: 92,
      y: 120
    }, {
      type: 'text',
      content: day,
      font: font(60),
      style: 'white',
      x: 78,
      y: 186
    }, {
      type: 'text',
      content: week,
      font: font(28),
      style: 'white',
      x: 68,
      y: 250
    }, function () {
      const options = this.options;
      const { width } = options;
      const canvasCtx = this.canvasCtx;
      canvasCtx.beginPath();
      canvasCtx.fillStyle = "white";
      canvasCtx.fillRect(0, 727, width, 727);
      // canvasCtx.arc(86, 727, 50, 0, 2 * Math.PI);
      canvasCtx.fillRect(40,654,120,120);
      canvasCtx.fill();
      canvasCtx.closePath();
    }, {
      type: 'img',
      src: 'https://image.zhangxinxu.com/image/study/s/s256/mm1.jpg'
    }, function () {
      const canvasCtx = this.canvasCtx;
      const img = new Image();
      img.src = 'https://image.zhangxinxu.com/image/study/s/s256/mm1.jpg';
      canvasCtx.beginPath();
      const pattern = canvasCtx.createPattern(img, 'no-repeat');
      canvasCtx.arc(86, 727, 46, 0, 2 * Math.PI);
      canvasCtx.fillStyle = pattern;
      canvasCtx.fill();
      canvasCtx.closePath();
    }, {
      type: 'text',
      content: nickname,
      font: font(26),
      style: 'black',
      x: 40,
      y: 820
    }, {
      type: 'text',
      content: studyText,
      font: font(22),
      style: '#999',
      x: 40,
      y: 860
    }, {
      type: 'text',
      content: `${data}`,
      font: font(22),
      style: '#CA9F75',
      x: tipsX += 40 + (22 / 2) * this.canvasTmpl.getByteLength(studyText),
      y: 860
    }, {
      type: 'text',
      content: signText,
      font: font(22),
      style: '#999',
      x: tipsX += ((22 / 2) * this.canvasTmpl.getByteLength(`${data}`)),
      y: 860
    }, {
      type: 'text',
      content: `${position}`,
      font: font(22),
      style: '#CA9F75',
      x: tipsX += -12+ ((22 / 2) * this.canvasTmpl.getByteLength(signText)),
      y: 860
    }, {
      type: 'text',
      content: '名',
      font: font(22),
      style: '#999',
      x: tipsX += 5+((22 / 2) * this.canvasTmpl.getByteLength(`${position}`)),
      y: 860
    }, {
      type: 'img',
      x: 500,
      y: 780,
      width: 70,
      height: 88,
      src: `${config.path.static}/img/home/sign/qrcode.png`
    },{
      type: 'img',
      x: 45,
      y: 660,
      width: 115,
      height: 115,
      src: head_img
    }],
    rendered(){
      vm.imgSrc = this.canvas.toDataURL();
      // 调用App方法
      navtiveApp.addTask(function () {
        dtb.shareImage(vm.imgSrc);
      });
    }
  };
}