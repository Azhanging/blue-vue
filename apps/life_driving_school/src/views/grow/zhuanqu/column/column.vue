<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>

		<w-home-header :header="{
			title:{
				value:'国学'
			}
		}"></w-home-header>

		<div class="bc-reset-ul bc-media column-list">
			<div class="bc-pd-b-10rp bc-pd-t-10rp column-item" v-for="item in lists">
				<router-link :to="`${currentFullPath}/album`" class="t-333">
					<div class="bc-media pd-t-15 bc-row bc-c-f">
						<div class="bc-media-left">
							<img class="tuijian-article-img" src="https://image.dtb315.com?src_img=/Uploads/image/2016-09-13/57d754e3c0a71.jpg&val=Thumb" v-if="">
						</div>
						<div class=" bc-media-body bc-pd-r-10  bc-flex bc-flex-d-c bc-flex-jc-sb" style="min-height:80px;">
							<div class=" bc-f-16rp bc-t-333 bc-f-b">开篇语 阻击摧残生命的五大“杀手”</div>
							<div class=" bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2">
								文章内容前面部分文章内容前面部分文
								章内容前面部分文章内容前面部分文...
							</div>
						</div>
					</div>
				</router-link>
			</div>
		</div>




	</bv-home-view>
</template>

<script>
	import router from '@router';
	export default {
		name: "special",
		components:{
		},
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		data() {
			return {
				lists:[
					{},{},{}
				]
			}
		},
		methods:{

		},
		mounted(){
		}
	}
</script>

<style lang='scss' scoped>
	.tuijian-article-img {
		width: rem(120);
		height: rem(80);
		vertical-align: top;
	}
	.column-list{
		.column-item{
			background: #fff;
			margin-bottom: 10px;
			padding: 15px;
		}
	}
</style>
