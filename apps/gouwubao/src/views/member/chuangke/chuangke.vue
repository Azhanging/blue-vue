<template>
	<bv-home-view class='wap' :router-level='2'>
		<bv-header :header="{title:{value:'创客'}}"></bv-header>

		<div class="member-top">
			<div class="member-top-portrait">
				<img src="https://image.dtb315.com/76343.jpg">
			</div>
			<div class="member-top-center">
				<div class="member-top-name">菩提花开</div>
				<div class="member-top-account member-top-desc">账号：13456789101</div>
				<div class="member-top-level member-top-desc">代理级别：省级代理</div>
				<div class="member-top-area member-top-desc">代理区域：广东省深圳市龙华区</div>
			</div>
			<div class="member-top-certificate">
				<img src="https://image.dtb315.com/326999.jpg?val=Thumb">
			</div>
			<!--<button class="member-top-btn-qhqy">
				<i class="iconfont "></i> 切换区域
			</button>-->
		</div>

		<div class="stat">
			<div class="stat-title">统计 <i class="iconfont icon-wenti"></i></div>
			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						我的会员（位）
					</div>
					<div class="stat-item-top-r">
						查看全部 <i class="iconfont "></i>
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						100
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">50</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">昨日新增</div>
							<div class="stat-item-center-r-block-amount">50</div>
						</div>
					</div>
				</div>
			</div>

			<div class="stat-item" v-if="PackUp">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						我的VIP（位）
					</div>
					<div class="stat-item-top-r">
						查看全部 <i class="iconfont "></i>
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						100
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">50</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">昨日新增</div>
							<div class="stat-item-center-r-block-amount">50</div>
						</div>
					</div>
				</div>
			</div>


			<div class="stat-item" v-if="PackUp">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						我的创客（位）
					</div>
					<div class="stat-item-top-r">
						查看全部 <i class="iconfont "></i>
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						100
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">50</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">昨日新增</div>
							<div class="stat-item-center-r-block-amount">50</div>
						</div>
					</div>
				</div>
			</div>

			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						辅导收益
					</div>
					<div class="stat-item-top-r">
						<router-link to="/member/agent/tutoring">查看全部 <i class="iconfont "></i></router-link>
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						8000.00
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">492.00</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">昨日新增</div>
							<div class="stat-item-center-r-block-amount">7000.00</div>
						</div>
					</div>
				</div>
			</div>

			<div class="stat-item">
				<div class="stat-item-top">
					<div class="stat-item-top-l">
						商城收益
					</div>
					<div class="stat-item-top-r">
						<router-link to="/member/agent/mall-income">查看全部 <i class="iconfont "></i></router-link>
					</div>
				</div>
				<div class="stat-item-center">
					<div class="stat-item-center-l">
						8000.00
					</div>
					<div class="stat-item-center-r">
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">今日新增</div>
							<div class="stat-item-center-r-block-amount">492.00</div>
						</div>
						<div class="stat-item-center-r-block">
							<div class="stat-item-center-r-block-title">昨日新增</div>
							<div class="stat-item-center-r-block-amount">7000.00</div>
						</div>
					</div>
				</div>

				<div class="stat-item-ForThe">
					<div class="stat-item-ForThe-l">待结算收益：<strong>5000.00</strong></div>
					<div class="stat-item-ForThe-r"><router-link to="/member/agent/for-the">查看更多 &gt;</router-link></div>
				</div>

			</div>


			<div class="stat-history" @click="btn_PackUp">
				<a>{{ PackUpTxt }} <i class="iconfont" :class="PackUp? 'icon-Group-1':'icon-Group-'"></i></a>
			</div>
		</div>

		<div class="support">
			<div class="support-title">运营支持</div>
			<div class="support-box">
				<div class="support-item" v-for="item in supportList">
					<router-link to="">
						<i class="iconfont">1</i>
						<div>{{ item.title}}</div>
						<i class="iconfont icon-right"></i>
					</router-link>
				</div>
			</div>
		</div>

		<div class="tool">
			<div class="tool-title">我的工具</div>
			<div class="tool-box">
				<div class="tool-item" v-for="item in toolList">
					<div class="tool-item-font">
						<img :src="item.src">
					</div>
					<div class="tool-item-name">
						{{ item.name }}
					</div>
				</div>
			</div>
		</div>

		<div class="recommend">
			<div class="recommend-title">每日推荐</div>
			<div class="recommend-banner">
				<router-link to="">
					<img src="http://image.dtb315.com/5217013.jpg"/>
				</router-link>
				<router-link to="">
					<img src="http://image.dtb315.com/5217013.jpg"/>
				</router-link>
			</div>

			<div class="recommend-list">
				<div class="recommend-list-item" v-for="i in 3">
					<div class="recommend-list-item-l">
						<router-link to="">
							<img src="https://image.dtb315.com/1478964.jpg">
						</router-link>
					</div>
					<div class="recommend-list-item-r">
						<router-link to="">
							<div class="recommend-list-item-r-name">
								谷丰一木 软抽面巾纸 谷丰一木
								软抽面巾纸
							</div>
							<div class="recommend-list-item-r-tkf">
								推广赚4.69元
							</div>
						</router-link>
						<div class="recommend-list-item-r-gd">
							<div class="recommend-list-item-r-gdprice">¥544</div>
							<div class="recommend-list-item-r-gdbtn">
								<button>素材</button>
								<button class="share-btn">分享</button>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "chuangke",
		data() {
			return {
				supportList:[
					{title:'平台介绍'},
					{title:'团队管理'},
					{title:'成功案例'},
					{title:'常见问答'},
					{title:'实体对接'},
					{title:'平台对接'},
					{title:'课程培训'},
					{title:'会议支持'},
				],
				toolList:[
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'招募创客'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'招募vip'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'每日必做'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'引流工具'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'课程活动'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'物料下载'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'我的社群'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'素材圈'},
					{src:'http://pc.lifest.dtb315.cn/static/img/students/wodeshoucang@2x.png',name:'客服咨询'},
				],
				PackUp:false,
				PackUpTxt:'展开',
			}
		},
		methods: {
			btn_PackUp() {
				if(this.PackUp==false){
					this.PackUp=true
					this.PackUpTxt='收起'
				}else{
					this.PackUp=false
					this.PackUpTxt='展开'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.wap{
		background: #f4f4f4;
	}
	@import "@css/member.scss";
</style>
