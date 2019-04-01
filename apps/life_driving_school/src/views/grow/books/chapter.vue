<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>
		<w-home-header :header="{
			title:{
				value: '第一篇 观念'
			}
		}"></w-home-header>

		<div class="bc-reset-ul bc-media chapter-box">
			<div class="bc-mg-b-10rp">
				<a class="t-333" href="">
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
				</a>
			</div>

		</div>

		<div class="driving-title">
			<div><i class="driving-title-r"></i></div>
			<h3>第一章 “大中医”哲学观</h3>
			<div><i class="driving-title-l"></i></div>
		</div>

		<div class="bc-reset-ul bc-media chapter-box-f">
			<div class="bc-pd-b-10rp bc-pd-t-10rp chapter-border" v-for="i in 3">
				<a class="t-333" href="">
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
				</a>
			</div>
		</div>

		<div class="driving-title">
			<div><i class="driving-title-r"></i></div>
			<h3>第二章 “大健康”实践论</h3>
			<div><i class="driving-title-l"></i></div>
		</div>

		<div class="bc-reset-ul bc-media chapter-box-f">
			<div class="bc-pd-b-10rp bc-pd-t-10rp chapter-border" v-for="i in 3">
				<a class="t-333" href="">
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
				</a>
			</div>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "chapter"
	}
</script>

<style scoped lang="scss">
	.chapter-box{
		background: #fff;
		padding: rem(15) rem(15) 0;
	}
	.chapter-box-f{
		background: #fff;
		padding: 0 rem(15);
		.chapter-border{
			border-bottom: 1px solid #e5e5e5;
		}
	}
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
			font-weight: normal;
		}
	}
	.tuijian-article-img {
		width: rem(120);
		height: rem(80);
		vertical-align: top;
	}
</style>