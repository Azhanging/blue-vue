<!-- 社群 -->
<template>
	<bv-home-view :router-level="3"  :style="load.data.lists.length === 0 ? `background-color: white;` : `background-color: #f4f4f4;`">

		<bv-header :header="{title:{value:'我的社群'}}"/>

		<div class="bc-row bc-f-16rp">

			<div class="bc-row bc-t-c bc-pd-tb-30rp" v-if="load.data.lists.length === 0">
				<div class="bc-row">
					<img :src="`${staticPath}/wechat.png`" class="bc-w-40">
				</div>
				<div class="bc-row bc-f-b bc-f-18rp bc-t-333 bc-pd-t-15rp">
					温馨提示
				</div>
				<div class="bc-row bc-t-999 bc-pd-t-8rp">
					您绑定的创客还未创建社群
				</div>
			</div>

			<ul class="bc-reset-ul">
				<bv-scroll :api="api" :disabled="load.state.disabled">
					<li class="association-item" v-for="(item,index) in load.data.lists" :key="index">
						<div class="bc-row bc-pd-15rp bc-bg-white association-item-content">
							<div class="bc-flex bc-pd-tb-6rp">
								<div class="bc-f-b">社 群 名 称：</div>
								<div class="bc-flex-1">
									{{item.name}}
								</div>
							</div>
							<div class="bc-flex bc-pd-tb-6rp">
								<div class="bc-f-b">社 群 说 明：</div>
								<div class="bc-flex-1">
									{{item.intro}}
								</div>
							</div>
							<div class="bc-flex bc-pd-tb-6rp">
								<div class="bc-f-b">社群二维码：</div>
								<div class="bc-flex-1">
									<img :src="item.ercode" alt="" class="" width="50%">
								</div>
							</div>
						</div>
					</li>
				</bv-scroll>
			</ul>
		</div>
	</bv-home-view>
</template>

<script>
	import { scrollMixin, scrollEndHook, scrollNoHasListData } from '$scroll';

  export default {
    name: "association",
    mixins: [scrollMixin()],
    methods: {
      api() {
        const page = this.load.params.page++;
        return this.$axios.get('/member/association/my_creator', {
          params: {
            p: page
          }
        }).then((res) => {
          const { data: resultData } = res.data;
          if (scrollNoHasListData.call(this, {
              resultData,
              listKey: 'list'
            })) {
            scrollEndHook.call(this);
          } else {
            if (resultData.list.length < 10) scrollEndHook.call(this);
            this.load.data.lists = this.load.data.lists.concat(resultData.list);
          }
        }).catch(() => {
          return scrollEndHook.call(this);
        });
      }
    },
    computed:{
      staticPath(){
        return `${this.config.path.static}/img/member/components/tools`
      }
    }
  }
</script>

<style scoped lang="scss">
	.association-item:first-child {
		padding: rem(10);
		.association-item-content {
			border-top-left-radius: 10px;
			border-top-right-radius: 10px;
		}
	}

	.association-item {
		padding-left: rem(10);
		padding-right: rem(10);
		padding-bottom: rem(10);
	}

	.association-item:last-child {
		padding-left: rem(10);
		padding-right: rem(10);
		.association-item-content {
			border-bottom-left-radius: 10px;
			border-bottom-right-radius: 10px;
		}
	}
</style>