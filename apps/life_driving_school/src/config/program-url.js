import env from './env';

//相关的项目地址
const programUrl = (() => {
  if (env.dev) {
    return {
      'gou-wu-bao': 'https://pc.dtb315.cn',
      'lifeSchool': 'https://pc.lifest.dtb315.cn',
      'fu-wu-tong': 'http://pc.fuwu.dtb315.com',
      'ji-fu-bao': 'http://pc.jifu.dtb315.com',
      'webSocket':'pc.lifest.dtb315.cn',
    }
  } else if (env.beta) {
    return {
      'gou-wu-bao': 'https://beta.dtb315.cn',
      'life-school': 'https://beta.jiaxiao.dtb315.cn',
      'fu-wu-tong': 'http://beta.fuwu.dtb315.cn',
	    'ji-fu-bao': 'http://beta.jifu.dtb315.com',
	    'webSocket':'beta.jiaxiao.dtb315.cn',
    }
  } else {
    return {
      'gou-wu-bao': 'https://www.dtb315.com',
      'life-school': 'https://jiaxiao.dtb315.com',
      'fu-wu-tong': 'http://fuwu.dtb315.com',
	    'ji-fu-bao': 'http://beta.jifu.dtb315.com',
	    'webSocket':'jiaxiao.dtb315.com'
    }
  }
})();

export default programUrl;