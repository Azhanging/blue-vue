<template>
	<bv-home-view class='wap' :router-level='2' style="background: #f4f4f4">
		<w-home-header :header='{
            title:{
                value: "更多积分"
            }
        }'

		>
		</w-home-header>

		<div class="integral-item">
			<div class="integral-title">生命驾校</div>
			<div class="integral-box">
				<div class="integral-list">1.每日签到获得积分。</div>
				<div class="integral-list">2.邀请好友并且成功绑定手机号，获得<span>30</span>积分。</div>
				<div class="integral-list">3.资讯、精选短课、生态圈、生命导航资讯，内容转发，每次获得<span>3</span>积分。(每日前三次有效)</div>
				<div class="integral-list">4.每天第一次完成未学习的驾照课程,获得<span>10</span>积分。</div>
				<div class="integral-list">5.每阅读完一本驾校书籍，获得<span>30</span>积分。</div>
				<div class="integral-list">6.每通过一阶段的驾照课程测试，获得<span>20</span>积分。</div>
				<div class="integral-list">7.每日第一次发表内容评论，获得<span>5</span>积分。</div>
				<div class="integral-list">8.发布投稿后，平台审核通过，获得<span>10</span>积分。</div>
			</div>
		</div>
		<div class="integral-item">
			<div class="integral-title">点通宝购物商城</div>
			<div class="integral-box">
				<div class="integral-list">1.购物最高可获得消费金额的等额积分。</div>
				<div class="integral-list">2.升级成为vip，获得<span>1000</span>积分。</div>
				<div class="integral-list">3.加入创客计划，获得<span>5000</span>积分。</div>
			</div>
		</div>

		<div class="integral-but">
			<div class="integral-but-desc">
				积分使用说明：<br/>
				积分可在点通宝购物商城的积分商城中兑换精选超值的
				产品。
			</div>
			<div class="integral-but-tag">
				<a href="https://jifu.dtb315.com/carbon/liangxinzao">立即前往 <i class="iconfont icon-jiantou"></i></a>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "for-points"
	}
</script>

<style scoped lang="scss">
.integral-item{
	background: #fff;
	margin: rem(15);
	margin-bottom: 0;
	overflow: hidden;
	border-radius: rem(3);
	.integral-title{
		background: #C58D57;
		border-top: 3px solid #CA9F75;
		padding: rem(14);
		text-align: center;
		color: #fff;
		font-size: rem(18);
	}
	.integral-box{
		padding: rem(15);
		font-size: rem(14);
		color: #666;
		.integral-list{
			line-height: rem(28);
			span{color: #CA9F75;}
		}
	}
}
.integral-but{
	padding: rem(15);
	.integral-but-desc{
		font-size: rem(14);
		color: #666;
	}
	.integral-but-tag{
		text-align: right;
		a{
			color: #CA9F75;
			font-size: rem(16);
		}
	}
}
</style>
