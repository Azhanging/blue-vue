<template>
	<bv-home-view class='wap bc-bg-f4f' :router-level='3'>
		
		<!--文章内容-->
		<w-article-detail ecsytype="ecosystemLevel" :header="{
				title:{
					value: title
				}
			}" :opts="opts" :leftControl="`/#/`"
		></w-article-detail>
		
		
		<!--相关资讯-->
		<div class="bc-bg-white bc-mg-t-10rp" v-if="information">
			<div class="bc-pd-lr-15rp bc-pd-t-15rp bc-flex">
				<div class="bc-flex-1 bc-t-333 bc-f-16rp bc-f-b">相关资讯</div>
				<div><router-link class="bc-f-12rp bc-t-999" :to="`${currentFullPath}/more-infor`">更多<i class="iconfont iconyou"></i></router-link></div>
			</div>
			<div class="bc-pd-lr-15rp">
				<list-item :list="information"></list-item>
			</div>
		</div>
		
		<!--相关课程-->
		<div class="bc-bg-white bc-mg-t-10rp" v-if="course">
			<div class="bc-pd-lr-15rp bc-pd-t-15rp bc-flex">
				<div class="bc-flex-1 bc-t-333 bc-f-16rp bc-f-b">相关课程</div>
				<div><router-link class="bc-f-12rp bc-t-999" :to="`${currentFullPath}/more-course`">更多<i class="iconfont iconyou"></i></router-link></div>
			</div>
			<div class="bc-pd-lr-15rp">
				<list-item :list="course"></list-item>
			</div>
		</div>
		
		<!--相关服务-->
		<div class="bc-bg-white bc-mg-t-10rp" v-if="service">
			<div class="bc-pd-lr-15rp bc-pd-t-15rp bc-flex">
				<div class="bc-flex-1 bc-t-333 bc-f-16rp bc-f-b">相关服务</div>
				<div><router-link class="bc-f-12rp bc-t-999" :to="`${currentFullPath}/more-serve`">更多<i class="iconfont iconyou"></i></router-link></div>
			</div>
			<div class="bc-pd-t-15rp">
				<div class="bc-bd-tb-e5e bc-flex bc-flex-ai-c">
					<div class="bc-flex-1 bc-bd-l-e5e bc-pd-15rp bc-t-c service_list" v-for="item in service">
						<a :href="item.url_text" class="bc-t-333 bc-f-14rp">
							{{ item.title }}
							<img :src="item.image" class="service_list_img">
						</a>
					</div>
				</div>
			</div>
		</div>
		
		<!--相关产品-->
		<div class="bc-bg-white bc-mg-t-10rp" v-if="goods">
			<div class="bc-pd-lr-15rp bc-pd-t-15rp bc-flex">
				<div class="bc-flex-1 bc-t-333 bc-f-16rp bc-f-b">相关产品</div>
				<div><router-link class="bc-f-12rp bc-t-999" :to="`${currentFullPath}/more-product`">更多<i class="iconfont iconyou"></i></router-link></div>
			</div>
			
			<product-item types="productItem" :goods="goods"></product-item>
			
		</div>
		
	</bv-home-view>
</template>

<script>
	import WArticleDetail from '@components/wap/article/w-article-detail';
	import ListItem from '@components/wap/list-item/list-item.vue'
	import ProductItem from '@components/wap/list-item/product-item.vue'
	export default {
		name: "ecosystem-tow-detail",
		components: {
			'w-article-detail': WArticleDetail,
			'list-item':ListItem,
			'product-item':ProductItem
		},
		computed: {
			currentFullPath(){
				return this.$router.currentRoute.fullPath;
			}
		},
		data() {
			return {
				opts: {
					url: {
						contentUrl: '/api/column_ecosphere/info'
					},
					data: {
						contentParams: {// 文章内容 请求参数
							article_id: this.$route.params.tow_nav_detail_id
						},
						commentParams: { // 评论内容 请求参数
							article_id: this.$route.params.tow_nav_detail_id,
							data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
						},
						submitCommentParams: { // 提交评论 请求参数 只需第一个
							article_id: this.$route.params.tow_nav_detail_id,
							data_id: 1 // data_id带类型1文章,2书籍3,问答专区评论
						}
					}
				},
				service:'',
				goods:'',
				information:'',
				course:'',
				title:'',
				
			}
		},
		methods: {
			column_ecosphere(){
				this.$axios.get('/api/column_ecosphere/list_info',{
					params:{
						article_id:this.$route.params.tow_nav_detail_id
					}
				}).then(res=>{
					let { information,course,service,goods } = res.data;
					this.information = information;
					this.course = course;
					this.service = service;
					this.goods = goods;
				})
			},
			show_title(){
				this.$axios.get('/api/Classify/column_ecosphere',{
					params:{
						column_id:this.$route.params.tow_nav_detail_id
					}
				}).then(res=>{
					this.title = res.data
					sessionStorage.removeItem('EcosystemtowTitle');
					sessionStorage.setItem('EcosystemtowTitle', this.title);
				})
			}
		},
		mounted() {
			this.column_ecosphere();
			this.show_title();
		}
	}
</script>

<style scoped lang="scss">
.bc-bg-f4f{
	background: #F4F4F4;
}
.service_list{
	&:first-child{
		border-left: 0;
	}
	.service_list_img{
		width: rem(30);
		vertical-align: middle;
		overflow: hidden;
	}
}

</style>