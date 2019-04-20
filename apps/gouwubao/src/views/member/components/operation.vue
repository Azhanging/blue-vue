<template>
	<div class="bc-row bc-bg-white">
		<div class="bc-flex bc-flex-ai-c bc-f-15rp bc-pd-16rp bc-f-b bc-bd-b-e5e">
			运营支持
		</div>
		<div class="bc-row bc-pd-lr-10rp bc-t-c">
			<div class="bc-col-xs-6 bc-pd-10rp" v-for="item in list">
				<a href="javascript:;"  @click="$router.routerBack(item.url)"
				   class="bc-inline-block bc-t-333 bc-bg-f4f bc-pd-10rp bc-w-100 bc-flex bc-flex-ai-c bc-flex-jc-c">
					<i class="icon bc-t-base bc-f-19rp" :class="[item.icon]"></i>
					<span class="bc-inline-block bc-pd-l-4rp">{{item.name}}</span>
					<i class="icon icon-right"></i>
				</a>
			</div>
		</div>
	</div>
</template>

<script>

	import { $toast } from '$use-in-vue/mint-ui/toast';

  export default {
    name: "operation",
    computed: {
      list() {
        return [{
          name: '平台介绍',
          icon: 'icon-yunpingtai',
          url: `/member/tools/introduction`
        }, {
          name: '团队管理',
          icon: 'icon-tuandui',
          url() {
            $toast({
              message: '敬请期待'
            });
          }
        }, /* {
        name: '成功案例',
        icon: 'icon-xiangmu',
        url: 'icon-'
      }, */{
          name: '常见问答',
          icon: 'icon-wendabangzhu',
          url: `${this.$config.path.base}/document.html`
        }, /*{
        name: '实体对接',
        icon: 'icon-lianjie1',
        url: 'icon-'
      }, {
        name: '平台对接',
        icon: 'icon-lianjie',
        url: 'icon-'
      }, {
        name: '课程培训',
        icon: 'icon-kecheng',
        url: 'icon-'
      }, */{
          name: '会议支持',
          icon: 'icon-huiyi',
          url: `/member/tools/meeting`
        }]
      }
    }
  }
</script>