<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>
		
		<bv-header :header="{title:{value:'公益分校办公室'}}"/>
		
		<div class="angel-header bc-flex" v-if="couresData">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp">
				<img :src="couresData.memberImg" alt="" class="head-img">
			</div>
			<div class="bc-flex-3">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-30rp bc-f-b">
					公益分校
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					入驻时间：{{ couresData.create_time }}
				</div>
			</div>
			<div class="angel-sm bc-mg-t-44rp bc-mg-b-44rp">
				<a @click="btn_toast">
					公益分校说明
					<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-t-10rp bc-mg-b-10rp bc-pd-b-10rp">
			<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp">
				<div class="bc-f-b">发布课程活动</div>
			</div>
			<div class="bc-pd-l-15rp bc-pd-r-15rp">
				<div class="bc-f-12rp bc-mg-b-5rp bc-t-999">请使用电脑登陆“综合办公室”发布活动</div>
				<div class="bc-f-12rp bc-t-999">链接：<span id="inviteCode">{{ copyHref }}</span></div>
			</div>
			<div class="bc-pd-t-10rp bc-t-c">
				<button class="btn-copy" @click="onCopy()">复制链接</button>
			</div>
		</div>
	
	
	</bv-home-view>
</template>

<script>
	import { $toast } from "$use-in-vue/mint-ui/toast";
	export default {
		name: "release-course",
		components: {},
		computed: {},
		data() {
			return {
				couresData:'',
				copyHref:'https://pan.baidu.com/s/1CHPcs76U-pZaLUB4mlXkAg'
			}
		},
		methods: {
			getcouresData() {
				this.$axios.get('/member/office_commonweal/release_activity').then((res) => {
					const { data } = res.data;
					this.couresData = data;
				});
			},
			onCopy() {
				var Url2 = document.getElementById("inviteCode").innerText;
				var oInput = document.createElement("input");
				oInput.value = Url2;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象
				document.execCommand("Copy"); // 执行浏览器复制命令
				oInput.className = "oInput";
				oInput.style.display = "none";
				$toast({
					message: '复制成功',
					duration: 3000
				});
			},
			btn_toast(){
				$toast({
					message: '敬请期待',
					duration: 3000
				});
			}
		},
		mounted() {
			this.getcouresData();
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
	.angel-header {
		background: #F1DFB6 url($base-static-path + '/img/member/public/bgstop-bg.jpg') right bottom no-repeat;
		background-size: auto 100%;
	.head-img {
		width: rem(60);
		height: rem(60);
		border-radius: 50%;
	}
	.angel-sm{
		background: #000;
		border-top-left-radius: rem(15);
		border-bottom-left-radius: rem(15);
		overflow: hidden;
	a{
		height: rem(28);
		line-height: rem(28);
		padding: 0 rem(10);
		color: #fff;
	}
	}
	.angel-co{
		color: #A86F2F;
	}
	}
	.angel-statistical{
		background: #fff;
		padding: rem(15) rem(20);
		border-bottom: 1px solid #e5e5e5;
		margin-top: rem(10);
		font-size: rem(16);
		color: #333;
		font-weight: bold;
	}
	.btn-copy{
		border: 1px solid #DDB67E;
		color: #DDB67E;
		font-size: rem(12);
		padding: rem(8) rem(14);
		border-radius: rem(15);
	}
</style>