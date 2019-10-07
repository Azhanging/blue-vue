<template>
  <bv-home-view :router-level="2">
    <BvHeader :center-control="{
      title:`上拉刷新，下拉加载`
    }"/>
    <!-- 具体的api查看mint-ui中的load-more组件 -->
    <mt-loadmore
            :topMethod="topMethod"
            :bottomMethod="bottomMethod"
            :bottom-all-loaded="loadMore.state.disabled"
            ref="loadmore"
    >
      <ul class="bc-reset-ul">
        <li v-for="item in loadMore.data.list" class="bc-pd-lr-10 bc-pd-tb-30">
          <a href="javascript:;" class="bc-t-666">
            <div class="bc-media">
              <div class="bc-media-left">
                <div>
                  <img :src="item.src_img" width="50" data-size="0x0" :msrc="item.src_img"/>
                </div>
              </div>
              <div class="bc-media-body">
                <span>{{item.name}}</span>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </mt-loadmore>
  </bv-home-view>
</template>

<script>

  import * as loadMore from '$load-more';

  export default {
    name: "load-more",
    mixins: [loadMore.mixin()],
    data() {
      return {
        id: 0
      };
    },
    methods: {
      api() {
        const page = this.loadMore.params.page++;
        const params = this.$route.params;
        return this.$axios.get('/api/index/index', {
          params: {
            page: page,
            id: params.id
          }
        }).then((res) => {
          const { data: resultData } = res;
          if (loadMore.noHasListData.call(this, {
              resultData,
              listLen: 10
            })) {
            return loadMore.endHook.call(this, {
              resultData
            });
          } else {
            this.loadMore.data.list = this.loadMore.data.list.concat(resultData.list);
          }
        })
      },
      topMethod() {
        //重置数据和状态
        loadMore.reset.call(this).then(() => {
          this.loadMore.params.page = 1;
          this.api().then(() => {
            this.$refs['loadmore'].onTopLoaded();
          });
        });
      },
      bottomMethod() {
        this.api().then(() => {
          this.$refs['loadmore'].onBottomLoaded();
        });
      }
    },
    activated() {
      const meta = this.$router.getMeta();
      // 这里是为了比对两个页面的标识问题
      // 从而更新数据，不然就会走上keep-alive的问题
      if (meta.refresh.status) {
        this.topMethod();
      }
    }
  }
</script>