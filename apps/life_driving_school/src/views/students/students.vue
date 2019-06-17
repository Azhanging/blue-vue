<template>
	<bv-home-view class='wap' :router-level='1' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "学员中心"
            }
        }' :leftControl="`/`"
		>
			<div slot="right-control">
				<div class="bc-t-r">
					<router-link to="/students/message">
						<i class='iconfont iconxiaoxi bc-mg-r-10rp bc-t-base bc-ps-r dot-box'><span v-if="show_mes"></span></i>
					</router-link>
				</div>
			</div>
		</w-home-header>

		<div class="students-top">
			<div class="students-top-box">
				<div class="students-top-box-l">
					<a @click="to_sm()">
						<div class="students-top-box-img"><img :src="userInfo.head_img"></div>
						<div class="students-top-box-ewm iconfont iconico"></div>
					</a>
					<!--<router-link :to="`https://pc.dtb315.cn/common/weixinshaoma.html?id=${userInfo.id}&phone=${userInfo.phone}&role_type=${userInfo.role11}`">&lt;!&ndash;/students/qr-code&ndash;&gt;

					</router-link>-->
				</div>
				<div class="students-top-box-c">
					<div class="students-top-box-tit">{{ userInfo.nickname }}</div>
					<div class="students-top-box-p">账号：{{ userInfo.phone || '未绑定' }}</div>
				</div>
				<div class="students-top-box-r">
					<div><router-link to="/sign" class="students-top-box-btn"></router-link></div><!--签到-->
					<button class="students-top-box-jf">积分：<strong>{{ userInfo.points || 0.00 }}</strong></button>
				</div>
			</div>
		</div>

		<div class="students-progress">
			<div class="progress-title">学习进度</div>
			<div class="progress-li" v-for="item in progress_Data">
				<router-link :to="$router.routerID.getPathID({
						id: item.id,
						params:{
							nav_id: item.id
						}
					})">
					<div class="progress-li-name">
						《{{ item.name }}》：
						{{ item.phases_name }}
						{{item.course_name}}
					</div>
					<div class="progress-li-box">
						<div class="progress-li-box-item" :class="item.plan_num>=1?'back1':''"></div>
						<div class="progress-li-box-item" :class="item.plan_num>=2?'back2':''"></div>
						<div class="progress-li-box-item" :class="item.plan_num>=3?'back3':''"></div>
					</div>
				</router-link>
			</div>

		</div>

		<div class="students-icon">

			<div class="students-icon-item" >
				<router-link to="/students/collection">
					<img :src="`${config.path.static}/img/students/wodeshoucang@2x.png`"/>
					<div>我的收藏</div>
				</router-link>
			</div>
			<div class="students-icon-item">
				<router-link to="/students/history">
					<img :src="`${config.path.static}/img/students/liulanlishi@2x.png`"/>
					<div>浏览历史</div>
				</router-link>
			</div>
			<div class="students-icon-item">
				<router-link to="/students/contribute">
					<img :src="`${config.path.static}/img/students/woyaotougao@2x.png`"/>
					<div>我要投稿</div>
				</router-link>
			</div>
			<div class="students-icon-item" @click="btn_show()">
				<img :src="`${config.path.static}/img/students/yaoqinghaoyou@2x.png`"/>
				<div>邀请好友</div>
			</div>
		</div>

		<div class="students-list">
			<router-link to="/students/for-points">
				<div class="students-list-box">
					<div class="students-list-title">获取积分</div>
					<i class="iconfont iconyou"></i>
				</div>
			</router-link>
			<div class="students-list-box" @click="btn_show()">
				<div class="students-list-title">线下课程</div>
				<i class="iconfont iconyou"></i>
			</div>
			<div class="students-list-box" @click="btn_show()">
				<div class="students-list-title">微信社群</div>
				<i class="iconfont iconyou"></i>
			</div>
			<router-link to="/students/feedback">
				<div class="students-list-box">
						<div class="students-list-title">问题反馈</div>
						<i class="iconfont iconyou"></i>
				</div>
			</router-link>
		</div>

		<template slot="other">
			<!-- 绑定手机号 -->
			<bv-bind-phone :show-bind-phone-status="showBindPhoneStatus" @close-bind-phone="closeBindPhone"/>
		</template>

	</bv-home-view>
</template>

