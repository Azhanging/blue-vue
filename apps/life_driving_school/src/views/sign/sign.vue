<template>
  <bv-home-view class='wap' :router-level='2' style="background:rgba(244,244,244,1);">

    <w-home-header :header="{
			title:{
				value:'已签到'
			}
		}" >
      <div slot="right-control"></div>
    </w-home-header>

    <div class="bc-pd-15rp sign-in" v-if="sign">
      <div class="sign-label ">
        <div class="sign-label-content bc-bg-white bc-c-f bc-t-c bc-bd-radius-10">
          <div class=" bc-f-14rp bc-v-m">
            <span class="bc-t-999">已坚持</span>
            <div class="sign-label-content-day-wrap bc-inline-block">
							<span class="sign-label-content-day bc-t-red bc-t-white ">
								{{sign.even_sum}}
							</span>
            </div>
            <span class="bc-t-999">天签到</span>
          </div>
          <div class="sign-label-time bc-f-16rp" style="color:#CA9F75;">
            {{sign.time}}
          </div>
          <ul class="bc-reset-ul bc-t-c" style="">
            <li class="bc-inline-block head-portrait-wrap" v-for="(item, index) in sign.member" :key="index" v-if="index <= 5">
              <img class="head-portrait" :src="item.head_img" alt="头像">
            </li>
          </ul>
          <div class="bc-mg-t-10rp bc-f-12rp bc-t-999" style="" v-if="sign.member">
            {{sign.member.length}}位用户今日已签到
          </div>
          <div class="bc-mg-t-20rp bc-pd-lr-29rp">
            <div style="border:1px dashed #e5e5e5;"></div>
          </div>

          <div class="sign-in-progress bc-mg-t-20rp bc-pd-lr-29rp progress bc-flex bc-t-999" v-if="sign.even_time">
            <div class="bc-flex-1 bc-ps-r">
              <span class="sign-no" v-if="sign.even_time.length<1"></span>
              <span class="sign-yes" v-else></span>
              <div class="bc-mg-t-28rp bc-f-12rp" :class="{'bc-t-333': sign.even_time.length>=1}">{{sign.even_time[0]}}天</div>
              <div class="white-line" v-if="sign.even_time.length<2">
                <img :src="`${$config.path.static}/img/home/sign/white_line.png`" alt="白线">
              </div>
              <div class="base-line" v-else>
                <img :src="`${$config.path.static}/img/home/sign/base_line.png`" alt="黄线">
              </div>
            </div>
            <div class="bc-flex-1 bc-ps-r">
              <span class="sign-no" v-if="sign.even_time.length<2"></span>
              <span class="sign-yes" v-else></span>
              <div class="bc-mg-t-28rp bc-f-12rp" :class="{'bc-t-333': sign.even_time.length>=2}">{{sign.even_time[0]+1}}天</div>
              <div class="white-line" v-if="sign.even_time.length<3">
                <img :src="`${$config.path.static}/img/home/sign/white_line.png`" alt="白线">
              </div>
              <div class="base-line" v-else>
                <img :src="`${$config.path.static}/img/home/sign/base_line.png`" alt="黄线">
              </div>
            </div>
            <div class="bc-flex-1 bc-ps-r">
              <span class="sign-no" v-if="sign.even_time.length<3"></span>
              <span class="sign-yes" v-else></span>
              <div class="bc-mg-t-28rp bc-f-12rp" :class="{'bc-t-333': sign.even_time.length>=3}">{{sign.even_time[0]+2}}天</div>
              <div class="white-line" v-if="sign.even_time.length<4">
                <img :src="`${$config.path.static}/img/home/sign/white_line.png`" alt="白线">
              </div>
              <div class="base-line" v-else>
                <img :src="`${$config.path.static}/img/home/sign/base_line.png`" alt="黄线">
              </div>
            </div>
            <div class="bc-flex-1 bc-ps-r">
              <span class="sign-no" v-if="sign.even_time.length<4"></span>
              <span class="sign-yes" v-else></span>
              <div class="bc-mg-t-28rp bc-f-12rp" :class="{'bc-t-333': sign.even_time.length>=4}">{{sign.even_time[0]+3}}天</div>
              <div class="white-line" v-if="sign.even_time.length<5">
                <img :src="`${$config.path.static}/img/home/sign/white_line.png`" alt="白线">
              </div>
              <div class="base-line" v-else>
                <img :src="`${$config.path.static}/img/home/sign/base_line.png`" alt="黄线">
              </div>
            </div>
            <div class="bc-flex-1 bc-ps-r">
              <span class="sign-no" v-if="sign.even_time.length<5"></span>
              <span class="sign-yes" v-else></span>
              <div class="bc-mg-t-28rp bc-f-12rp" :class="{'bc-t-333': sign.even_time.length>=5}">{{sign.even_time[0]+4}}天</div>
            </div>
          </div>

          <a href="javascript:;" @click="generateImg">
            <div class="produce-label bc-t-white bc-t-c bc-pd-tb-12rp">
              生成日签
            </div>
          </a>

        </div>
      </div>
      <div class="integral bc-mg-t-16rp bc-bg-white bc-bd-radius-10 bc-pd-lr-16rp bc-v-m">
        <div class="bc-pd-tb-20rp bc-f-b bc-bd-b-e5e bc-f-16rp">积分任务</div>
        <div class="bc-flex bc-flex-jc-c bc-flex-ai-c bc-bd-b-e5e">
          <div class="bc-flex-3">
            <div class="bc-pd-tb-14rp bc-f-16rp" style="font-weight:500">
              <img class="icon" :src="`${$config.path.static}/img/home/sign/sign_icon.png`" alt="签到">
              <span>&nbsp;每日签到</span>
            </div>
          </div>
          <div class="bc-flex-1 bc-t-c">
            <div class="completed">
              已完成
            </div>
          </div>
        </div>

        <div class=" integral bc-flex bc-flex-jc-c bc-flex-ai-c  bc-bd-b-e5e bc-v-m">
          <div class="bc-flex-3">
            <div class="bc-pd-tb-14rp bc-f-16rp" style="font-weight:500">
              <img class="icon" :src="`${$config.path.static}/img/home/sign/study_icon.png`" alt="学习">
              <span>&nbsp;完成一节驾照课程学习</span>
            </div>
          </div>
          <div class="bc-flex-1 bc-t-c">
            <div class="completed" v-if="sign.license">
              已完成
            </div>
            <div v-else>
              <router-link :to="`/life-nav/${sign.license_column_id}`" >
                <div class="to-complete">
                  去完成
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="integral bc-flex bc-flex-jc-c bc-flex-ai-c bc-bd-b-e5e bc-v-m">
          <div class="bc-flex-3">
            <div class="bc-pd-tb-14rp bc-f-16rp" style="font-weight:500">
              <img class="icon" :src="`${$config.path.static}/img/home/sign/comment_icon.png`" alt="评论">
              <span>&nbsp;发布一次评论</span>
            </div>
          </div>
          <div class="bc-flex-1 bc-t-c">
            <div class="completed" v-if="sign.comment">
              已完成
            </div>
            <div v-else>
              <router-link to="/" >
                <div class="to-complete">
                  去完成
                </div>
              </router-link>
            </div>
          </div>
        </div>

        <div class="integral bc-flex bc-flex-jc-c bc-flex-ai-c bc-v-m">
          <div class="bc-flex-3">
            <div class="bc-pd-t-14rp bc-f-16rp" style="font-weight:500">
              <img class="icon" :src="`${$config.path.static}/img/home/sign/share_icon.png`" alt="评论">
              <span>&nbsp;转发分享：每日前3次生效</span>
            </div>
            <div class="bc-t-999 bc-pd-tb-5rp bc-f-11rp bc-pd-l-15rp">(资讯、短课、生态圈、驾照资讯等)</div>
          </div>
          <div class="bc-flex-1 bc-t-c">
            <div class="completed" v-if="sign.share">
              已完成
            </div>
            <div v-else>
              <router-link to="/" >
                <div class="to-complete">
                  去完成
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/students/for-points">
        <div class="bc-t-base bc-t-r bc-pd-tb-15rp">更多赚取积分方式</div>
      </router-link>

      <!--签到生成页面-->
      <div class="sign-success bc-c-f" v-show="maskIsShow" @click="closeMask">
        <div class="label-area bc-ps-r">
            <canvas id="canvas" v-if="!imgSrc"></canvas>
	          <img id="shareImg" :src="imgSrc" alt="签到生成图片" v-else>
            <div class="close-icon" @click="closeMask">
              <img :src="`${$config.path.static}/img/home/sign/close_icon.png`"  alt="">
            </div>
        </div>
        <!--<div class=" share bc-mg-t-20rp bc-flex bc-t-c bc-t-white">-->
          <!--<div class="bc-flex-1">-->
            <!--<img :src="`${$config.path.static}/img/home/sign/wx.png`"  alt="">-->
            <!--<div>微信</div>-->
          <!--</div>-->
          <!--<div class="bc-flex-1">-->
            <!--<img :src="`${$config.path.static}/img/home/sign/wx_friend.png`"  alt="">-->
            <!--<div>朋友圈</div>-->
          <!--</div>-->
          <!--<div class="bc-flex-1">-->
            <!--<img :src="`${$config.path.static}/img/home/sign/qq.png`"  alt="">-->
            <!--<div>QQ</div>-->
          <!--</div>-->
          <!--<div class="bc-flex-1">-->
            <!--<img :src="`${$config.path.static}/img/home/sign/qzone.png`"  alt="">-->
            <!--<div>QQ空间</div>-->
          <!--</div>-->
          <!--<a class="bc-flex-1 bc-t-white">-->
            <!--<img :src="`${$config.path.static}/img/home/sign/download.png`"  alt="">-->
            <!--<div>下载</div>-->
          <!--</a>-->
        <!--</div>-->
      </div>

    </div>

  </bv-home-view>

