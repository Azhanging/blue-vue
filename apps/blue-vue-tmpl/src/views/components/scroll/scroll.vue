<template>
  <BvView>
    <BvHeader :center-control="{
      title:'下拉加载'
    }"/>

    <div slot="top" class="mint-loadmore-top">
      下拉刷新
    </div>

    <VanList
            v-model="listData.loading"
            :finished="listData.finished"
            loading-text="数据加载中..."
            error-text="加载错误，请稍后重试"
            finished-text="没有更多了"
            @load="load"
    >
      <ul class="ba-reset-ul">
        <li v-for="item in listData.list" class="ba-pd-10">
          <a href="" class="ba-t-666">
            <div class="ba-media">
              <div class="ba-media-left" v-blue-photoswipe="{itemTagName:'DIV'}">
                <div>
                  <img :src="item.src_img" width="50" data-size="0x0" :msrc="item.src_img"/>
                </div>
              </div>
              <div class="ba-media-body">
                <span>{{item.name}}</span>
              </div>
            </div>
          </a>
          <ul class="ba-reset-ul" v-blue-photoswipe="{itemTagName:'LI'}">
            <li v-for="i in 4">
              <img :src="item.src_img" alt="" width="50" data-size="0x0" :msrc="item.src_img"
                   :title="`测试一下${i}`"
              >
            </li>
          </ul>
        </li>
      </ul>
    </VanList>
  </BvView>
</template>

<script>

  import { genListData } from "$assets/js/list";

  function getParams() {
    return {
      page: 1
    };
  }

  export default {
    name: "scroll",
    data() {
      return {
        listData: genListData({
          params: getParams()
        })
      }
    },
    methods: {
      load() {
        const { listData } = this;
        const { params } = listData;
        return this.$axios.get('/mock/list', {
          params: {
            page: ++params.page,
            id: this.$router.$getParam(`id`)
          }
        }).then((res) => {
          const { data } = res;
          setTimeout(() => {
            listData.list = listData.list.concat(data.list);
            listData.loading = false;
            if (params.page === 4) {
              listData.finished = true;
            }
          }, 500);
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
        this.listData = genListData({
          params: getParams()
        });
        this.load();
      }
    }
  }
</script>