<script>
	import router from '@router';
	import programUrl from '@config/program-url'
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "students",
		data() {
			return {
				//绑定手机的状态
				showBindPhoneStatus: (() => {
					return router.currentRoute.fullPath === '/students';
				})(),
				progress_Data:'',
				show_mes: ''
			}
		},
		watch:{
			$route(to,from){
				if(from.path != '/students'){
					this.show_message();
				}
			}
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			},
			userInfo(){
				return this.$store.state.userInfo;
			}
		},
		methods: {
			closeBindPhone() {
				this.showBindPhoneStatus = false;
			},
			progressData(){
				this.$axios.get('/api/study/getLicensePlan',{
					params:{
					}
				}).then(res => {
					//console.log(res.data)
					this.progress_Data = res.data
				})
			},
			show_message(){
				this.$axios.get('/api/Member_Index/index',{
				}).then(res=>{
					this.show_mes = res.data
					//console.log(res.data)
				})
			},
			to_sm(){
				location.href = programUrl['gou-wu-bao']+'/common/weixinshaoma.html'
			},
			btn_show(){
				$toast({
					message: '敬请期待',
					duration: 3000
				},);
			}
		},
		mounted() {
			this.progressData();
			this.show_message()
		}
	}
</script>

<style scoped lang="scss">
.students-top{
	background: #46505A;
	padding: rem(20) rem(15) 0;
	.students-top-box{
		background: url($base-url+'/img/students/xyzxbg@2x.png') no-repeat;
		background-size: 100% 100%;
		padding: rem(20) rem(15);
		display: flex;
		.students-top-box-l{
			width: rem(60);
			position: relative;
			margin-right: rem(15);
			height: rem(60);
			.students-top-box-img{
				border: 2px solid #fff;
				border-radius: 100%;
				overflow: hidden;
				height: rem(60);
				box-sizing: border-box;
				img{width: 100%;min-height: 100%;vertical-align: top;}
			}
			.students-top-box-ewm{
				position: absolute;
				right: 0;
				bottom: 0;
				color: #9D8563;
				font-size: rem(16);
			}
		}
		.students-top-box-c{
			flex: 1;
			.students-top-box-tit{
				margin-top: rem(8);
				color: #333333;
				font-size: rem(18);
			}
			.students-top-box-p{
				color: #CDA669;
				font-size: rem(12);
				white-space:nowrap;
				margin-top: rem(3);
			}
		}
		.students-top-box-r{
			text-align: right;
			.students-top-box-btn{
				background: url($base-url+'/img/students/students@2x.png') no-repeat;
				background-size: 100%;
				height: rem(30);
				line-height: rem(30);
				width: rem(60);
				text-align: center;
				font-size: rem(14);
				color: #fff;
				display: inline-block;
			}
			.students-top-box-jf{
				margin-top: rem(3);
				color: #666;
				font-size: rem(12);
				strong{
					font-size: rem(18);
					color: #333;
				}
			}
		}
	}
}
.students-progress{
	background: #fff;
	padding: 0 rem(15);
	overflow: hidden;
	.progress-title{
		padding: rem(20);
		text-align: center;
		font-size: rem(16);
		color: #333;
	}
	.progress-li{
		margin-bottom: rem(20);
		.progress-li-name{
			font-size: rem(12);
			color: #666;
		}
		.progress-li-box{
			background: #e5e5e5;
			height: rem(10);
			margin-top: rem(8);
			border-radius: rem(5);
			display: flex;
			overflow: hidden;
			.progress-li-box-item{
				flex: 1;
				&.back1{
					background: #CA9F75;
				}
				&.back2{
					background: #DAB189;
				}
				&.back3{
					background: #EFC9A4;
				}
			}
		}
	}
}
.students-icon{
	background: #fff;
	overflow: hidden;
	margin: rem(10) 0;
	display: flex;
	.students-icon-item{
		flex: 1;
		padding: rem(20) rem(10);
		text-align: center;
		a{display: block;}
		img{
			width: rem(40);
			height: rem(40);
		}
		div{
			color: #666;
			font-size: rem(14);
			margin-top: rem(3);
		}
	}
}
.students-list{
	background: #fff;
	.students-list-box{
		border-bottom: 1px solid #e5e5e5;
		padding: rem(15);
		display: flex;
		color: #666;
		.students-list-title{
			flex: 1;
			color: #333;
			font-size: rem(16);
		}
	}
}

	.dot-box span{
		position: absolute;
		right: -1px;
		top: -1px;
		width: 6px;
		height: 6px;
		background: #fa0000;
		border-radius: 100%;
	}
</style>
