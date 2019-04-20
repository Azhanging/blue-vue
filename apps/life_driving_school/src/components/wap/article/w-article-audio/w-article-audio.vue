<template>
	<div class="bc-ps-r">
		<img class="bc-w-100 bc-block audio-bg-img"  :src="audio.CoverURL" alt="音频背景图">
		<!--<img class="bc-w-100 bc-block audio-bg-img" :src="`${$config.path.static}/img/home/audio_bg_img.png`" alt="音频背景图">-->

		<audio
						id="audio"
						ref="audio"
		       @pause="onPause"
		       @play="onPlay"
						@timeupdate="onTimeupdate"
						@loadedmetadata="onLoadedmetadata"
		       :src="audio.PlayURL" ></audio>

		<span class="bc-ps-a audioImg" :class="{'play': playing, 'pause': !playing}" @click="audioPlay"></span>

		<!--进度条-->
		<div class=" bc-pd-lr-15rp audio-time bc-w-100">
				<mt-range
					v-model="sliderTime"
					:min="10"
					:max="100"
					:step="1"
					:bar-height="1"
					:format-tooltip="formatProcessToolTip"
					@change="changeCurrentTime(sliderTime)"
					class="slider"
				>
				</mt-range>
			<div class="bc-flex bc-mg-t-2rp">
				<div class="bc-flex-1 bc-t-white bc-t-l">{{currentTime | realFormatSecond}}</div>
				<div class="bc-flex-1 bc-t-white bc-t-r">{{maxTime | realFormatSecond}}</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Range  } from 'mint-ui';

export default {
  name: "w-article-audio",
	props: {
    audio: {
      type: Object,
	    default: {}
    }
	},
	data() {
    return {
      playing: false,
      currentTime: 0,
      maxTime: 60,
      sliderTime: 0
    }
	},
	methods: {
    audioPlay() {
      let audio = document.getElementById('audio');
      if(audio.paused && !this.playing){
        audio.play(); //播放
        this.playing = true;
      }else{
        audio.pause();
        this.playing = false;
      }
    },
    // 播放音频
    play () {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay () {
      this.playing = true;
    },
    // 当音频暂停
    onPause () {
      this.playing = false;
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
    //  console.log('timeupdate', res);
      this.currentTime = res.target.currentTime;
      // 当音频当前时间改变后，进度条也要改变
      this.sliderTime = parseInt(this.currentTime / this.maxTime * 100)
	    console.log("sliderTime", this.sliderTime);
    },

		// 当加载语音流元数据完成后，会触发该事件的回调函数
		// 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
     // console.log('loadedmetadata', res);
      this.maxTime = parseInt(res.target.duration)
    },
    // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(index / 100 * this.maxTime)
    },

		// 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt(this.maxTime / 100 * index);
      return '进度条: ' + realFormatSecond(index);
    },

	},
	filters: {
    realFormatSecond(second) {
        var secondType = typeof second;
        if (secondType === 'number' || secondType === 'string') {
          second = parseInt(second);
          var hours = Math.floor(second / 3600);
          second = second - hours * 3600;
          var mimute = Math.floor(second / 60);
          second = second - mimute * 60;
          return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2);
        } else {
          return '0:00:00'
        }
      }
	}
}
</script>

<style scoped lang="scss">
	.audio-bg-img {
		height: rem(210);
	}
	.audioImg {
		background: url($base-url + '/img/home/audio_play.png') no-repeat;
		background-size: 100% 100%;
		width: rem(40);
		height: rem(40);
		left: 50%;
		top: 50%;
		transform: translate3d(rem(-20),rem(-20),0);
	}
	.audioImg.play {
		background: url($base-url + '/img/home/audio_play.png') no-repeat;
		background-size: 100% 100%;
		width: rem(40);
		height: rem(40);
		left: 50%;
		top: 50%;
		transform: translate3d(rem(-20),rem(-20),0);
	}
	.audioImg.pause {
		background: url($base-url + '/img/home/audio_pause.png') no-repeat;
		background-size: 100% 100%;
		width: rem(40);
		height: rem(40);
		left: 50%;
		top: 50%;
		transform: translate3d(rem(-20),rem(-20),0);
	}
	.audio-time {
		position: absolute;
		left: 0;
		bottom: rem(10);
		.mt-range {
			padding-left: rem(28) !important;
			.mt-range-content {
				/*.mt-range-thumb {*/
					/*transform: translateX(rem(24));*/
					/*top: rem(10);*/
					/*width: rem(10);*/
					/*height: rem(10);*/
				/*}*/
			}
		}
	}
</style>