</template>

<script>

  import BlueCanvasTmpl from 'blue-canvas-tmpl';
  import signCanvasTmplConfig from '@assets/js/blue-canvas-tmpl-config/sign-config';

  const canvasTmplOpts = {
    el: "#canvas",
    width: 600,
    height: 900,
    renderList: []
  };

  export default {
    name: "sign",
    data() {
      return {
        sign: {},
        canvasTmpl: {},
        maskIsShow: false,
        imgSrc: ''
      }
    },
    methods: {
      generateImg() {
        if (this.imgSrc) {
          return false;
        }
        let opts = Object.assign(this.sign, this.userInfo);
        this.canvasTmpl.update(this.$utils.extend(
          canvasTmplOpts,
          signCanvasTmplConfig.call(this, opts))
        );
        this.maskIsShow = true;
      },
      closeMask() {
        this.maskIsShow = false;
        this.imgSrc = '';
      }
    },

    mounted() {
      this.$axios.get('/api/Sign/index.html')
        .then((res) => {
          const { data } = res.data;
          this.sign = data;
        }).catch((error) => {
        console.log(error);
      });
      this.$nextTick(() => {
        this.canvasTmpl = new BlueCanvasTmpl(canvasTmplOpts);
      });
    },
    computed:{
      userInfo(){
        return this.$store.state.userInfo;
      }
    }
  }
