<template>
	<bv-home-view class='wap' :router-level='2'>
		<w-home-header :header="{
			title:{
				value: '驾照简介'
			}
		}"></w-home-header>

		<div class="bc-pd-15">
			<!--标题-->
			<div class="bc-f-20rp bc-f-b t-c">
				{{ desc.column_name }}简介
			</div>
			<!--时间-->
			<div class="bc-f-12rp bc-pd-tb-10rp bc-mg-t-6rp">
				{{ desc.update_time }}
			</div>
		</div>

		<!--文章内容-->
		<div class="article-content" style="background:rgba(244,244,244,1);">
			<ul class="bc-reset-ul" v-if="desc.content && desc.content.length > 0">
				<li class="bc-pd-lr-16rp bc-c-f" v-for="(item, index) in desc.content" :key="index">
					<div class="bc-mg-t-16rp bc-f-14rp bc-t-666 " v-if="item.type === 'text'" >
						<div v-html="item.value"></div>
					</div>
					
					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'images'" style="box-shadow: 5px 5px 10px rgba(166,166,166,.6)">
						<img class="bc-w-100" :src="item.value" alt="">
						<div class="bc-pd-10rp bc-t-hide" v-if="item.desc">{{item.desc}}</div>
					</div>
					
					<div class="bc-mg-t-16rp bc-bg-white" v-else-if="item.type === 'video'">
						<!--开播-->
						<div class="prism-player video" :id="`J_prismPlayer${item.videoId}`"></div>
						<!--<iframe height="253" width="100%" :src='item.PlayURL' frameborder=0  allowfullscreen="allowfullscreen"></iframe>-->
					</div>
					
					<div class="bc-mg-t-16rp bc-bg-white " v-else-if="item.type === 'audio'">
						
						<!--音频组件-->
						<w-article-audio :audio="item"></w-article-audio>
					
					</div>
				
				</li>
			</ul>
		</div>
		
		
		
		

	</bv-home-view>
</template>

<script>
	import WArticleAudio from '@components/wap/article/w-article-audio/w-article-audio'
	export default {
		name: "introduce-detail",
		props: {
		},
		data() {
			return {
				desc:''
			}
		},
		components: {
			'w-article-audio' : WArticleAudio
		},
		methods:{
			show_data() {
				return this.$axios.get('/api/examination/info',{
					params:{
						column_id:this.$route.params.nav_id
					}
				}).then(res=>{
					console.log(res)
					this.desc = res.data.data
					
		
					
					// 初始化视频
					this.det_data.content.forEach((item) => {
						if (item.type === 'video') {
							const {videoId, PlayURL, cover, playauth} = item;
							this.video = {
								videoId,
								url: PlayURL,
								cover,
								playauth
							};
							this.$nextTick(() => {
								this.videoPlay_init(this.video);
							});
						}
					});
					
				})
			},
			videoPlay_init(video) {
				const {videoId, playauth, cover } = video;
				
				this.player = new VideoPlayer({
					id: `J_prismPlayer${videoId}`,
					autoplay: false,
					isLive: false,
					width: '100%',
					playsinline: true,
					controlBarVisibility: 'hover',
					//点播
					vid: videoId,
					playauth,
					
					useH5Prism: true,
					useFlashPrism: false,
					x5_video_position: 'normal',
					//prismplayer 2.0.1版本支持的属性，主要用户实现在android 微信上的同层播放
					x5_type: 'h5', //通过 video 属性 “x5-video-player-type” 声明启用同层H5播放器，支持的值：h5 https://x5.tencent.com/tbs/guide/video.html
					cover,
					"skinLayout": [  //取消错误显示样式
						{
							"name": "bigPlayButton",
							"align": "blabs",
							"x": 30,
							"y": 80
						},
						{
							"name": "H5Loading",
							"align": "cc"
						},
						{
							"name": "infoDisplay"
						},
						{
							"name": "tooltip",
							"align": "blabs",
							"x": 0,
							"y": 56
						},
						{
							"name": "thumbnail"
						},
						{
							"name": "controlBar",
							"align": "blabs",
							"x": 0,
							"y": 0,
							"children": [
								{
									"name": "progress",
									"align": "blabs",
									"x": 0,
									"y": 44
								},
								{
									"name": "playButton",
									"align": "tl",
									"x": 15,
									"y": 12
								},
								{
									"name": "timeDisplay",
									"align": "tl",
									"x": 10,
									"y": 7
								},
								{
									"name": "fullScreenButton",
									"align": "tr",
									"x": 10,
									"y": 12
								},
								{
									"name": "subtitle",
									"align": "tr",
									"x": 15,
									"y": 12
								},
								{
									"name": "setting",
									"align": "tr",
									"x": 15,
									"y": 12
								},
								{
									"name": "volume",
									"align": "tr",
									"x": 5,
									"y": 10
								}
							]
						}
					]
				});
				
			}
		},
		mounted() {
			this.show_data()
		}
	}
</script>

<style scoped lang="scss">

</style>
