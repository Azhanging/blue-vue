<template>
	<bv-home-view class='bc-bg-f4f' :router-level='2'>

		<bv-header :header="{title:{value:'荣誉校董办公室'}}"/>

		<div class="angel-header bc-flex">
			<div class="bc-pd-r-15rp bc-mg-l-15rp bc-mg-t-26rp" v-if="boardData">
				<img :src="boardData.memberImg" alt="" class="head-img">
			</div>
			<div class="bc-flex-3 bc-pd-b-15rp bc-pd-r-15rp" v-if="boardData">
				<div class="bc-f-18rp bc-mg-t-4rp bc-mg-t-12rp bc-f-b">
					荣誉校董
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					学费金额：{{ boardData.benjin || '0.00' }}元
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					特别奖学金发放日期
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp time-prog">
					<progress max="100" :value="boardData.newTimes"></progress>
				</div>
				<div class="bc-f-12rp bc-mg-t-4rp angel-co">
					{{ boardData.startTime || '0000-00-00' }}至{{ boardData.startTime || '0000-00-00' }}
					<span class="bc-fl-r" v-if="boardData.termTime==0">已到期</span>
					<span class="bc-fl-r" v-else>还差{{ boardData.termTime }}天到期</span>
				</div>
			</div>
			<div class="angel-sm bc-mg-t-13rp">
				<a @click="btn_toast">校董说明<i class="icon icon-right"></i></a>
			</div>
			<div class="angel-sm bc-mg-t-48rp">
				<a @click="btn_toast">我的智能合约<i class="icon icon-right"></i></a>
			</div>
		</div>
		
		<statistics-item class="bc-mg-t-10rp bc-bd-b-e5e" :options="{
	    title:{
	      name:'校董奖学金总额',
	      url:`/member/school-board/scholarship`,
	      urlName:'查看明细>'
	    },
	    num: {value: boardData.incomeCount}
		}"/>
		<statistics-item v-if="boardData" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'平台会员'
	    },
	    num: {value: boardData.platform_datas.memberCount },
	    otherNum:[{
	      name:'环比增加',
	      num: boardData.platform_datas.areaApplyCount_QOQ
	    },{
	      name:'同比增加',
	      num: boardData.platform_datas.areaApplyCount_YOY
	    }]
		}"/>
		<statistics-item v-if="boardData" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'平台分公司'
	    },
	    num: {value:boardData.platform_datas.areaApplyCount},
	    otherNum:[{
	      name:'环比增加',
	      num: boardData.platform_datas.areaApplyCount_QOQ
	    },{
	      name:'同比增加',
	      num: boardData.platform_datas.areaApplyCount_YOY
	    }]
		}"/>
		<statistics-item v-if="boardData" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'平台产品'
	    },
	    num: {value:boardData.platform_datas.goodCount},
	    otherNum:[{
	      name:'环比增加',
	      num: boardData.platform_datas.goodCount_QOQ
	    },{
	      name:'同比增加',
	      num: boardData.platform_datas.goodCount_YOY
	    }]
		}"/>
		<statistics-item v-if="boardData" class="bc-bd-b-e5e" :options="{
	    title:{
	      name:'平台商家'
	    },
	    num: {value:boardData.platform_datas.storeCount},
	    otherNum:[{
	      name:'环比增加',
	      num: boardData.platform_datas.storeCount_QOQ
	    },{
	      name:'同比增加',
	      num: boardData.platform_datas.storeCount_YOY
	    }]
		}"/>
		
		<div class="bc-row bc-bg-white bc-mg-b-10rp bc-pd-b-10rp bc-bd-b-e5e">
			<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp">
				<div class="bc-f-b bc-flex-1">平台运营项目</div>
				<div><a @click="to_xmpath()" class="bc-t-999 bc-f-12rp">查看更多&gt;</a></div>
			</div>
			<div class="bc-row bc-pd-l-10rp bc-pd-r-10rp" v-if="boardData">
				<div class="bc-flex bc-pd-5rp bc-f-12rp" v-for="(item,index) in boardData.project">
					<div class="bc-flex-1 xm-ovhide">
						<a @click="to_xmlistpath(item.id)" class="xm-color">{{ item.project_name }}</a>
					</div>
					<div class="bc-t-666">上线时间：{{ item.start_time }}</div>
				</div>
			</div>
		</div>
		
		<div class="bc-row bc-bg-white bc-mg-b-10rp bc-pd-b-10rp bc-bd-b-e5e">
			<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp">
				<div class="bc-f-b bc-flex-1">平台最新动态</div>
				<div><router-link to="/member/school-board/recent-news" class="bc-t-999 bc-f-12rp">查看更多&gt;</router-link></div>
			</div>
			<div class="bc-row bc-pd-l-10rp bc-pd-r-10rp" v-if="boardData">
				<div v-for="(item,index) in boardData.zixun_list">
					<a :href="item.url">
						<div class="bc-flex bc-pd-5rp bc-f-12rp bc-t-666">
							<div class="bc-flex-2 xm-ovhide">
								{{ item.name }}
							</div>
							<div class="bc-flex-1 bc-t-r">{{ item.create_time }}</div>
						</div>
					</a>
				</div>
			</div>
		</div>
		
	</bv-home-view>
