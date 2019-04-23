<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<life_nav_tab :growIndex='1' :title='{
            title:{
                value: "生命导航"
            }
        }' :leftControl="`/`"></life_nav_tab>

		<div class="driving-top">
			<div class="driving-title">
				<div><i class="driving-title-r"></i></div>
				<h3>阶段测试</h3>
				<div><i class="driving-title-l"></i></div>
			</div>
			<div class="driving-slide">
				<div class="driving-learn">
					<div class="driving-learn-img">
						<img :src="`${config.path.static}/img/life-nav/book@2x.png`">
					</div>

					<!--<div class="driving-learn-desc">
						<h3>您已学习至：</h3>
						<p>初阶&nbsp;第三课《{{财富的真相}}》</p>
					</div>-->
					<div class="driving-learn-desc" v-if="top_progressData.phases_name">
						<h3>您已学习至：</h3>
						<p>{{ top_progressData.phases_name }}&nbsp;《{{ top_progressData.course_name }}》</p>
					</div>
					<div class="driving-learn-desc" v-else>
						<h3>{{ top_progressData.course_name }}</h3>
					</div>
				</div>
			</div>

			<bv-scroll>
				<swiper :options="swiperOption" ref="swiper">
					<swiper-slide v-for="(slide, index) in banners" :key="index"><!--:to="{path:'driving-license/fitness-test'+'?record_id='+slide.id}"-->
						<div @click="over_click(slide.over,slide.id,slide.click,slide.examination.num)">
							<div class="driving-slide">

								<div class="driving-topic">
									<div class="driving-topic-img">
										<img :src="slide.examination.src_img">
									</div>
									<div class="driving-topic-desc">
										<div class="driving-topic-desc-tit">
											<div>{{ slide.examination.name }}（选择题）</div>
											<i class="iconfont iconbianji" ></i>
										</div>
										<div class="driving-topic-desc-xing">
											<i class="iconfont iconiconfontxingxing" :class="((index+1)*20)<=slide.result?'active':''" v-for="(i,index) in 5"></i>
										</div>
										<div class="driving-topic-desc-progress">

											<div class="driving-topic-desc-l">
												<progress :value="slide.step" :max="slide.examination.num"></progress>
											</div>


											<div><span>{{ slide.step }}</span>/{{slide.examination.num}}道</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</swiper-slide>
					<div class="swiper-pagination" id="pagination" slot="pagination"></div>
				</swiper>
			</bv-scroll>

		</div>

		<div class="driving-list">
			<div class="driving-list-tab">
				<div
					v-for="(item,index) in nav_level"
					v-on:click="tabqh(index,item.id)"
					:class="{active:(temp===index)}"
				>
					{{ item.name }}
				</div>
			</div>

			<div v-if="this_id>0">
				<div v-if="temp===0">
					<coursePrimary :this_id="this_id"></coursePrimary>
				</div>
				<div v-if="temp===1">
					<courseIntermediate :this_id="this_id"></courseIntermediate>
				</div>
				<div v-if="temp===2">
					<courseSenior :this_id="this_id"></courseSenior>
				</div>
			</div>


		</div>

	</bv-home-view>
</template>


<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import life_nav_tab from "@components/wap/life-nav/w-life-nav-tab";
	import driving_list from '../components/driving-list';
	import coursePrimary from './course-list/course-primary';//初
	import courseIntermediate from './course-list/course-intermediate';//中
	import courseSenior from './course-list/course-senior';//高
	import WArrlist from '@components/wap/article/w-arrlist'
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "driving-license",
		components: {
			life_nav_tab,
			driving_list,
			'w-arrlist': WArrlist,
			coursePrimary,
			courseIntermediate,
			courseSenior,
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		props:{

		},
		data() {
			return {
				temp:0,
				banners: [],
				swiperOption: {
					pagination: {
						el: "#pagination"
					},
					loop: true
				},
				swiper: {},
				xing_num:65, //星星点亮个数
				th_progressValue:40,//传的分数
				progressValue:0,//显示分数
				achieveMsg:true,
				nav_level:['初阶','中阶','高阶'],
				this_level: 0,
				this_id:'',
				top_progressData:''
			}
		},
		methods: {
			swiperUpdate() {
				this.swiper.update();
			},
			tabqh(t,this_id) {
				this.this_id = this_id
				if(this.this_level==0){
					$toast({
						message: '通过考试才能阅读下一阶课程哦',
						duration: 3000
					});
					return;
				}
				if(this.this_level==1 && t==2){
					$toast({
						message: '通过考试才能阅读下一阶课程哦',
						duration: 3000
					});
					return;
				}
				this.temp = t;
			},
			//轮播上学习进度
			top_progress(){
				return this.$axios.get('/api/study/index', {
					params:{
						column_id:this.$route.params.nav_id
					},
				}).then((res) => {
					//console.log(res)

					this.top_progressData = res.data.data
				});
			},
			//课程轮播
			item_progress(){

				return this.$axios.get('/api/examination/getList', {
					params:{
						column_id:this.$route.params.nav_id
					},
				}).then((res) => {
					//console.log(res.data.data)
					this.banners = res.data.data
				});

			},
			//判定是否完成考试
			over_click(over,record_id,ifclick,num){
				if(num==0){
					$toast({
						message: '考试未开放',
						duration: 3000
					});
					return false;
				}
				if(over==1){
					this.$router.push({
						path: this.$router.currentRoute.fullPath+'/test-results/'+record_id,
						params:{
							record_id:record_id
						}
					})
				}else {
					if(ifclick==0){
						$toast({
							message: '请完成之前课程',
							duration: 3000
						});
						return false;
					}else {
						this.$router.push({
							path: this.$router.currentRoute.fullPath+'/fitness-test/'+record_id,
							params:{
								record_id:record_id
							}
						})
					}
				}

			},
			/*driving_tab(){
				return this.$axios.get('/api/Classify/assortment',{
					params:{
						column_id:this.$route.params.id
					}
				}).then(res=>{
					//console.log(res)
					this.this_id = res.data.data.system[0].id
					this.nav_level = res.data.data.system
					//console.log(this.this_id)
				})
			},*/
			driving_list(){
				return this.$axios.get('/api/examination/level', {
					params:{
						column_id:this.$route.params.nav_id
					},
				}).then((res) => {
					//console.log(res)
					this.this_level=res.data.data.level;

					this.temp = this.this_level;

					this.$axios.get('/api/Classify/assortment',{
						params:{
							column_id:this.$route.params.id
						}
					}).then(res=>{
						//console.log(res)
						this.this_id = res.data.data.system[this.temp].id
						this.nav_level = res.data.data.system
						//console.log(this.this_id)
					})

				});
			},
		},
		mounted() {
			this.$nextTick(() => {
				this.swiper = this.$refs['swiper'];
				this.swiperUpdate();
			});

			let num = this.th_progressValue;
			for(let i=0;i<=num;i++){
				setTimeout(()=>{
					this.progressValue=i;
				},800)
			}
			this.top_progress();
			this.item_progress();
			//this.driving_tab();
			this.driving_list();

		},
	}

