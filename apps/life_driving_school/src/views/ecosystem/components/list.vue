<template>
	<div class="expense_list_li">
		<div class="expense_list_img">
			<img src="https://image.dtb315.com/326999.jpg?val=Thumb">
		</div>
		<div class="expense_list_desc">
			<h3>精选短课标题精选短课标题精 选短课标题</h3>
			<div class="expense_list_p">
				<div class="expense_list_p_view">
					<i class="iconfont iconeye-"></i>&nbsp;584
				</div>
				<div class="expense_list_p_Time">
					2019-03-26{{ itemL[0] }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "list",
		props: {
			itemL: {
				type: Object,
				default: {}
			}
		},
	}
</script>

<style scoped lang="scss">
	ul, h3 {
		margin: 0;
		padding: 0
	}

	.expense_list {
		overflow: hidden;

		.expense_list_li {
			display: flex;
			border-bottom: 1px solid #E5E5E5;
			padding: 15px;

			&:first-child {
				padding-top: 0;
			}

			.expense_list_img {
				width: 120px;
				margin-right: 15px;
				height: 80px;
				overflow: hidden;

				img {
					width: 100%;
					vertical-align: top;
				}
			}

			.expense_list_desc {
				flex: 1;

				h3 {
					height: 40px;
					font-size: 16px;
					font-weight: normal;
					color: #333;
					line-height: 20px;
					overflow: hidden;
				}

				.expense_list_p {
					height: 20px;
					line-height: 20px;
					overflow: hidden;
					margin-top: 20px;
					font-size: 12px;
					color: #999;
					display: flex;

					.expense_list_p_view {
						flex: 1;

						i {
							font-size: 12px;
						}
					}

					.expense_list_p_Time {
					}
				}
			}
		}
	}
</style>