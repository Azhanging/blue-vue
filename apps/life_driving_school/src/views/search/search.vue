<template>
	<bv-home-view class='wap' :router-level='2' style="background:rgba(244,244,244,1);">
		<form id="form" action="" method="" @submit.prevent="search($event)">
			<div id="search" class="bc-row bc-bg-white v-m" style="z-index:4000;max-width:30rem;" >
				<div class="search-header bc-flex bc-flex-jc-c bc-flex-ai-c bc-pd-tb-10rp bc-pd-lr-10rp">
					<div class="bc-flex-10">
						<input class="search-input  bc-bd-none bc-bd-e5e bc-bd-radius-5"  style="" type="text" placeholder="搜索" name="keywords" >
					</div>
					<div class="bc-flex-1" style="color:#CA9F75" @click="goBack">
						取消
					</div>
				</div>
			</div>
		</form>

		<div class="search-content">
			<div class="bc-ps-f" style="left:0;right:0;top:0;bottom:0;z-index:20000;background:rgba(244,244,244,1);" v-if="infoShow.status === -1">
				<img class="bc-w-100 bc-mg-t-50rp" style="" :src="`${$config.path.static}/img/home/search/404.png`" alt="">
			</div>
			<div class="" v-else-if="infoShow.status === 1">
				<img class="bc-w-100" :src="`${$config.path.static}/img/home/search/default.png`" alt="">
			</div>
			<div class="" v-else-if="infoShow.status === 0">
				<img class="bc-w-100" :src="`${$config.path.static}/img/home/search/unresult.png`" alt="">
			</div>


			<div class="" v-else>
				<div class="bc-pd-lr-15rp">
					<div class="bc-f-16rp bc-t-base bc-pd-t-14rp">
						相关内容
					</div>
					<ul class="bc-reset-ul ">
						<!--类型1-->
						<li class="bc-bd-b-e5e bc-pd-t-15rp" v-for="(item, index) in searchList" :key="index" v-if="item.type === 1">
							<div class="bc-flex">
								<img class='left_img' :src='item.src_img' alt='列表图'>
								<div class='bc-flex-1 bc-mg-l-10rp'>
									<div class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-16rp' v-html="highlight(item.name, item.keyword)"></div>
									<div class='bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2'>{{item.description}}</div>
								</div>
							</div>
							<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-tb-10rp bc-t-999'>
								<div class="bc-flex-3 bc-f-12rp bc-t-base ">{{item.sortType}}</div>
								<div class='bc-flex-1 action bc-flex bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>
									<span>&nbsp;{{item.click_num}}</span>
								</div>
								<div class='bc-flex-1 bc-f-12rp t-888'>
									{{item.create_time | timeFilter("Y-M-D")}}
								</div>
							</div>
						</li>

						<!--类型2-->
						<li class="bc-bd-b-e5e bc-pd-t-15rp" v-for="(item, index) in searchList" :key="index" v-if="item.type === 2">
							<div class="bc-flex">
								<img class='left_img' :src='item.src_img' alt='列表图'>
								<div class='bc-flex-1 bc-mg-l-10rp'>
									<div class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-16rp' v-html="highlight(item.name, item.keyword)"></div>
									<div class='bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2'>{{item.description}}</div>
								</div>
							</div>
							<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-tb-10rp bc-t-999'>
								<div class="bc-flex-3 bc-f-12rp bc-t-base ">{{item.sortType}}</div>
								<div class='bc-flex-1 action bc-flex bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>
									<span>&nbsp;{{item.click_num}}</span>
								</div>
								<div class='bc-flex-1 bc-f-12rp t-888'>
									{{item.create_time | timeFilter("Y-M-D")}}
								</div>
							</div>
						</li>

						<!--类型1-->
						<li class="bc-bd-b-e5e bc-pd-t-15rp" v-for="(item, index) in searchList" :key="index" v-if="item.type === 3">
							<div class="bc-flex">
								<img class='left_img' :src='item.src_img' alt='列表图'>
								<div class='bc-flex-1 bc-mg-l-10rp'>
									<div class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-16rp' v-html="highlight(item.name, item.keyword)"></div>
									<div class='bc-f-12rp bc-t-666 bc-t-ellipsis bc-t-ellipsis-2'>{{item.description}}</div>
								</div>
							</div>
							<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-tb-10rp bc-t-999'>
								<div class="bc-flex-3 bc-f-12rp bc-t-base ">{{item.sortType}}</div>
								<div class='bc-flex-1 action bc-flex bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>
									<span>&nbsp;{{item.click_num}}</span>
								</div>
								<div class='bc-flex-1 bc-f-12rp t-888'>
									{{item.create_time | timeFilter("Y-M-D")}}
								</div>
							</div>
						</li>

						<!--类型4-->
						<li class="bc-bd-b-e5e bc-pd-t-15rp" v-for="(item, index) in searchList" :key="index" v-if="item.type === 4">
							<div class="bc-flex">
								<img class='left_img' :src='item.src_img' alt='列表图'>
								<div class='bc-flex-1 bc-mg-l-10rp'>
									<div class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2 bc-mg-b-8 bc-f-16rp' v-html="highlight(item.name, item.keyword)"></div>
								</div>
							</div>
							<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-tb-10rp bc-t-999'>
								<div class="bc-flex-3 bc-f-12rp bc-t-base ">{{item.sortType}}</div>
								<div class='bc-flex-1 action bc-flex bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>
									<span>&nbsp;{{item.click_num}}</span>
								</div>
								<div class='bc-flex-1 bc-f-12rp t-888'>
									{{item.create_time | timeFilter("Y-M-D")}}
								</div>
							</div>
						</li>

						<!--类型5-->
						<li class="bc-bd-b-e5e bc-pd-t-15rp" v-for="(item, index) in searchList" :key="index" v-if="item.type === 5">
							<div class="bc-flex bc-flex-ai-c">
								<img class='search-icon' :src='item.src_img' alt='列表图'>
								<span class='bc-t-333 bc-t-ellipsis bc-t-ellipsis-2  bc-f-16rp bc-pd-tb-15rp bc-pd-l-10rp' v-html="highlight(item.name, item.keyword)"></span>
							</div>
							<div class='bc-flex bc-flex-jc-sb  bc-flex-ai-c bc-pd-tb-10rp bc-t-999'>
								<div class="bc-flex-3 bc-f-12rp bc-t-base ">{{item.sortType}}</div>
								<div class='bc-flex-1 action bc-flex bc-f-12rp'>
									<i class='iconfont iconeye- bc-f-12rp'></i>
									<span>&nbsp;{{item.click_num}}</span>
								</div>
								<div class='bc-flex-1 bc-f-12rp t-888'>
									{{item.create_time | timeFilter("Y-M-D")}}
								</div>
							</div>
						</li>

					</ul>

					<div class="bc-pd-tb-18rp bc-f-12rp bc-t-666 bc-t-c" style="background:rgba(244,244,244,1);">没有更多内容</div>

				</div>
			</div>

		</div>


	</bv-home-view>
