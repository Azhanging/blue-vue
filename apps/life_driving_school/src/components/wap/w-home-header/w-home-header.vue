<template>
	<bv-header :title="title" :type="type">
		
		<!--0返回  1点通宝图标 2无 -->
		
		<template v-if="type !== 0">
			<template slot="left-control">
				<slot name="left-control">
					<div v-if="type === 1" class='bc-v-m'>
						<img class='logo' :src="$config.path.static+'/img/public/logo.png'" alt=''>
					</div>
					<div v-else></div>
				</slot>
			</template>
		</template>
		
		
		<template slot="right-control">
			<slot name="right-control">
				<div class="bc-t-r">
					<i class='iconfont iconliaotian bc-t-base bc-f-20rp bc-mg-r-10'></i>
					<i class='iconfont iconicon-test bc-t-base bc-f-20rp bc-mg-r-10'></i>
					<i class='iconfont iconfenxiang bc-t-base bc-f-20rp bc-mg-r-10' @click='$share'></i>
				</div>
			</slot>
		</template>
	
	</bv-header>
</template>

<script>
	export default {
		name: "w-home-header",
		props: {
			//左边控制
			leftControl: {
				default: '',
				type: String
			},
			//标题
			title: {
				type: [String, Function],
				default: ""
			},
			type: {
				type: Number,
				default: 0  //0返回 1点通宝图标， 2无，
			}
		},
		methods: {
			//左边控制的方法
			leftControlHandler() {
				this.$router.$routerBack(this.leftControl);
			}
		},
		mounted(){
			console.log(this.$config)
		}
	}

</script>

<style lang='scss' scoped>
	@import '@css/index.scss';
	
	.logo{
		width: rem(40);
		margin-left: rem(10);
	}
</style>