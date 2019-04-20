<script src="../../../../../../../node_modules/vue-picture-preview/index.js"></script>
<template>
  <div class="row">
    <m-scroll
      :api="api"
      :disabled="load.state.disabled"
    >
      <ul class="reset-ul">
        <li v-for="item in load.data.lists">
          <img :src="item.home_img" v-preview="item.home_img" width="20"/>
          <span>{{item.name}}</span>
        </li>
      </ul>
      <template slot="load-down">
        <div class="t-c pd-10" v-if="load.state.hasMore">
          数据加载中...
        </div>
        <div class="t-c pd-10" v-else>
          暂无数据...
        </div>
      </template>
    </m-scroll>
  </div>
</template>

<script>

	import { scrollMixin, scrollAsyncData, scrollEndHook, scrollNoHasListData } from '$scroll';
  import axios from 'axios';

  async function getData(scrollData) {
    // scrollData
    return axios.get('/enroll', {
      params: {
        p: scrollData.load.params.page++
      }
    }).then((res) => {
      scrollData.load.data.lists = res.data.list;
    }).then(()=>{
      return scrollData;
    }).catch((e)=>{
      return scrollData;
    });
  }

  export default {
    name: "scroll",
    mixins: [scrollMixin()],
    data() {
      return {}
    },
    asyncData(ctx) {
      const scrollData = scrollAsyncData();
      return getData(scrollData);
    },
    methods: {
      api() {
        return this.$axios.get('/enroll', {
          params: {
            p: this.load.params.page++
          }
        }).then((res) => {
          if (scrollNoHasListData.call(this, {
              result: res,
              listKey: 'list'
            })) {
            return scrollEndHook.call(this);
          } else {
            this.load.data.lists = this.load.data.lists.concat(res.data.list);
          }
        });
      }
    }
  }
</script>
