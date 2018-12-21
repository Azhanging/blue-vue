import { wxShare } from '$wechat';

//all router page
const hooks = {
  routes: [{
    path: '/components',
    hooks: [() => {
      wxShare({
        title: 'components page'
      });
    }]
  },{
    path: '/components/vue-upload-component',
    hooks: [() => {
      wxShare({
        title: 'upload page'
      });
    }]
  }],
  unMatchHooks:[()=>{
    wxShare();
  }]
};

export default hooks;