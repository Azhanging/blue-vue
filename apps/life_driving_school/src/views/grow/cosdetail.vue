<template>
	<bv-home-view class='wap' :router-level='3'>
		
		<wDetail :detail='detailData' :header='header'>
		
		</wDetail>
		
	</bv-home-view>
	

</template>

<script>
	import wDetail from '@components/wap/article/w-article-detail.vue'
	export default {
		props:{
		},
		components:{
			wDetail
		},
		data() {
			return {
				header: {
					title:{
						value:'课程详情'
					}
				},
				detailData:{
					title:'三维空间挺好玩',
					time:545457545,
					content:'内容',
					readers:20,
					support:52
				}
			}
		},
		mounted(){
			let id = this.$route.query.id
		}
	}
</script>