</template>

<script>
export default {
  name: "search",
	data() {
    return {
      infoShow: {
        status: 2
      },
	    searchList: [
		    {
		      type: 1,
			    name: '点通宝标题点通宝标题',
			    keyword: '点通宝',
			    sortType: '生命导航',
          description: '我是内容',
          click_num: 500,
          create_time: (new Date()).getTime(),
          src_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA'
		    },
        {
          type: 2,
          name: '音频音频音频音频音频音频音频音频',
          keyword: '点通宝',
          sortType: '音频',
          description: '我是内容',
          click_num: 500,
          create_time: (new Date()).getTime(),
          src_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA'
        },
        {
          type: 3,
          name: '视频视频视频视频视频视频',
          keyword: '点通宝',
          sortType: '视频',
          description: '我是内容',
          click_num: 500,
          create_time: (new Date()).getTime(),
          src_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA'
        },
        {
          type: 4,
          name: '直播直播',
          keyword: '点通宝',
          sortType: '直播',
          description: '我是内容',
          click_num: 500,
          create_time: (new Date()).getTime(),
          src_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA'
        },
        {
          type: 5,
          name: '问答',
          keyword: '点通宝',
          sortType: '问答',
          description: '我是内容我是内容我是内容我是内容',
          click_num: 500,
          create_time: (new Date()).getTime(),
          src_img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554267693719&di=54cd3c613f9b0b8081672e4b8aa0a600&imgtype=0&src=http%3A%2F%2Fpics2.baidu.com%2Ffeed%2Feac4b74543a982260290b87c79c820054b90ebec.png%3Ftoken%3D673d57831aea0fb5b580d11e478dcda7%26s%3D81A4DF104B7143868AC8F5540300C0BA'
        }

	    ]
    }
	},
	methods: {
    search(event) {
      this.$axios.get('/api/search/index')
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });

    },
    goBack() {
      this.$router.go(-1);
    },
    highlight(value, keyword) {
      let titleString = value;
      if (!titleString) {
        return '';
      }
      if (keyword && keyword.length > 0) {
        // 匹配
        let replaceReg = new RegExp(keyword, 'g');
        // 高亮替换
        let replaceString = '<span class="bc-t-base">' + keyword + '</span>';
        // 替换
        titleString = titleString.replace(replaceReg, replaceString);
      }
      return titleString;
    }
	},


}
</script>

<style scoped lang="scss">
#search {
	.search-header {
		height: rem(30);
		.search-input {
			width: 90%;
			padding: rem(5) 0 rem(5) rem(15);
			background:rgba(244,244,244,1);
			/*color:#CA9F75;*/
		}
	}
}
	.search-content {
		.left_img{
			width: rem(120);
			height: rem(80);
		}
	}

	.search-icon {
		width: rem(15);
		height: rem(15);
	}
</style>