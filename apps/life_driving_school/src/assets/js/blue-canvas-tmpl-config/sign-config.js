const data = ` 5000 `;
const position = ` 600 `;
const studyText = `坚持学习了`;
const signText = `天  今日签到第`;
let tipsX = 0;

function font(size) {
  return `${size}px bold arial, 微软雅黑, sans-serif`;
}

function getChineNum() {
  const num = {
    
  };
}

export default function canvasTmplConfig() {
  return {
    renderList: [{
      type: 'img',
      src: 'https://imagedev.dtb315.com/581926.jpg',
      width: 600,
      height: 728,
      x: 0,
      y: 0
    }, {
      type: 'img',
      src: 'https://imagedev.dtb315.com/664741.jpg',
      width: 140,
      height: 236,
      x: 42,
      y: 33
    }, {
      type: 'text',
      content: '一月',
      font: font(24),
      style: 'white',
      x: 89,
      y: 120
    }, {
      type: 'text',
      content: '19',
      font: font(60),
      style: 'white',
      x: 78,
      y: 186
    }, {
      type: 'text',
      content: '星期六',
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
      const pattern = canvasCtx.createPattern(img, 'repeat-y');
      canvasCtx.fillStyle = pattern;
      canvasCtx.arc(86, 727, 46, 0, 2 * Math.PI);
      canvasCtx.fill();
      canvasCtx.closePath();
    }, {
      type: 'text',
      content: '名字来的',
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
    }]
  };
}