</script>

<style scoped lang="scss">
  .sign-in {
    position: relative;
    .sign-label {
      box-sizing: border-box;
      background: url($base-url + '/img/home/sign/sign_in_bg.png') no-repeat;
      background-position: center;
      background-size: 100% 100%;
      padding: rem(63) rem(33) rem(37) rem(33);
      .sign-label-content {
        height: rem(330);
        .sign-label-content-day-wrap {
          transform: translateY(rem(-30));
          width: rem(75);
          height: rem(80);
          .sign-label-content-day {
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            background: url($base-url + '/img/home/sign/sign_in_day_bg.png') no-repeat;
            background-position: top;
            background-size: 100% 100%;
            font-size: rem(40);
            padding-top: rem(10);
          }
        }
        .sign-label-time {
          transform: translateY(rem(-15));
        }
        .head-portrait-wrap {
          &:nth-child(2) {
            transform: translateX(rem(-10)) !important;
          }
          &:nth-child(3) {
            transform: translateX(rem(-20)) !important;
          }
          &:nth-child(4) {
            transform: translateX(rem(-30)) !important;
          }
          &:nth-child(5) {
            transform: translateX(rem(-40)) !important;
          }
          &:nth-child(6) {
            transform: translateX(rem(-50)) !important;
          }
          .head-portrait {
            width: rem(30);
            height: rem(30);
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid white;
          }
        }

        .sign-in-progress {
          .sign-no {
            position: absolute;
            left: 28%;
            top: 1%;
            z-index: 100;
            width: rem(15);
            height: rem(15);
            background: url($base-url + '/img/home/sign/sign_in_progress_no.png') no-repeat;
            background-position: center;
            background-size: 100% 100%;
          }
          .sign-yes {
            position: absolute;
            left: 28%;
            top: 1%;
            z-index: 100;
            width: rem(15);
            height: rem(15);
            background: url($base-url + '/img/home/sign/sign_in_progress_yes.png') no-repeat;
            background-position: center;
            background-size: 100% 100%;
          }
          .white-line {
            position: absolute;
            left: 39%;
            top: -15%;
            z-index: 90;
            img {
              width: rem(50);
              height: rem(2);
            }
          }
          .base-line {
            position: absolute;
            left: 39%;
            top: -15%;
            img {
              width: rem(50);
              height: rem(2);
            }
          }
        }
        .produce-label {
          width: rem(125);
          margin: rem(14) auto 0 auto;
          background: rgba(202, 159, 117, 1);
          box-shadow: 0 4px 10px 0 rgba(202, 159, 117, 0.5);
          border-radius: rem(20);
        }
      }
    }
    .integral {
      .icon {
        width: rem(15);
        height: rem(15);
      }
    }
    .to-complete {
      padding: rem(9) rem(12);
      font-size: rem(14);
      border-radius: rem(25);
      color: rgba(202, 159, 117, 1);
      border: 1px solid rgba(202, 159, 117, 1);
    }
    .completed {
      padding: rem(9) rem(12);
      font-size: rem(14);
      color: #999;
    }
    .sign-success {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 1000;
      background: rgba(0, 0, 0, .5);
      .label-area {
        width: rem(300);
        height: rem(450);
        margin: rem(91) auto 0 auto;
        #canvas {
          width: 100%;
          height: 100%;
        }
	      #shareImg {
		      width: 100%;
		      height: 100%;
	      }
        .close-icon {
          position: absolute;
          width: rem(30);
          height: rem(30);
          right: rem(-15);
          top: rem(-15);
          img {
            width: 100%;
          }
        }

      }
      .share {
        img {
          width: rem(45);
          height: rem(45);
          display: inline-block;
        }
      }
    }
  }
</style>
