const utils = require('blue-utils');
const VUE_ENV_NAME = `VUE_APP_`;

//设置node下vue的env信息
function setProcessENV(env = {}) {
  utils.each(env, (value, key) => {
    process.env[`${VUE_ENV_NAME}${key}`] = value;
  });
}

//生成script或者link
function genScriptOrLink(opts = {
  injectNode: []
}) {
  let injectStr = ``;
  utils.each(opts.injectNode, (injectData) => {
    const { type, url, comment, attrs = [] } = injectData;
    let attrStr = ``;
    //生成属性
    utils.each(attrs, (value, key) => {
      attrStr += `${key}="${value}" `;
    });
    const commentNode = (comment ? `<!-- ${comment} -->\n` : '');
    if (type === 'script') {
      injectStr += `${commentNode}<script src="${url}" ${attrStr}></script>`;
    } else if (type === 'css') {
      injectStr += `${commentNode}<link href="${url}" ${attrStr}/>`;
    }
  });
  return injectStr;
}

module.exports = {
  setProcessENV,
  genScriptOrLink
};