</script>

<style scoped lang="scss">
	.swiper-pagination >>> .swiper-pagination-bullet-active{width: rem(12)}
	h3, p {
		margin: 0;
		padding: 0;
	}
	.driving-top {
		background: #fff;
		overflow: hidden;
		padding: 0 rem(15);

		.driving-title {
			padding: rem(20);
			display: flex;
			height: rem(20);
			line-height: rem(20);
			align-items: center;

			div {
				flex: 1;
				height: 1px;
				position: relative;
				background: rgba(153, 153, 153, 1);
				background: linear-gradient(to right, rgba(153, 153, 153, .2), rgba(153, 153, 153, 1));

				&:last-child {
					background: linear-gradient(to right, rgba(153, 153, 153, 1), rgba(153, 153, 153, .2));
				}

				i {
					width: rem(6);
					height: rem(6);
					background: #CA9F75;
					position: absolute;
					top: rem(-3);
					right: 0;
					transform: rotate(-60deg);
				}

				.driving-title-l {
					right: auto;
					left: 0;
				}
			}

			h3 {
				margin: 0 rem(5);
			}
		}


		.driving-slide {
			overflow: hidden;
			color: #A7A7A7;
			.driving-learn {
				display: flex;
				background: url($base-url+'/img/life-nav/bg@2x.png') no-repeat;
				background-size: 100% 100%;
				padding: rem(20);
				border-radius: rem(5);
				overflow: hidden;

				.driving-learn-img {
					width: rem(40);
					overflow: hidden;
					margin: 0 rem(20);

					img {
						width: 100%;
						vertical-align: top;
					}
				}

				.driving-learn-desc {
					flex: 1;
					color: #fff;

					h3 {
						font-size: rem(16);
						margin: rem(8) 0;
					}

					p {
						font-size: rem(14);
					}
				}
			}

			.driving-topic {
				display: flex;
				padding: rem(15) 0 rem(30);

				.driving-topic-img {
					width: rem(95);
					height: rem(60);
					overflow: hidden;
					margin-right: rem(12);

					img {
						vertical-align: top;
						width: 100%;
					}
				}

				.driving-topic-desc {
					flex: 1;

					.driving-topic-desc-tit {
						display: flex;

						div {
							flex: 1;
							color: #333;
							font-size: rem(16);
						}
						i{color: #999;}
					}

					.driving-topic-desc-xing {
						height: rem(15);
						line-height: rem(15);

						i {
							font-size: rem(14);
						}
						.active{
							color: #CA9F75;
						}
					}

					.driving-topic-desc-progress {
						display: flex;
						color: #999;
						font-size: rem(10);

						.driving-topic-desc-l {
							flex: 1;

							progress {
								border: 0;
								background: #999;
								height: rem(3);
								border-radius: rem(3);

								&::-webkit-progress-bar {
									background: transparent;
								}

								&::-webkit-progress-value {
									background: #CA9F75;
								}
							}
						/*	.driving-topic-desc-l-btn{
								background: #CA9F75;
								color: #fff;
								border-radius: 2px;
								margin-top: rem(4);
								font-size: rem(12);
							}*/
						}

						span {
							color: #CA9F75;
						}
					}
				}
			}
		}
	}

	.driving-list {
		margin-top: rem(10);
		background: #fff;
		overflow: hidden;

		.driving-list-tab {
			margin: rem(20) rem(10) rem(10);
			display: flex;
			height: rem(30);
			border: 1px solid #CA9F75;
			box-sizing: border-box;
			overflow: hidden;
			border-radius: rem(5);
			line-height: rem(30);

			div {
				flex: 1;
				text-align: center;
				font-size: rem(16);
				color: #CA9F75;
			}

			div.active {
				background: #CA9F75;
				color: #fff;
			}
		}
	}
</style>
