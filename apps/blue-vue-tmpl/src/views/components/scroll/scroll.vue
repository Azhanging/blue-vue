<template>
  <bv-home-view :router-level="2">
    <BvHeader :center-control="{
      title:'下拉加载'
    }"/>

    <div slot="top" class="mint-loadmore-top">
      下拉刷新
    </div>
    <BvScroll :api="api" :disabled="loadMore.state.disabled">
      <ul class="bc-reset-ul">
        <li v-for="item in loadMore.data.list" class="bc-pd-10">
          <a href="" class="bc-t-666">
            <div class="bc-media">
              <div class="bc-media-left" v-blue-photoswipe="{itemTagName:'DIV'}">
                <div>
                  <img :src="item.src_img" width="50" data-size="0x0" :msrc="item.src_img"/>
                </div>
              </div>
              <div class="bc-media-body">
                <span>{{item.name}}</span>
              </div>
            </div>
          </a>

          <ul class="bc-reset-ul" v-blue-photoswipe="{itemTagName:'LI'}">
            <li v-for="i in 4">
              <img :src="item.src_img" alt="" width="50" data-size="0x0" :msrc="item.src_img"
                   :title="`测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下测试一下${i}`"
              >
            </li>
          </ul>

        </li>
      </ul>
      <template slot="load-down">
        <div class="bc-t-c bc-pd-10" v-if="!(loadMore.state.disabled)">
          数据加载中...
        </div>
        <div class="bc-t-c bc-pd-10" v-else>
          暂无数据...
        </div>
      </template>
    </BvScroll>
  </bv-home-view>
</template>

<script>

  import * as loadMore from '$load-more';

  export default {
    name: "scroll",
    mixins: [loadMore.mixin()],
    data() {
      return {}
    },
    methods: {
      api() {
        const page = this.loadMore.params.page++;
        return this.$axios.get('/api/index/index', {
          params: {
            page: page,
            id: this.$router.$getParam(`id`)
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
        }).catch(() => {
          return loadMore.endHook.call(this);
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        document.title = '123';
      });
    },
    activated() {
      const meta = this.$router.$getMeta();
      // 这里是为了比对两个页面的标识问题
      // 从而更新数据，不然就会走上keep-alive的问题
      if (meta.refresh.status) {
        loadMore.reset.call(this).then(() => {
          this.api();
        });
      }
    }
  }
</script>