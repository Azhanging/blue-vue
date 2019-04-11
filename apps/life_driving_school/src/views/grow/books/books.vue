<template>
	<bv-home-view class='wap' :router-level='3' style='background-color: #f4f4f4;'>

		<div class="books-top">
			<div class="books-top-btn">
				<a @click='$router.back()'>
					<i class="iconfont iconxiangzuo"></i>
				</a>
			</div>
			<div class="books-top-box">
				<div class="books-top-box-l">
					<img :src="infos.src_img">
				</div>
				<div class="books-top-box-r">
					<div class="books-top-box-r-title">{{ infos.name }}</div>
					<div class="books-top-box-r-desc">
						<div>
							篇数<br>
							<strong v-if="infos.festival">{{ infos.festival }}</strong>
							<strong v-else>0</strong>
						</div>
						<div>
							文章<br>
							<strong>{{ infos.num }}</strong>
						</div>
						<div>
							阅读<br>
							<strong>{{ infos.read }}</strong>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="books-lists">
			<router-link :to="{path:'/grow/books/chapter'+'?id='+item.id}" class="books-list-item" v-for="(item,index) in lists">
				<div class="books-list-item-l">
					<h3><span>{{item.name}}</span><!--观念--></h3>
					<p><span>{{ item.chapter }}</span>个章节</p>
				</div>
				<div class="books-list-item-r">
					<i class="iconfont iconyou"></i>
				</div>
			</router-link>

		</div>

	</bv-home-view>
</template>

<script>
	import router from '@router';
	export default {
		name: "books",
		computed:{
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		data() {
			return {
				lists:[],
				infos:[]
			}
		},
		methods: {
			festivalList() {
				return this.$axios.get('/api/book/festivalList',{
					params: {
						id: this.$route.query.id
					}
				}).then((res)=>{
					console.log(res.data.data)
					this.infos = res.data.data.info;
					this.lists = res.data.data.list;
				}).catch((err)=>{
					console.log(err);
				})
			}
		},
		mounted(){
			this.festivalList();
		}
	}
</script>

<style scoped lang="scss">
	h3,p{margin: 0;padding: 0;}
.books-top{
	background: url("http://pc.lifest.dtb315.cn/static/img/grow/grow4@2x.png") no-repeat;
	background-size: 100% 100%;
	color: #fff;
	position: relative;
	.books-top-btn{
		position: absolute;
		left: rem(15);
		top:rem(15);
		z-index: 9;
	}
	.books-top-box{
		padding: rem(44) rem(15) 0;
		.books-top-box-l{
			position: absolute;
			left: rem(15);
			width: rem(80);
			height: rem(115);
			overflow: hidden;
			box-shadow: 0 1px rem(3) #ccc;
			img{
				width: 100%;
				min-height: 100%;
				vertical-align: top;
			}
		}
		.books-top-box-r{
			margin-left: rem(110);
			.books-top-box-r-title{
				font-size: rem(18);
			}
			.books-top-box-r-desc{
				display: flex;
				padding: rem(12) 0;
				font-size: rem(14);
				text-align: center;
				div{
					margin-right: rem(35);
					strong{
						font-size: rem(16);
						margin-top: rem(4);
						display: block;
					}
				}
			}
		}
	}
}

.books-lists{
	overflow: hidden;
	margin-top: rem(45);
	.books-list-item{
		background: #fff;
		border-left: rem(10) solid #CA9F75;
		display: flex;
		margin-bottom: rem(15);
		padding-left: rem(20);
		padding-right: rem(15);
		align-items: center;
		color: #666;
		.books-list-item-l{
			flex: 1;
			padding: rem(10) 0;
			h3{
				font-size: rem(16);
				color: #333;
				span{margin-right: rem(15);}
			}
			p{
				font-size: rem(12);
				color: #999;
				margin-top: rem(8);
			}
		}
		.books-list-item-r{

		}
	}
}
</style>
