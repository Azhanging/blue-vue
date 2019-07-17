//状态码
const code = {
  SUCCESS: 200,         //success
  REDIRECT: 304,        //redirect
  UN_LOGIN: 10001,      //没有登录
  BIND_PHONE: 10002,     //没有绑定手机,
  MESSAGE: 10003,          //消息提醒
  LOGIN_EXPIRE: 10004     //登录过期
};

export default code;