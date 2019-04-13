<template>
	<bv-home-view class='wap' :router-level='2'>

		<w-home-header :header='{
            title:{
                value: "消费"
            }
        }'

		></w-home-header>
		<bv-scroll>
			<swiper :options="swiperOption" ref="swiper">
				<swiper-slide v-for="(slide, index) in banner" :key="index"><!--:to="{path:'driving-license/fitness-test'+'?record_id='+slide.id}"-->
					<div class="banner-img">
						<img :src="slide.src_img">
					</div>
				</swiper-slide>
				<div class="swiper-pagination" id="pagination" slot="pagination"></div>
			</swiper>
		</bv-scroll>

		<!--{{ headerTit }}-->
		<div class="growsystem-tab">
			<div v-for="(item,index) in tabNav"
				@click="tabqh(index,item.id)"
				:class="{active:(temp===index)}">
				<a>{{ item.name }}</a>
			</div>
		</div>
		<div v-if="this_id>0">
			<div v-if="!temp">
				<information :this_id="this_id"></information>
			</div>
			<div v-if="temp">
				<course :this_id="this_id"></course>
			</div>
		</div>


	</bv-home-view>
</template>

<script>
	import {scrollMixin, scrollEndHook, scrollNoHasListData} from '$scroll';
	import information from './components/information';
	import course from './components/course';

	export default {
		name: "expense",
		mixins: [scrollMixin()],
		components: {
			information,
			course,
		},
		computed:{
			headerTit(){
				let eid = $route.params.ecosystem_id;
				console.log(eid)
			}
		},
		data() {
			return {
				swiperOption: {
					pagination: {
						el: "#pagination"
					},
					loop: true
				},
				temp: 0,
				btn: [
					{title: '资讯'},
					{title: '课程'},
				],
				tabNav:'',
				banner:'',
				this_id:''
			}
		},
		methods: {
			tabqh(t,this_id) {
				this.temp = t;
				this.this_id = this_id;
			},
			nav_tab() {
				return this.$axios.get('/api/Classify/assortment',{
					params:{
						column_id:this.$route.params.ecosystem_id
					}
				}).then(res=>{
					//console.log(res)
					this.this_id = res.data.data.system[0].id
					this.tabNav = res.data.data.system
				})
			},
			banner_show() {
				return this.$axios.get('/api/Banner/index',{
					params:{
						column_id:this.$route.params.ecosystem_id
					}
				}).then(res=>{
					//console.log(res)
					this.banner = res.data.data.banner
				})
			}
		},
		mounted() {
			this.nav_tab();
			this.banner_show();
		}
	}
</script>

<style scoped lang="scss">
	.banner-img {
		overflow: hidden;

		img {
			width: 100%;
			vertical-align: top;
		}
	}

	.growsystem-tab {
		display: flex;
		margin: 20px 15px;
		height: 30px;
		border: 1px solid #CA9F75;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 5px;
		line-height: 30px;

		div {
			flex: 1;
			text-align: center;
			font-size: 16px;

			a {
				display: block;
				color: #CA9F75;
			}
		}

		div.active {
			background: #CA9F75;

			a {
				color: #fff;
			}
		}
	}
</style>
