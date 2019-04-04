<template>
	<div class="life-nav-list">
		<div class='bc-flex courseList bc-pd-tb-10rp' v-for='i in 2'>
			<div class="driving-radio">
				<input type="radio" checked id="driv-radio">
				<label for="driv-radio" class="iconfont iconxuanzhong"></label>
			</div>
			<img class='bc-mg-r-10rp' src='https://pc.dtb315.cn/Static//pc/home/images/index/index/carbon-shop.png?v=rjzw0t' alt=''>
			<div class='bc-flex-1 bc-flex bc-flex-d-c bc-flex-jc-sb'>
				<span class='bc-f-16rp bc-t-ellipsis bc-t-ellipsis-2'>精选标题精选标题精选标题精选标题精选标题精选标题</span>
				<div class='bc-flex bc-flex-jc-sb bc-t-999'>
					<div class='bc-f-12rp'>
						<i class='iconfont iconeye- bc-f-12rp'></i>&nbsp;
						<span>222</span>
					</div>
					<span class=' bc-f-12rp'>{{1548946491687 | timeFilter}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "driving-list",
		data() {
			return {
				list: [{id: '1'}, {id: '2'}, {id: '3'}]
			}
		}
	}
</script>

<style scoped lang="scss">

	.life-nav-list {
		overflow: hidden;
		.courseList{
			border-bottom: 1px #e5e5e5 solid;
			position: relative;
			img{
				width: rem(120);
				height: rem(80);
				vertical-align: top;
			}
		}
	}
	.driving-radio {
		position: absolute;
		left: rem(8);
		top: rem(14);
		input[type="radio"] {
			position: absolute;
			clip: rect(0, 0, 0, 0);
			opacity: 0;
		}
	}
</style>
