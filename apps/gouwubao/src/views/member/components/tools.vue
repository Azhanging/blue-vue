<template>
	<div class="bc-row bc-bg-white">
		<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp bc-f-b bc-bd-b-e5e">
			我的工具
		</div>
		<div class="bc-row bc-t-c bc-pd-lr-10rp">
			<div class="bc-col-xs-3 bc-pd-10rp"
			     v-for="item in list">
				<a href="javascript:;" @click="next(item)"
				   class="bc-inline-block bc-t-333 bc-pd-10rp bc-w-100">
					<div>
						<img :src="item.icon" alt="" style="width: 1.93333rem;height: 1.93333rem;">
					</div>
					<div class="bc-f-12rp">
						<span class="bc-inline-block">{{item.name}}</span>
					</div>
				</a>
			</div>
		</div>

		<bv-transition transition-name="opacity">
			<bv-layer :show-status="showStatus" @click="!config.device.isApp && (showStatus = false)" class="bc-t-c">
				<div class="bc-row bc-t-r bc-pd-tb-2rp">
					<i class="icon icon-close bc-t-white bc-f-18rp" @click="showStatus = false"></i>
				</div>
				<div class="bc-row">
					<img :src="shareImg" class="bc-w-90">
				</div>

				<div class="bc-row bc-t-white bc-t-c bc-pd-tb-10rp" v-if="!config.device.isApp">
					长按保存图片
				</div>

			</bv-layer>
		</bv-transition>

		<canvas id="canvas" class="bc-hide"></canvas>

	</div>
</template>

<script>
	import programUrl from '@config/program-url';

  import BlueCanvasTmpl from 'blue-canvas-tmpl';

  const generalizeUrl = `/member/generalize_img/index`;

  const canvasOptions = {
    el: "#canvas",
    width: 750,
    height: 1334,
    renderList: []
  };

  export default {
    name: "tools",
    props: ['type'],
    data() {
      return {
        showStatus: false,
        canvasTmpl: {},
        shareImg: ''
      };
    },
    computed: {
      list() {

        const staticPath = `${this.config.path.static}/img/member/components/tools`;
        const basePath = `${this.config.path.base}`;
        const type = this.type;

        const list = [{
          name: (() => {
            if (type === 'creator') {
              return '招募创客';
            } else if (type === 'agent') {
              return '招募代理';
            }
          })(),
          icon: `${staticPath}/add-creator.png`,
          url() {
            this.$axios.get(generalizeUrl, {
              params: {
                redirect_url: (() => {
                  if (type === 'creator') {
                    return `/#/join/creator`;
                  } else if (type === 'agent') {
                    return `/#/join/agent`;
                  }
                })()
              }
            }).then((res) => {
              const { data } = res.data;
              this.update({
                qrcode: data.url,
                bg: type
              });
            });
          }
        }, {
          name: '每日必做',
          icon: `${staticPath}/everyday-work.png`,
          url: `/member/tools/doing-every-day`
        }, {
          name: '引流工具',
          icon: `${staticPath}/drainage.png`,
          url: `/member/tools/generalize`
        }, {
          name: '课程活动',
          icon: `${staticPath}/enroll.png`,
          url: `${programUrl['fu-wu-tong']}/enroll`
        }, {
          name: '物料下载',
          icon: `${staticPath}/download.png`,
          url: `${basePath}/member/supplies/index`
        }, {
          name: '素材圈',
          icon: `${staticPath}/sucai.png`,
          url: `${programUrl['gou-wu-bao']}/member/material`
        }, {
          name: '客服咨询',
          icon: `${staticPath}/kefu.png`,
          url: `${programUrl['gou-wu-bao']}/member/message/service`
        }];

        if (type === 'creator') {
          list.splice(1, 0, {
            name: '招募VIP',
            icon: `${staticPath}/add-vip.png`,
            url() {
              this.$axios.get(generalizeUrl, {
                params: {
                  redirect_url: `/#/join/vip`
                }
              }).then((res) => {
                const { data } = res.data;
                this.update({
                  qrcode: data.url,
                  bg: 'vip'
                });
              });
            }
          });

          list.splice(6, 0, {
            name: '我的社群',
            icon: `${staticPath}/weixin.png`,
            url: `/member/creator/association`
          });
        }
        return list;
      },
      staticPath() {
        return `${this.config.path.static}/img/share`;
      }
    },
    methods: {
      next(item) {
        const utils = this.$utils;
        if (utils.isStr(item.url)) {
          item.url && this.$router.routerBack(item.url)
        } else if (utils.isFunction(item.url)) {
          utils.hook(this, item.url);
        }
      },
      update(opts = {}) {

        const vm = this;

        const { qrcode, bg } = opts;

        this.canvasTmpl.update(this.$utils.extend(canvasOptions, {
          renderList: [{
            type: 'img',
            src: `${this.config.path.static}/img/member/${bg}/${bg}-share.png`,
            x: 0,
            y: 0,
            width: 750,
            height: 1334
          }, {
            type: 'img',
            src: qrcode,
            x: (750 - 150) / 2,
            y: 1100,
            width: 150,
            height: 150
          }],
          rendered() {
            const shareImg = this.canvas.toDataURL('image/jpeg', 1);
            //app分享
            if (vm.config.device.isApp) {
              dtb.shareImage(shareImg);
            } else {
              //普通显示
              vm.shareImg = shareImg;
              vm.showStatus = true;
            }
          }
        }));
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.canvasTmpl = new BlueCanvasTmpl(canvasOptions);
      });
    }
  }
</script>