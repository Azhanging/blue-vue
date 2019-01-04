<template>
	<m-view>
		<div>
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
						<ul class="reset-ul">
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

				<!-- 分页 -->
				<template slot="pagination" slot-scope="scope">
					<div class="row f-13px" v-show="pageList.state.allPage > 0">
						<a class="g-bg-primary inline-block pd-4 t-white mg-4" href="javascript:void(0);"
						   @click="scope.pageJump(1)"
						>
							首页
						</a>
						<a class="g-bg-primary inline-block pd-4 t-white mg-4" href="javascript:void(0);"
						   v-show="pageList.state.current != 1"
						   @click="scope.pageJump(--pageList.state.current)"
						>
							上一页
						</a>
						<a v-for="index in scope.pages"
						   :class="{'g-bg-primary inline-block pd-4 t-white mg-4': pageList.state.current == index}"
						   href="javascript:void(0);"
						   @click="scope.pageJump(index)">
							{{index}}
						</a>
						<a class="g-bg-primary inline-block pd-4 t-white mg-4"
						   href="javascript:void(0);"
						   v-show="pageList.state.allPage != pageList.state.current && pageList.state.allPage != 0 "
						   @click="scope.pageJump(++pageList.state.current)">
							下一页
						</a>
						<a class="g-bg-primary inline-block pd-4 t-white mg-4"
						   href="javascript:void(0);"
						   @click="scope.pageJump(pageList.state.allPage)"
						>
							末页
						</a>
						<span>共 {{pageList.state.allPage}} 页，到第</span>
						<input type="text" class="g-bd-e5e" style="width: 30px"
						       v-model="pageList.state.inputPageNum"
						       @keydown.enter="scope.pageJump(pageList.state.inputPageNum)"
						/>
						<a class="g-bg-primary inline-block pd-4 t-white mg-4"
						   @click="scope.pageJump(pageList.state.inputPageNum)"
						>
							确定
						</a>
					</div>
				</template>

			</m-page-list>
		</div>
	</m-view>
</template>

<script>

	import { pageListMixin } from '$page-list';

  export default {
    name: "page-list",
    mixins: [pageListMixin({
      dataKey: 'pageList'
    })],
    data() {
      return {}
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