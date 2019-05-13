<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		<div class="vip-header">
			<div class="vip-header-l" @click="$router.go(-1)">
				<i class="icon icon-left"></i>
			</div>
			<div class="vip-header-txt">
				<div class="vip-header-txt-tit">
					<input type="text" placeholder="搜索直推会员">
				</div>
				<div class="vip-header-txt-btn">
					<i class="icon icon-sousuo"></i>
				</div>
			</div>
		</div>
		
		<div class="vip-nav">
			<span>
				直邀会员
				<i></i>
			</span>
		</div>
		<StatisticsItem2 class="item-box bc-pd-t-10rp" :options="{
	    otherNum:[{
	      name:'总人数',
	      num: 0
	    },{
	      name:'今日新增',
	      num: 0
	    },{
	      name:'七天新增',
	      num: 0
	    },{
	      name:'30天新增',
	      num: 0
	    }]
		}"/>
		
		<div class="bc-bg-white">
			<div class="bc-flex bc-pd-10rp bc-f-14rp bc-t-666 bc-bd-b-e5e">
				<div class="bc-flex-1">会员类型</div>
				<div class="arr-type-set">
					<select>
						<option>全部</option>
					</select>
					<i class="icon icon-xiala"></i>
				</div>
			</div>
			
			<div class="bc-pd-15rp bc-bd-b-e5e " v-for="i in 3">
				<div class="bc-flex bc-pd-b-15rp arr-type-item">
					<div class="arr-type-img">
						<img src="https://image.dtb315.com/328890.jpg?val=Thumb">
					</div>
					<div class="bc-pd-l-10rp bc-t-666 bc-f-12rp">
						<div class="bc-pd-t-3rp">手机号：135111111117</div>
						<div class="bc-pd-t-3rp">昵称：135111111117</div>
						<div class="bc-pd-t-3rp">身份：点评天使</div>
						<div class="bc-pd-t-3rp">注册时间：2019-03-05</div>
					</div>
					<div class="arr-type-ab">
						<a>添加为好友</a>
					</div>
				</div>
				
				<div class="arr-type-b bc-bg-f4f">
					<div class="bc-pd-t-10rp bc-t-999">通宝消费总额</div>
					<div class="bc-pd-t-5rp bc-pd-b-10rp bc-t-333 bc-f-16rp">6000.00</div>
				</div>
			</div>
			
			
		</div>
		
	</bv-home-view>
</template>

<script>
	import StatisticsItem2 from '../components/statistics-item2'
	export default {
		name: "invitation-vip",
		components: {
			StatisticsItem2
		},
		computed: {},
		data() {
			return {}
		},
		methods: {
		
		},
		mounted() {
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #F4F4F4;
	}
.vip-header{
	display: flex;
	height: rem(35);
	position: static;
	top:0;
	left: 0;
	right: 0;
	padding: rem(10) rem(20) rem(10) rem(5);
	align-items: center;
	.vip-header-l{
		margin-right: rem(10);
	}
	.vip-header-txt{
		flex: 1;
		height: rem(35);
		background: #fff;
		display: flex;
		border-radius: rem(15);
		overflow: hidden;
		align-items: center;
		padding-right: rem(10);
		.vip-header-txt-tit{
			flex: 1;
			input[type='text']{
				width: 100%;
				border: 0;
				box-sizing: border-box;
				padding: 0 rem(15);
				line-height: rem(35);
			}
		}
		
	}
}
	.vip-nav{
		text-align: center;
		padding: rem(15);
		position: relative;
		span{
			color: #DCB46E;
			position: relative;
			display: inline-block;
			i{
				height: 2px;
				width: rem(30);
				background: #DCB46E;
				position: absolute;
				left: 50%;
				top:rem(22);
				margin-left: rem(-15);
			}
		}
	}
	.arr-type-set{
		color: #DCB46E;
		select{
			border: 0;
			color: #DCB46E;
		}
	}
	.arr-type-img{
		width: rem(85);
		img{
			width: 100%;
		}
	}
	.arr-type-item{
		position: relative;
		.arr-type-ab{
			position: absolute;
			right: 0;
			top:rem(25);
			a{
				border: 1px solid #DDB67E;
				color: #DDB67E;
				padding: rem(8);
				border-radius: rem(20);
			}
		}
	}
	.arr-type-b{
		text-align: center;
	}
	
</style>