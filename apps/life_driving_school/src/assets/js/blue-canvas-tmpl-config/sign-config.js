import config from '@config';

let data = ` 5000 `;
let position = ` 600 `;
let date;
const studyText = `坚持学习了`;
const signText = `天   今日签到第`;
let tipsX = 0;

function font(size) {
  return `${size}px bold arial, 微软雅黑, sans-serif`;
}

function getChineNum() {
  const num = {};
}

function formatTime(time) {
  let month = time.slice(5, 7);
  switch (month) {
    case '01':
      month = '一月';
    case '02':
      month = '二月';
    case '03':
      month = '三月';
    case '04':
      month = '四月';
    case '05':
      month = '五月';
    case '06':
      month = '六月';
    case '07':
      month = '七月';
    case '08':
      month = '八月';
    case '09':
      month = '九月';
    case '10':
      month = '十月';
    case '11':
      month = '十一月';
    case '12':
      month = '十二月';
      let day = time.slice(8, 10);
      let week = time.slice(10, 13);
      console.log(month);
      return {
        month,
        day,
        week
      }
  }

}

export default function canvasTmplConfig(opts = {}) {
  const {
    nickname, // 昵称
    head_img, // 头像
    even_sum, // 坚持学习天数  对应data
    time, // 日期 2019:04:13星期六   => 四月 13 星期六
    role11 // 第几名  对应position
  } = opts;
  data = even_sum || 5000;
  position = role11 || 1;

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
      x: 89,
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
      canvasCtx.arc(86, 727, 50, 0, 2 * Math.PI);
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
      content: data,
      font: font(22),
      style: '#CA9F75',
      x: tipsX += 40 + (22 / 2) * this.canvasTmpl.getByteLength(studyText),
      y: 860
    }, {
      type: 'text',
      content: signText,
      font: font(22),
      style: '#999',
      x: tipsX += ((22 / 2) * this.canvasTmpl.getByteLength(data)),
      y: 860
    }, {
      type: 'text',
      content: position,
      font: font(22),
      style: '#CA9F75',
      x: tipsX += ((22 / 2) * this.canvasTmpl.getByteLength(signText)),
      y: 860
    }, {
      type: 'text',
      content: '名',
      font: font(22),
      style: '#999',
      x: tipsX += ((22 / 2) * this.canvasTmpl.getByteLength(position)),
      y: 860
    }, {
      type: 'img',
      x: 500,
      y: 780,
      width: 70,
      height: 88,
      src: `${config.path.static}/img/home/sign/qrcode.png`
    }]
  };
}