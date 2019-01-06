<template>
	<m-home-view>
		<m-header :title="'分页组件'" :router-level="2"></m-header>
		<div class="bc-pd-15">
			<m-page-list
				:all-page="pageList.state.allPage"
				:current="pageList.state.current"
				:page-list-data="pageList"
				@page-jump="pageJump"
				class="bc-row"
			>
				<!-- 分页列表 -->
				<div class="bc-row">
					<div class="bc-row">
						<ul class="bc-reset-ul">
							<li v-for="item in pageList.data.lists">
								<img :src="item.home_img" v-preview="item.home_img" width="20"/>
								<span>{{item.name}}</span>
							</li>
						</ul>
					</div>
					<div class="bc-row bc-t-c" v-if="pageList.data.lists.length == 0">
						暂无数据...
					</div>
				</div>

			</m-page-list>
		</div>
	</m-home-view>
</template>

<script>

  export default {
    name: "page-list",
    data() {
      return {
        pageList: {
          data: {
            lists: []
          },
          state: {
            inputPageNum: '',
            allPage: 0,
            showItem: 5,
            current: 1
          }
        }
      }
    },
    methods: {
      api(opts = {}) {
        const { pageData, current } = opts;
        this.$axios.get(`/enroll`, {
          params: {
            p: current
          }
        }).then((res) => {
          const { data } = res;
          pageData.state.allPage = Number(data.page_count);
          pageData.data.lists = data.list;
        });
      },
      pageJump(state) {
        const { component, current } = state;
        const pageListData = component.pageListData;
        pageListData.state.current = current;
        pageListData.state.inputPageNum = '';
        this.api({
          pageData: component.pageListData,
          current
        });
      }
    },
    mounted() {
      this.api({
        pageData: this.pageList,
        current: 1
      });
    }
  }
</script>

<style scoped lang="scss">

</style>