</template>

<script>
	//统计的item
	import StatisticsItem from '../components/statistics-item';
	import programUrl from '@config/program-url';
	import { $toast } from "$use-in-vue/mint-ui/toast";
  export default {
    name: "product-angel",
    data() {
      return {
	      boardData:''
      }
    },
    created() {
    	this.getData();
    },
    computed: {
    
    },
    methods: {
	    getData() {
		    this.$axios.get('/member/office_honor/index').then((res) => {
			    const { data } = res.data;
			    this.boardData = data;
		    });
	    },
	    to_xmpath(){
		    location.href = `${programUrl['cai-fu-bao']}`;
	    },
	    to_xmlistpath(id){
		    location.href = `${programUrl['cai-fu-bao']}/project/details.html?id=${id}`;
	    },
	    btn_toast(){
		    $toast({
			    message: '敬请期待',
			    duration: 3000
		    });
	    }
    },
    components: {
	    StatisticsItem
    }
  }
</script>

<style scoped lang="scss">
	.bc-bg-f4f{
		background: #f4f4f4;
	}
	.angel-header {
		background: #F1DFB6 url($base-static-path + '/img/member/public/bgstop-bg.jpg') right bottom no-repeat;
		background-size: auto 100%;
		position: relative;
		.head-img {
			width: rem(60);
			height: rem(60);
			border-radius: 50%;
		}
		.angel-sm{
			background: #000;
			border-top-left-radius: rem(15);
			border-bottom-left-radius: rem(15);
			overflow: hidden;
			position: absolute;
			right: 0;
			a{
				height: rem(28);
				line-height: rem(28);
				padding: 0 rem(10);
				color: #fff;
			}
		}
		.angel-co{
			color: #A86F2F;
		}
	}
	.angel-statistical{
		background: #fff;
		padding: rem(15) rem(20);
		border-bottom: 1px solid #e5e5e5;
		margin-top: rem(10);
		font-size: rem(16);
		color: #333;
		font-weight: bold;
	}
	.time-prog progress{
		width: 100%;
		height: rem(10);
		border: 0;
		color: #fff;
		background:#fff;
		border-radius: rem(10);
	}
	/* 表示总长度背景色 */
	progress::-webkit-progress-bar{
		background-color: #fff;
		border-radius: rem(5);
	}
	/* 表示已完成进度背景色 */
	progress::-webkit-progress-value{
		background: #DCB46E;
		border-radius: rem(5);
	}
	.xm-color{
		color: #DCB46E;
		text-decoration: underline;
	}
	.xm-ovhide{
		white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
	}
</style>
