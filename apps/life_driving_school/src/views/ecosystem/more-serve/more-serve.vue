<template>
	<bv-home-view class='wap bc-bg-f4f' :router-level='3'>
		<w-ecosystem-tab :title='{
            title:{
                value: EcosystemtowTitle
            }
        }' :ecosystem-index="3" :leftControl="`/tow-nav/${$route.params.tow_nav_id}/tow-nav-detail/${$route.params.tow_nav_detail_id}`"></w-ecosystem-tab>
		
		<div class="bc-mg-lr-38rp bc-mg-t-15rp" v-if="service_list">
			<div v-for="item in service_list">
				<a :href="item.url_text">
					<div class="bc-bg-white bc-flex bc-flex-ai-c bc-t-c serve-box bc-mg-b-10rp">
						<div class="bc-flex-1">
							<div class="serve-img">
								<img :src="item.image">
							</div>
						</div>
						<div class="bc-flex-2 bc-t-333 bc-f-18rp">{{ item.title }}</div>
					</div>
				</a>
			</div>
		</div>
		<div style="text-align: center;padding: 15px" v-else>暂无数据</div>
		
	</bv-home-view>
</template>

<script>
	import wEcosystemTab from "@components/wap/ecosystem/w-ecosystem-tab";
	export default {
		name: "more-serve",
		components: {
			'w-ecosystem-tab': wEcosystemTab
		},
		computed: {
			EcosystemtowTitle(){
				return sessionStorage.getItem('EcosystemtowTitle');
			}
		},
		data() {
			return {
				service_list:''
			}
		},
		methods: {
			ecosystem_servive(){
				this.$axios.get('/api/ecosystem_service/index',{
					params:{
						column_ecosphere_id:this.$route.params.tow_nav_detail_id
					}
				}).then(res=>{
					this.service_list = res.data.list;
				})
			},
		},
		mounted() {
			this.ecosystem_servive();
		}
	}
</script>

<style scoped lang="scss">
	.bc-bg-f4f{background: #F4F4F4;}
	.serve-box{
		border: 1px solid #DCB46E;
		border-radius: rem(3);
		padding: rem(10);
		.serve-img{
			display: inline-block;
			width: rem(40);
			img{width: 100%;}
		}
	}
</style>