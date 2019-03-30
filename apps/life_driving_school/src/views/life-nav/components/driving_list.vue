<template>
	<div>
		<div class="driving_li" v-for="item in list">
			<div class="driving_li_img">
				<div class="driving_radio">
					<input type="radio" checked id="driv_radio">
					<label for="driv_radio" class="iconfont iconxuanzhong"></label>
				</div>

				<img src="https://image.dtb315.com/31713.jpg?val=Thumb">
			</div>
			<div class="driving_li_desc">
				<h3>精选短课标题精选短课标题精 选短课标题</h3>
				<div class="driving_li_view">
					<div class="driving_li_view_l"><i class="iconfont iconeye-"></i>584</div>
					<div class="driving_li_view_r">2019-03-26</div>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: "driving_list",
		data() {
			return {
				list: [{id: '1'}, {id: '2'}, {id: '3'}]
			}
		}
	}
</script>

<style scoped lang="scss">
	h3, p {
		margin: 0;
		padding: 0;
	}

	.driving_li {
		display: flex;
		padding: 10px 0;
		border-bottom: 1px solid #e5e5e5;

		&:first-child {
			padding-top: 0;
		}

		.driving_li_img {
			width: 120px;
			height: 80px;
			overflow: hidden;
			margin-right: 15px;
			position: relative;

			img {
				width: 100%;
				vertical-align: top;
			}

			.driving_radio {
				position: absolute;
				left: 8px;
				top: 8px;
				/*input[type="radio"] + label::before {
						content: "\a0"; !*不换行空格*!
						display: inline-block;
						vertical-align: middle;
						font-size: 18px;
						width: 1em;
						height: 1em;
						margin-right: .4em;
						border-radius: 50%;
						border: 1px solid #01cd78;
						text-indent: .15em;
						line-height: 1;
				}*/
				/*input[type="radio"]:checked + label::before {
						background-color: #01cd78;
						background-clip: content-box;
						padding: .2em;
				}
				*/
				input[type="radio"] {
					position: absolute;
					clip: rect(0, 0, 0, 0);
					opacity: 0;
				}
			}
		}

		.driving_li_desc {
			flex: 1;

			h3 {
				height: 40px;
				font-size: rem(16);
				font-weight: normal;
				color: #333;
				line-height: 20px;
			}

			.driving_li_view {
				display: flex;
				font-size: rem(12);
				color: #999;
				margin-top: 22px;

				.driving_li_view_l {
					flex: 1;

					i {
						font-size: rem(12)
					}
				}
			}
		}
	}
</style>