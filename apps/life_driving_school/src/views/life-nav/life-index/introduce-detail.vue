<template>
	<bv-home-view class='wap' :router-level='2'>
		<w-home-header :header="{
			title:{
				value: '驾照简介'
			}
		}"></w-home-header>

		<div class="bc-pd-15">
			<!--标题-->
			<div class="bc-f-20rp bc-f-b t-c">
				{{ desc.column_name }}简介
			</div>
			<!--时间-->
			<div class="bc-f-12rp bc-pd-tb-10rp bc-mg-t-6rp">
				{{ desc.update_time }}
			</div>
		</div>

		<!--文章内容-->
		<div class="article-content" style="background:rgba(244,244,244,1);">
			<ul class="bc-reset-ul">
				<li class="bc-pd-lr-16rp bc-c-f">
					<div class="bc-mg-t-16rp bc-bg-white">
						<img class="bc-w-100" :src="desc.src_img" alt="">
						<div class="bc-pd-10rp bc-t-hide" v-html="desc.content"></div>
					</div>
				</li>
			</ul>
		</div>

	</bv-home-view>
</template>

<script>
	export default {
		name: "introduce-detail",
		props: {
		},
		data() {
			return {
				desc:''
			}
		},
		components: {
		},
		methods:{
			show_data() {
				return this.$axios.get('/api/examination/info',{
					params:{
						column_id:this.$route.params.nav_id
					}
				}).then(res=>{
					console.log(res)
					this.desc = res.data.data
				})
			},
		},
		mounted() {
			this.show_data()
		}
	}
</script>

<style scoped lang="scss">

</style>
